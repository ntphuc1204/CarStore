using AutoMapper;
using CarStore.Application.Dtos;
using CarStore.Application.Interfaces;
using CarStore.Domain.Entities;
using CarStore.Domain.Interfaces;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;


namespace CarStore.Application.Services
{
    public class UserService : IUserSevice
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly IMapper _mapper;

        public UserService(UserManager<ApplicationUser> userManager, IMapper mapper)
        {
            _userManager = userManager;
            _mapper = mapper;
        }

        public async Task<List<UserDto>> GetAll()
        {
            var users = _userManager.Users.ToList(); 
            var userDtos = _mapper.Map<List<UserDto>>(users);


            for (int i = 0; i < users.Count; i++)
            {
                var roles = await _userManager.GetRolesAsync(users[i]);
                userDtos[i].Roles = roles.ToList();
            }

            return userDtos;
        }
        public async Task<UserDto?> GetCurrentAsync(string userId)
        {
            return await GetById(userId);
        }

        public async Task<UserDto> GetById(string id)
        {
            var userId = await _userManager.FindByIdAsync(id);
            return _mapper.Map<UserDto>(userId);
        }

        public async Task<bool> UpdateUser(UpdateUserDto dto)
        {
            var user = await _userManager.FindByIdAsync(dto.Id);
            if (user == null) return false;
            _mapper.Map(dto, user);
            var result = await _userManager.UpdateAsync(user);
            return result.Succeeded;
        }

        public async Task<bool> UpdatePassUser(string userId, UpdatePassUserDto dto)
        {
            if (dto.NewPassword != dto.ConfirmNewPassword)
                return false;

            var user = await _userManager.FindByIdAsync(userId);
            if (user == null)
                return false;

            var result = await _userManager.ChangePasswordAsync(user, dto.CurrentPassword, dto.NewPassword);
            return result.Succeeded;
        }

        public async Task<List<UserDto>> searchAsync(string key)
        {
            var users = await _userManager.Users
                .Where(u =>
                    u.UserName!.Contains(key) ||
                    u.Email!.Contains(key) ||
                    u.PhoneNumber!.Contains(key))
                .ToListAsync();

            var result = new List<UserDto>();

            foreach (var user in users)
            {
                var roles = await _userManager.GetRolesAsync(user);
                result.Add(new UserDto
                {
                    Id = user.Id,
                    UserName = user.UserName!,
                    Email = user.Email!,
                    PhoneNumber = user.PhoneNumber,
                    Address = user.Address,
                    Roles = roles.ToList()
                });
            }

            return result;
        }

    }

}
