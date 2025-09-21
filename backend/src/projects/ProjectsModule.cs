using Microsoft.Extensions.DependencyInjection;
using Testoria.Projects.Controllers;
using Testoria.Projects.Interfaces;
using Testoria.Projects.Services;

namespace Testoria.Projects
{
    /// <summary>
    /// Модуль для управления проектами и результатами тестов
    /// </summary>
    public sealed class ProjectsModule
    {
        /// <summary>
        /// Регистрирует сервисы модуля проектов
        /// </summary>
        /// <param name="services">Коллекция сервисов</param>
        public static void RegisterServices(IServiceCollection services)
        {
            services.AddScoped<IProjectService, ProjectService>();
            services.AddScoped<TestResultService>();
            services.AddScoped<ProjectController>();
            services.AddScoped<TestResultController>();
        }
    }
}
