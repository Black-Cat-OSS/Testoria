using System;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Testoria.Projects.DTO;
using Testoria.Projects.Exceptions;
using Testoria.Projects.Interfaces;

namespace Testoria.Projects.Services
{
    /// <summary>
    /// Сервис для управления проектами
    /// </summary>
    public sealed class ProjectService : IProjectService
    {
        private readonly PrismaService _prismaService;

        /// <summary>
        /// Инициализирует новый экземпляр класса ProjectService
        /// </summary>
        /// <param name="prismaService">Сервис для работы с базой данных</param>
        public ProjectService(PrismaService prismaService)
        {
            _prismaService = prismaService;
        }

        /// <inheritdoc />
        public async Task<ProjectDto> CreateProjectAsync(CreateProjectDto createProjectDto)
        {
            var project = await _prismaService.Project.CreateAsync(new()
            {
                Name = createProjectDto.Name
            });

            return new ProjectDto
            {
                Id = Guid.Parse(project.Id),
                Name = project.Name,
                CreatedAt = project.CreatedAt,
                UpdatedAt = project.UpdatedAt
            };
        }

        /// <inheritdoc />
        public async Task<ProjectDto?> GetProjectByIdAsync(Guid id)
        {
            var project = await _prismaService.Project.FindUniqueAsync(p => p.Id == id.ToString());

            if (project == null)
            {
                return null;
            }

            return new ProjectDto
            {
                Id = Guid.Parse(project.Id),
                Name = project.Name,
                CreatedAt = project.CreatedAt,
                UpdatedAt = project.UpdatedAt
            };
        }

        /// <inheritdoc />
        public async Task<ProjectDto[]> GetAllProjectsAsync()
        {
            var projects = await _prismaService.Project.FindManyAsync();

            return projects.Select(p => new ProjectDto
            {
                Id = Guid.Parse(p.Id),
                Name = p.Name,
                CreatedAt = p.CreatedAt,
                UpdatedAt = p.UpdatedAt
            }).ToArray();
        }
    }
}
