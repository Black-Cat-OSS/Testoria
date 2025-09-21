using System.ComponentModel.DataAnnotations;

namespace Testoria.Projects.DTO
{
    /// <summary>
    /// DTO для создания нового проекта
    /// </summary>
    public sealed record CreateProjectDto
    {
        /// <summary>
        /// Название проекта
        /// </summary>
        [Required(ErrorMessage = "Название проекта обязательно")]
        [StringLength(255, MinimumLength = 1, ErrorMessage = "Название проекта должно содержать от 1 до 255 символов")]
        public string Name { get; init; } = string.Empty;
    }
}
