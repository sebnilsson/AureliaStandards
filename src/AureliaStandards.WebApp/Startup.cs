using System;

using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.SpaServices.Webpack;
using Microsoft.AspNetCore.ResponseCompression;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;

namespace AureliaStandards.WebApp
{
    public class Startup
    {
        public IConfigurationRoot Configuration { get; }

        public Startup(IHostingEnvironment env)
        {
            var builder = new ConfigurationBuilder().SetBasePath(env.ContentRootPath)
                .AddJsonFile("appsettings.json", optional: true, reloadOnChange: true)
                .AddJsonFile($"appsettings.{env.EnvironmentName}.json", optional: true).AddEnvironmentVariables();
            this.Configuration = builder.Build();
        }

        public void ConfigureServices(IServiceCollection services)
        {
            services.AddMvc();

            //services.AddSignalR();

            services.Configure<GzipCompressionProviderOptions>(
                options => options.Level = System.IO.Compression.CompressionLevel.Optimal);

            services.AddResponseCompression(
                options =>
                    {
                        options.MimeTypes = new[]
                                                {
                                                    // Default
                                                    "text/plain", "text/css", "application/javascript", "text/html",
                                                    "application/xml", "text/xml", "application/json", "text/json",
                                                    // Custom
                                                    "image/svg+xml"
                                                };
                        options.EnableForHttps = true;
                    });

            services.AddSingleton(_ => CreateTasksRepository());
        }

        public void Configure(IApplicationBuilder app, IHostingEnvironment env, ILoggerFactory loggerFactory)
        {
            var loggingConfiguration = this.Configuration.GetSection("Logging");

            loggerFactory.AddConsole(loggingConfiguration);
            loggerFactory.AddDebug();

            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();

                //app.UseWebpackDevMiddleware(new WebpackDevMiddlewareOptions { HotModuleReplacement = true });
            }
            else
            {
                app.UseExceptionHandler("/Home/Error");
            }

            app.UseResponseCompression();

            app.UseStaticFiles();

            //app.UseSignalR("hubs");

            app.UseMvc(
                routes =>
                    {
                        routes.MapRoute(
                            name: "Default",
                            template: "{action=Index}/{id?}",
                            defaults: new { controller = "Home" });

                        //routes.MapSpaFallbackRoute(
                        //    name: "spa-fallback",
                        //    defaults: new { controller = "Home", action = "Index" });
                    });
        }

        private static TasksRepository CreateTasksRepository()
        {
            var repository = new TasksRepository();

            repository.AddOrUpdate(
                new TaskItem
                    {
                        CreatedAt = DateTime.Now.AddHours(-1),
                        DetailsText = "No details, please",
                        Id = Guid.NewGuid(),
                        IsDone = false,
                        TitleText = "First task",
                        UpdatedAt = DateTime.Now.AddMinutes(-30)
                    });
            repository.AddOrUpdate(
                new TaskItem
                    {
                        CreatedAt = DateTime.Now.AddHours(-2),
                        DetailsText = "All the details, please",
                        Id = Guid.NewGuid(),
                        IsDone = true,
                        TitleText = "Second task",
                        UpdatedAt = DateTime.Now.AddMinutes(-90)
                    });
            repository.AddOrUpdate(
                new TaskItem
                    {
                        CreatedAt = DateTime.Now.AddHours(-3),
                        DetailsText = "The best stuffz",
                        Id = Guid.NewGuid(),
                        IsDone = false,
                        TitleText = "Buy milk",
                        UpdatedAt = DateTime.Now.AddMinutes(-45)
                    });
            repository.AddOrUpdate(
                new TaskItem
                    {
                        CreatedAt = DateTime.Now.AddHours(-1),
                        DetailsText = null,
                        Id = Guid.NewGuid(),
                        IsDone = false,
                        TitleText = "Do more stuff",
                        UpdatedAt = DateTime.Now.AddMinutes(-15)
                    });

            return repository;
        }
    }
}