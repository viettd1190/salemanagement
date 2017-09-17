using System;
using System.Collections.Generic;
using System.Data;
using System.Drawing;
using System.Drawing.Imaging;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using SaleManagement.WebApp.Models.Response;

namespace SaleManagement.WebApp.Controllers
{
    [Authorize]
    public class MonitorController : BaseController
    {
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

        [HttpPost]
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

        public ActionResult History()
        {
            return View();
        }

        [HttpPost]
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

        [HttpPost]
        public ActionResult GetEmployeeInformation(int id)
        {
            try
            {
                DateTime date = DateTime.Today;
                var result = AppUtil.ConvertTo<EmpCustVisitedResponse>(ServiceClient.IDN_DMS_CustVisited_Emp_Load(id,
                                                                                                                  date));
                if(result.Any())
                {
                    return Json(result[result.Count-1],
                                "json");
                }
            }
            catch (Exception e)
            {
                Logger.Debug(e);
            }
            return Json(new List<EmpCustVisitedResponse>(),
                        "json");
        }

        [HttpPost]
        public ActionResult GetEmpHistoryTracking(int empId,
                                                  string date)
        {
            try
            {
                DateTime dateTime;
                if(DateTime.TryParse(date,out dateTime))
                {
                    var result = AppUtil.ConvertTo<EmpHistoryTrackingResponse>(ServiceClient.IDN_EmpHistoryTracking_byEmp(empId.ToString(),
                                                                                                                          dateTime));
                    if(result.Any())
                    {
                        return Json(result,
                                    "json");
                    }
                }
            }
            catch (Exception e)
            {
                Logger.Debug(e);
            }
            return Json(new List<EmpHistoryTrackingResponse>(),
                        "json");
        }
    }
}