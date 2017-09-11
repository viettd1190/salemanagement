using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Security;
using SaleManagement.WebApp2.Models;
using SaleManagement.WebApp2.Models.Response;

namespace SaleManagement.WebApp2.Controllers
{
    public class AccountController : BaseController
    {
        [AllowAnonymous]
        // GET: Account
        public ActionResult LogOn()
        {
            return View(new LogOnModel());
        }

        [AllowAnonymous]
        [ValidateInput(false)]
        [HttpPost]
        public ActionResult LogOn(LogOnModel model)
        {
            if (ModelState.IsValid)
            {
                try
                {
                    List<LogOnResponse> result = AppUtil.ConvertTo<LogOnResponse>(ServiceClient.IDN_SmartPhone_Login(model.Username,
                                                                                                                     model.Password));
                    if (result.Count == 1)
                    {
                        if (result[0].Result == 1)
                        {
                            Login(model,
                                  model.RememberMe);
                            return RedirectToAction("Index",
                                                    "Home");
                        }
                    }
                    ModelState.AddModelError("",
                                             "Tên đăng nhập hoặc mật khẩu không chính xác");
                }
                catch (Exception e)
                {
                    Logger.Debug(e);
                }
            }
            return View(model);
        }

        private void Login(LogOnModel user,
                           bool remember)
        {
            var userLastModified = new DateTime(2017,
                                                08,
                                                30,
                                                9,
                                                0,
                                                0);
            Session["StartSession"] = true;

            FormsAuthentication.SetAuthCookie(user.Username,
                                              remember);
            Session["UserId"] = 1;
            HttpContext.Application["user_" + 1] = userLastModified.Ticks;

            Response.Cookies.Add(new HttpCookie("u",
                                                userLastModified.Ticks + "")
                                 {
                                     Expires = DateTime.Now.AddDays(1)
                                 });
            Response.Cookies.Add(new HttpCookie("p",
                                                DateTime.Now.AddDays(2)
                                                        .Ticks + "")
                                 {
                                     Expires = DateTime.Now.AddDays(2)
                                 });
        }

        [AllowAnonymous]
        public ActionResult LogOff()
        {
            Session.Clear();
            FormsAuthentication.SignOut();
            var httpCookie = Response.Cookies[FormsAuthentication.FormsCookieName];
            if (httpCookie != null)
                httpCookie.Expires = DateTime.Now.AddYears(-1);

            foreach (var cookie in Request.Cookies.AllKeys)
                Response.Cookies.Add(new HttpCookie(cookie,
                                                    "")
                                     {
                                         Expires = DateTime.Now.AddYears(-1)
                                     });

            return RedirectToAction("Index",
                                    "Home");
        }
    }
}