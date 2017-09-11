using System.Web.Mvc;

namespace SaleManagement.WebApp2.Controllers
{
    public class HomeController : Controller
    {
        [Authorize]
        public ActionResult Index()
        {
            return View();
        }
    }
}
