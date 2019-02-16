
using System;
using System.Collections.Generic;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using Newtonsoft.Json;
using ShoppingWebSiteUI.Models;

namespace ShoppingWebSiteUI.API
{
    public class APICallClient
    {
        string _hostUri;
        public APICallClient(string hostUri)
        {
            _hostUri = hostUri;
        }

        public HttpClient CreateClient(string path, string action)
        {
            var client = new HttpClient();
            client.BaseAddress = new Uri(new Uri(_hostUri), path + "/" + action);
            return client;
        }

        public async Task<IEnumerable<ProductDTO>> GetProductsAsync()
        {
            using (var client = CreateClient("api", "products"))
            {
                HttpResponseMessage response;
                response = client.GetAsync(client.BaseAddress).Result;
                //var result = response.Content.ReadAsAsync<IEnumerable<Student>>().Result;
                if (response.IsSuccessStatusCode)
                {
                    var avail = await response.Content.ReadAsStringAsync()
                        .ContinueWith<IEnumerable<ProductDTO>>(postTask =>
                        {
                            return JsonConvert.DeserializeObject<IEnumerable<ProductDTO>>(postTask.Result);
                        });
                    return avail;
                }
                else
                {
                    return null;
                }
            }

        }
        
        public async Task<HttpStatusCode> AddProductToCart(CartDTO cart)
        {
            using (var client = CreateClient("api", "cart"))
            {
                HttpResponseMessage response = null;
                try
                {
                    //response = client.PostAsJsonAsync(client.BaseAddress, company).Result;
                    var output = JsonConvert.SerializeObject(cart);
                    HttpContent contentPost = new StringContent(output, System.Text.Encoding.UTF8, "application/json");
                    response = await client.PostAsync(client.BaseAddress, contentPost);
                }
                catch (Exception ex)
                {
                    Console.WriteLine(ex.Message);
                }
                return response.StatusCode;
            }

        }

        public async Task<HttpStatusCode> PerformLogin(User user)
        {
            if (string.IsNullOrEmpty(user.Username) || string.IsNullOrEmpty(user.Password))
            {
                return HttpStatusCode.BadRequest;
            }

            using (var client = CreateClient("api", "login"))
            {
                try
                {
                    var content = JsonConvert.SerializeObject(user);
                    HttpContent body = new StringContent(content, System.Text.Encoding.UTF8, "application/json");

                    HttpResponseMessage response = await client.PostAsync(client.BaseAddress, body);

                    return response.StatusCode;
                }
                catch (Exception ex)
                {
                    Console.WriteLine(ex.Message);
                    throw new Exception("Something went wrong while validating user credentials");
                }
            }
        }

        public async Task<HttpStatusCode> RegisterUser(User user)
        {
            if (string.IsNullOrEmpty(user.Username) || string.IsNullOrEmpty(user.Password))
            {
                return HttpStatusCode.BadRequest;
            }

            using (var client = CreateClient("api", "register"))
            {
                try
                {
                    var content = JsonConvert.SerializeObject(user);
                    HttpContent body = new StringContent(content, System.Text.Encoding.UTF8, "application/json");

                    HttpResponseMessage response = await client.PostAsync(client.BaseAddress, body);

                    return response.StatusCode;
                }
                catch (Exception ex)
                {
                    Console.WriteLine(ex.Message);
                    throw new Exception("Something went wrong while validating user credentials");
                }
            }
        }

    }
}



