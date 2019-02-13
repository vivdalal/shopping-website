
using System;
using System.Collections.Generic;
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

        HttpClient client;

        public HttpClient CreateClient()
        {
            client = new HttpClient();
            client.BaseAddress = new Uri(new Uri(_hostUri), "api/products/"); return client;
        }
        public HttpClient CreateActionClient(string action)
        {
            client = new HttpClient();
            client.BaseAddress = new Uri(new Uri(_hostUri), "api/products/" + action);
            return client;
        }

        public async Task<IEnumerable<ProductDTO>> GetProductsAsync()
        {
            using (var client = CreateClient())
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



        public System.Net.HttpStatusCode AddProductToCart(ProductDTO student)
        {
            using (var client = CreateActionClient("Post01"))
            {
                HttpResponseMessage response = null;
                try
                {
                    //response = client.PostAsJsonAsync(client.BaseAddress, company).Result;
                    var output = JsonConvert.SerializeObject(student);
                    HttpContent contentPost = new StringContent(output, System.Text.Encoding.UTF8, "application/json");
                    response = client.PostAsync(client.BaseAddress, contentPost).Result;
                }
                catch (Exception ex)
                {
                    Console.WriteLine(ex.Message);
                }
                return response.StatusCode;
            }

        }

 
        public async Task<UserDTO> ValidateUserCredentials(UserDTO userDTO)
        {
            using (var client = CreateActionClient("validate"))
            {
                HttpResponseMessage response = null;
                try
                {
                    //response = client.PostAsJsonAsync(client.BaseAddress, company).Result;
                    var output = JsonConvert.SerializeObject(userDTO);
                    HttpContent contentPost = new StringContent(output, System.Text.Encoding.UTF8, "application/json");
                    response = client.PostAsync(client.BaseAddress, contentPost).Result;

                    if (response.IsSuccessStatusCode)
                    {
                        var avail = await response.Content.ReadAsStringAsync()
                            .ContinueWith<UserDTO>(postTask =>
                            {
                                return JsonConvert.DeserializeObject<UserDTO>(postTask.Result);
                            });
                        return avail;
                    }
                    else
                    {
                        return null;
                    }
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



