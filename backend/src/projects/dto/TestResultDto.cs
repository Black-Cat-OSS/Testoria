using System;
using System.Text.Json;

namespace Testoria.Projects.DTO
{
    /// <summary>
    /// DTO для представления результата теста
    /// </summary>
    public sealed record TestResultDto
    {
        /// <summary>
        /// Уникальный идентификатор результата теста
        /// </summary>
        public Guid Id { get; init; }

        /// <summary>
        /// Идентификатор проекта
        /// </summary>
        public Guid ProjectId { get; init; }

        /// <summary>
        /// Название теста
        /// </summary>
        public string TestName { get; init; } = string.Empty;

        /// <summary>
        /// Статус теста (passed, failed, skipped)
        /// </summary>
        public string Status { get; init; } = string.Empty;

        /// <summary>
        /// Длительность выполнения теста в миллисекундах
        /// </summary>
        public float? Duration { get; init; }

        /// <summary>
        /// Сообщение об ошибке (если тест провалился)
        /// </summary>
        public string? ErrorMessage { get; init; }

        /// <summary>
        /// Стек вызовов ошибки (если тест провалился)
        /// </summary>
        public string? StackTrace { get; init; }

        /// <summary>
        /// Полные данные теста в формате Jest JSON
        /// </summary>
        public JsonElement RawData { get; init; }

        /// <summary>
        /// Дата создания записи
        /// </summary>
        public DateTime CreatedAt { get; init; }
    }
}
