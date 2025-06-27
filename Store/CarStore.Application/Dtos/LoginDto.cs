
namespace CarStore.Application.Dtos
{
    public class LoginDto
    {
        public string Email { get; set; }
        public string Password { get; set; }
    }
    public class RefreshRequest
    {
        public string RefreshToken { get; set; }
    }
    public class AuthResult
    {
        public string AccessToken { get; set; }
        public string RefreshToken { get; set; }
        public string UserId { get; set; }
        public string Role { get; set; }
    }
    public class LogoutRequest
    {
        public string RefreshToken { get; set; }
    }

}
