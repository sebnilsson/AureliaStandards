using Microsoft.AspNetCore.Mvc;

namespace AureliaStandards.WebApp.Controllers
{
    public class HomeController : Controller
    {
        public IActionResult Index()
        {
            var redirectUrl = this.Url.RouteUrl("Default", new { action = "Aurelia" });
            return this.Redirect(redirectUrl);
        }
        
        public IActionResult Angular()
        {
            return this.View();
        }

        public IActionResult Aurelia()
        {
            return this.View();
        }

        public IActionResult React()
        {
            return this.View();
        }
    }
}