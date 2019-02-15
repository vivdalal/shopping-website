using Microsoft.AspNetCore.Http;
using System.Threading.Tasks;

namespace ShoppingWebSiteUI.Middleware
{
    public class AuthenticationMiddleware
    {
        private readonly RequestDelegate next;

        public AuthenticationMiddleware(RequestDelegate next)
        {
            this.next = next;
        }

        public async Task Invoke(HttpContext httpContext)
        {

            if (
                httpContext.Request.Path.Value != "/Auth/Login"
                && httpContext.Request.Path.Value != "/products"
                && httpContext.Session.GetString("username") == null)
            {
                httpContext.Response.Redirect("/Auth/Login");
                return;
            }

            await next(httpContext);
        }
    }
}
