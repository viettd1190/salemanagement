using System;
using System.Collections.Generic;
using System.Drawing;
using System.Drawing.Imaging;
using System.IO;
using System.Web.Mvc;
using SaleManagement.WebApp2.Models.Response;

namespace SaleManagement.WebApp2.Controllers
{
    public class MonitorController : BaseController
    {
        [Authorize]
        public ActionResult Index()
        {
            return View();
        }

        [HttpPost]
        [Authorize]
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

        [HttpPost]
        [Authorize]
        public ActionResult GetProvinces()
        {
            try
            {
                var result = AppUtil.ConvertTo<ProvinceResponse>(ServiceClient.IDN_DMS_Province_Load(User.Identity.Name));
                return Json(result,
                            "json");
            }
            catch (Exception e)
            {
                Logger.Debug(e);
            }
            return Json(new List<ProvinceResponse>(),
                        "json");
        }

        [HttpPost]
        [Authorize]
        public ActionResult GetPositions()
        {
            try
            {
                var result = AppUtil.ConvertTo<PositionResponse>(ServiceClient.IDN_DMS_Position_Load(User.Identity.Name));
                return Json(result,
                            "json");
            }
            catch (Exception e)
            {
                Logger.Debug(e);
            }
            return Json(new List<PositionResponse>(),
                        "json");
        }

        [HttpPost]
        [Authorize]
        public ActionResult GetEmpGroups()
        {
            try
            {
                var result = AppUtil.ConvertTo<GroupResponse>(ServiceClient.IDN_DMS_EmpGroup_Load(User.Identity.Name));
                return Json(result,
                            "json");
            }
            catch (Exception e)
            {
                Logger.Debug(e);
            }
            return Json(new List<GroupResponse>(),
                        "json");
        }

        [HttpPost]
        [Authorize]
        public ActionResult RefreshEmployees(string branch,
                                             string province,
                                             string position,
                                             string empGrp,
                                             string search)
        {
            try
            {
                DateTime date = DateTime.Now;
                var result = AppUtil.ConvertTo<EmpCurrentLocationResponse>(ServiceClient.IDN_DMS_EmpCurrLocation(User.Identity.Name,
                                                                                                                 branch,
                                                                                                                 province,
                                                                                                                 position,
                                                                                                                 empGrp,
                                                                                                                 date,
                                                                                                                 search));
                return Json(result,
                            "json");
            }
            catch (Exception e)
            {
                Logger.Debug(e);
            }
            return Json(new List<EmpCurrentLocationResponse>(),
                        "json");
        }

        [Authorize]
        public ActionResult GetEmployeeName(string name)
        {
            const int heightPlate = 18;
            int length = name.Length;
            int width = length * 8 + 4;
            Image image = new Bitmap(width, heightPlate);
            Graphics g = Graphics.FromImage(image);
            Rectangle rect = new Rectangle(0, 0, width, heightPlate);
            g.FillRectangle(new SolidBrush(Color.Yellow), rect);
            g.DrawRectangle(new Pen(Color.Yellow), rect);
            StringFormat sf = new StringFormat
                              {
                                  Alignment = StringAlignment.Center,
                                  LineAlignment = StringAlignment.Center
                              };
            g.DrawString(name, new Font("Tahoma", 12f, FontStyle.Bold, GraphicsUnit.Pixel), Brushes.Black, rect, sf);
            MemoryStream mem = new MemoryStream();
            image.Save(mem, ImageFormat.Png);
            return File(mem.ToArray(), "image/png", "employee.png");
        }
    }
}
