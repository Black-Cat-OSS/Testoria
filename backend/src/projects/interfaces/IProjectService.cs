using System;
using System.Threading.Tasks;
using Testoria.Projects.DTO;

namespace Testoria.Projects.Interfaces
{
    /// <summary>
    /// Интерфейс для сервиса управления проектами
    /// </summary>
    public interface IProjectService
    {
        /// <summary>
        /// Создает новый проект
        /// </summary>
        /// <param name="createProjectDto">Данные для создания проекта</param>
        /// <returns>Созданный проект</returns>
        Task<ProjectDto> CreateProjectAsync(CreateProjectDto createProjectDto);

        /// <summary>
        /// Получает проект по идентификатору
        /// </summary>
        /// <param name="id">Идентификатор проекта</param>
        /// <returns>Проект или null, если не найден</returns>
        Task<ProjectDto?> GetProjectByIdAsync(Guid id);

        /// <summary>
        /// Получает все проекты
        /// </summary>
        /// <returns>Список всех проектов</returns>
        Task<ProjectDto[]> GetAllProjectsAsync();
    }
}
