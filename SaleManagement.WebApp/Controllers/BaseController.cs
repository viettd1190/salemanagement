using System.Web.Mvc;
using NLog;
using SaleManagement.WebApp.CustomerService;

namespace SaleManagement.WebApp.Controllers
{
    public class BaseController : Controller
    {
        protected IDNWebSerives ServiceClient = new IDNWebSerives();

        protected Logger Logger = LogManager.GetCurrentClassLogger();
    }
}
