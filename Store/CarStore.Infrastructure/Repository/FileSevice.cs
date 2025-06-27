using CarStore.Application.Interfaces;
using Microsoft.AspNetCore.Hosting;


namespace CarStore.Infrastructure.Repository
{
    public class FileService : IFileService
    {
        private readonly IWebHostEnvironment _webHost;

        public FileService(IWebHostEnvironment webHost)
        {
            _webHost = webHost;
        }

        public Task DeleteFileAsync(string fileName)
        {
            var filePath = Path.Combine(_webHost.WebRootPath, "uploads", fileName);
            if (File.Exists(filePath))
            {
                File.Delete(filePath);
            }

            return Task.CompletedTask;
        }
    }
}
