using CarStore.Application.Dtos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CarStore.Application.Interfaces
{
    public interface IAuthService
    {
        Task<string> RegisterAsync(RegisterDto dto);
        Task<AuthResult> LoginAsync(LoginDto dto, string ipAddress);
        Task<AuthResult?> RefreshTokenAsync(string refreshToken, string ipAddress);
        Task LogoutAsync(string userId, string refreshToken);

    }

}
