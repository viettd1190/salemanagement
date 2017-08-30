using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using SaleManagement.WebApp.Models.Response;

namespace SaleManagement.WebApp.Controllers
{
    public class MonitorController : BaseController
    {
        [Authorize]
        // GET: Monitor
        public ActionResult Index()
        {
            return View();
        }

        [HttpPost]
        public ActionResult GetBranches()
        {
            try
            {
                var result = AppUtil.ConvertTo<BranchResponse>(ServiceClient.IDN_DMS_Branch_Load(User.Identity.Name));
                return Json(result,
                            "json");
            }
            catch (Exception e)
            {
                Logger.Debug(e);
            }
            return Json(new List<BranchResponse>(),
                        "json");
        }

        [Authorize]
        public ActionResult History()
        {
            return View();
        }
    }
}