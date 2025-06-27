using CarStore.Application.Dtos;
using CarStore.Application.Interfaces;
using CarStore.Domain.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;


namespace CarStore.Application.Services
{
    public class AuthService :IAuthService
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly SignInManager<ApplicationUser> _signInManager;
        private readonly IConfiguration _config;
        private readonly ILogger<AuthService> _logger;

        public AuthService(
            UserManager<ApplicationUser> userManager,
            SignInManager<ApplicationUser> signInManager,
            IConfiguration config, ILogger<AuthService> logger)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _config = config;
        }

        public async Task<string> RegisterAsync(RegisterDto dto)
        {
            var user = new ApplicationUser
            {
                Email = dto.Email,
                UserName = dto.UserName,
          
            };
            var result = await _userManager.CreateAsync(user, dto.Password);

            if (!result.Succeeded)
                return string.Join(", ", result.Errors.Select(e => e.Description));

            await _userManager.AddToRoleAsync(user, "User");

            return "Đăng ký thành công.";
        }

        public async Task<AuthResult> LoginAsync(LoginDto dto,  string ipAddress)
        {
            // Tìm user theo email
            var user = await _userManager.FindByEmailAsync(dto.Email);
            if (user == null)
                return null;

            var passwordValid = await _signInManager.CheckPasswordSignInAsync(user, dto.Password, false);
            if (!passwordValid.Succeeded)
                return null;

            // Lấy danh sách vai trò (Admin/User)
            var roles = await _userManager.GetRolesAsync(user);

            // Tạo danh sách claim để nhúng vào token
            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.Name, user.UserName),
                new Claim(ClaimTypes.NameIdentifier, user.Id),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
            };

            // Thêm từng role vào claim
            foreach (var role in roles)
            {
                claims.Add(new Claim(ClaimTypes.Role, role));
            }

            // Tạo token
            var token = GenerateJwtToken(claims);
       
            var refreshToken = GenerateRefreshToken(ipAddress); // lấy từ Request
            user.RefreshTokens.Add(refreshToken);
            await _userManager.UpdateAsync(user);
           
            return new AuthResult
            {
                AccessToken = new JwtSecurityTokenHandler().WriteToken(token),
                RefreshToken = refreshToken.Token,
                UserId = user.Id,
                Role = roles.FirstOrDefault()
            };
        }

        // Tạo JWT token từ danh sách Claim
        private JwtSecurityToken GenerateJwtToken(List<Claim> claims)
        {
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["JWT:Key"]));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            return new JwtSecurityToken(
                issuer: _config["JWT:Issuer"],
                audience: _config["JWT:Audience"],
                claims: claims,
                expires: DateTime.Now.AddHours(15),
                signingCredentials: creds
            );
        }
        public async Task LogoutAsync(string userId, string refreshToken)
        {
            var user = await _userManager.FindByIdAsync(userId);
            var token = user.RefreshTokens.FirstOrDefault(x => x.Token == refreshToken);
            if (user == null) throw new Exception("User không tồn tại");

            if (token != null)
            {
                user.RefreshTokens.Remove(token);           
                await _userManager.UpdateAsync(user);
            }
        }


        // Tạo refreshToken
        public RefreshToken GenerateRefreshToken(string ipAddress)
        {
            var randomBytes = new byte[64];
            using var rng = RandomNumberGenerator.Create();
            rng.GetBytes(randomBytes);

            return new RefreshToken
            {
                Token = Convert.ToBase64String(randomBytes),
                Expires = DateTime.UtcNow.AddDays(7),
                Created = DateTime.UtcNow,
                CreatedByIp = ipAddress
            };
        }
        public async Task<AuthResult?> RefreshTokenAsync(string refreshToken, string ipAddress)
        {
            var user = _userManager.Users
                .Include(u => u.RefreshTokens)
                .SingleOrDefault(u => u.RefreshTokens.Any(t => t.Token == refreshToken));

            if (user == null) return null;

            var oldToken = user.RefreshTokens.Single(x => x.Token == refreshToken);
            var roles = await _userManager.GetRolesAsync(user);

            if (!oldToken.IsActive) return null;

            // Thu hồi token cũ
            oldToken.Revoked = DateTime.UtcNow;
            oldToken.ReplacedByToken = GenerateRefreshToken(ipAddress).Token;

            // Tạo refresh token mới
            var newRefreshToken = GenerateRefreshToken(ipAddress);
            user.RefreshTokens.Add(newRefreshToken);

            await _userManager.UpdateAsync(user);

            // Sinh JWT mới
          

            var claims = new List<Claim>
    {
        new Claim(ClaimTypes.Name, user.UserName),
        new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
    };

            foreach (var role in roles)
            {
                claims.Add(new Claim(ClaimTypes.Role, role));
            }

            var jwtToken = GenerateJwtToken(claims);

            return new AuthResult
            {
                AccessToken = new JwtSecurityTokenHandler().WriteToken(jwtToken),
                RefreshToken = newRefreshToken.Token,
                Role = roles.FirstOrDefault()
            };
        }

    }
}
