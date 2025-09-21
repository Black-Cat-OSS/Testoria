using System;
using System.ComponentModel.DataAnnotations;
using System.Text.Json;

namespace Testoria.Projects.DTO
{
    /// <summary>
    /// DTO для создания результата теста
    /// </summary>
    public sealed record CreateTestResultDto
    {
        /// <summary>
        /// Идентификатор проекта
        /// </summary>
        [Required(ErrorMessage = "Идентификатор проекта обязателен")]
        public Guid ProjectId { get; init; }

        /// <summary>
        /// Название теста
        /// </summary>
        [Required(ErrorMessage = "Название теста обязательно")]
        [StringLength(500, MinimumLength = 1, ErrorMessage = "Название теста должно содержать от 1 до 500 символов")]
        public string TestName { get; init; } = string.Empty;

        /// <summary>
        /// Статус теста (passed, failed, skipped)
        /// </summary>
        [Required(ErrorMessage = "Статус теста обязателен")]
        [RegularExpression("^(passed|failed|skipped)$", ErrorMessage = "Статус теста должен быть: passed, failed или skipped")]
        public string Status { get; init; } = string.Empty;

        /// <summary>
        /// Длительность выполнения теста в миллисекундах
        /// </summary>
        [Range(0, float.MaxValue, ErrorMessage = "Длительность теста должна быть положительным числом")]
        public float? Duration { get; init; }

        /// <summary>
        /// Сообщение об ошибке (если тест провалился)
        /// </summary>
        [StringLength(2000, ErrorMessage = "Сообщение об ошибке не должно превышать 2000 символов")]
        public string? ErrorMessage { get; init; }

        /// <summary>
        /// Стек вызовов ошибки (если тест провалился)
        /// </summary>
        [StringLength(10000, ErrorMessage = "Стек вызовов не должен превышать 10000 символов")]
        public string? StackTrace { get; init; }

        /// <summary>
        /// Полные данные теста в формате Jest JSON
        /// </summary>
        [Required(ErrorMessage = "Данные теста обязательны")]
        public JsonElement RawData { get; init; }
    }
}
