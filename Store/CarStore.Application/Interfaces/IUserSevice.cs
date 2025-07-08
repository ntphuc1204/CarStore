using CarStore.Application.Dtos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CarStore.Application.Interfaces
{
    public interface IUserSevice
    {
        Task<List<UserDto>> GetAll();
        Task<UserDto> GetById(string id);
        Task<UserDto?> GetCurrentAsync(string userId);
        Task<bool> UpdateUser(UpdateUserDto dto);

        Task<bool> UpdatePassUser(string userId, UpdatePassUserDto dto);
        Task<List<UserDto>> searchAsync(string key);
     
    }
}
