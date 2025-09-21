using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Testoria.Projects.DTO;
using Testoria.Projects.Interfaces;

namespace Testoria.Projects.Controllers
{
    /// <summary>
    /// Контроллер для управления проектами
    /// </summary>
    [ApiController]
    [Route("api/[controller]")]
    public sealed class ProjectController : ControllerBase
    {
        private readonly IProjectService _projectService;

        /// <summary>
        /// Инициализирует новый экземпляр класса ProjectController
        /// </summary>
        /// <param name="projectService">Сервис для работы с проектами</param>
        public ProjectController(IProjectService projectService)
        {
            _projectService = projectService;
        }

        /// <summary>
        /// Создает новый проект
        /// </summary>
        /// <param name="createProjectDto">Данные для создания проекта</param>
        /// <returns>Созданный проект</returns>
        /// <response code="201">Проект успешно создан</response>
        /// <response code="400">Некорректные данные запроса</response>
        [HttpPost]
        [ProducesResponseType(typeof(ProjectDto), 201)]
        [ProducesResponseType(400)]
        public async Task<ActionResult<ProjectDto>> CreateProject([FromBody] CreateProjectDto createProjectDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var project = await _projectService.CreateProjectAsync(createProjectDto);
            return CreatedAtAction(nameof(GetProject), new { id = project.Id }, project);
        }

        /// <summary>
        /// Получает проект по идентификатору
        /// </summary>
        /// <param name="id">Идентификатор проекта</param>
        /// <returns>Проект</returns>
        /// <response code="200">Проект найден</response>
        /// <response code="404">Проект не найден</response>
        [HttpGet("{id}")]
        [ProducesResponseType(typeof(ProjectDto), 200)]
        [ProducesResponseType(404)]
        public async Task<ActionResult<ProjectDto>> GetProject(Guid id)
        {
            var project = await _projectService.GetProjectByIdAsync(id);
            if (project == null)
            {
                return NotFound();
            }

            return Ok(project);
        }

        /// <summary>
        /// Получает все проекты
        /// </summary>
        /// <returns>Список всех проектов</returns>
        /// <response code="200">Список проектов получен</response>
        [HttpGet]
        [ProducesResponseType(typeof(ProjectDto[]), 200)]
        public async Task<ActionResult<ProjectDto[]>> GetAllProjects()
        {
            var projects = await _projectService.GetAllProjectsAsync();
            return Ok(projects);
        }
    }
}
