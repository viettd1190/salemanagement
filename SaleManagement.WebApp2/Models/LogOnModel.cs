using System.ComponentModel.DataAnnotations;

namespace SaleManagement.WebApp2.Models
{
    public class LogOnModel
    {
        [Required(ErrorMessage = "Tên đăng nhập không được bỏ trống")]
        public string Username { get; set; }

        [Required(ErrorMessage = "Mật khẩu không được bỏ trống")]
        public string Password { get; set; }

        public bool RememberMe { get; set; }
    }
}
