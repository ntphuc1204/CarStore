using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CarStore.Application.Interfaces
{
    public interface IFileService
    {
        Task DeleteFileAsync(string fileName);
    }
}
