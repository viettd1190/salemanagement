using System.Web.Mvc;
using NLog;
using SaleManagement.WebApp2.CustomerService;

namespace SaleManagement.WebApp2.Controllers
{
    public class BaseController : Controller
    {
        protected Logger Logger = LogManager.GetCurrentClassLogger();

        protected IDNWebSerives ServiceClient = new IDNWebSerives();
    }
}
