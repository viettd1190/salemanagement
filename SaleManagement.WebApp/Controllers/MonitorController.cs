using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace SaleManagement.WebApp.Controllers
{
    public class MonitorController : Controller
    {
        [Authorize]
        // GET: Monitor
        public ActionResult Index()
        {
            return View();
        }

        [Authorize]
        public ActionResult History()
        {
            return View();
        }
    }
}