using System;

namespace Testoria.Projects.Exceptions
{
    /// <summary>
    /// Исключение, возникающее когда проект не найден
    /// </summary>
    public sealed class ProjectNotFoundException : Exception
    {
        /// <summary>
        /// Инициализирует новый экземпляр класса ProjectNotFoundException
        /// </summary>
        /// <param name="projectId">Идентификатор проекта, который не найден</param>
        public ProjectNotFoundException(Guid projectId) 
            : base($"Проект с идентификатором {projectId} не найден")
        {
            ProjectId = projectId;
        }

        /// <summary>
        /// Идентификатор проекта, который не найден
        /// </summary>
        public Guid ProjectId { get; }
    }
}
