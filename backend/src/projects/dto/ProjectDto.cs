using System;

namespace Testoria.Projects.DTO
{
    /// <summary>
    /// DTO для представления проекта
    /// </summary>
    public sealed record ProjectDto
    {
        /// <summary>
        /// Уникальный идентификатор проекта
        /// </summary>
        public Guid Id { get; init; }

        /// <summary>
        /// Название проекта
        /// </summary>
        public string Name { get; init; } = string.Empty;

        /// <summary>
        /// Дата создания проекта
        /// </summary>
        public DateTime CreatedAt { get; init; }

        /// <summary>
        /// Дата последнего обновления проекта
        /// </summary>
        public DateTime UpdatedAt { get; init; }
    }
}
