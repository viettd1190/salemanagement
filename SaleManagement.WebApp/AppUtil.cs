using System.Configuration;

namespace SaleManagement.WebApp
{
    public class AppUtil
    {
        public static string WebTitle = ConfigurationManager.AppSettings["WebTitle"];
    }
}
