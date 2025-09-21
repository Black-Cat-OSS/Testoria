using System;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Testoria.Projects.DTO;
using Testoria.Projects.Exceptions;
using Testoria.Projects.Interfaces;

namespace Testoria.Projects.Services
{
    /// <summary>
    /// Сервис для управления результатами тестов
    /// </summary>
    public sealed class TestResultService
    {
        private readonly PrismaService _prismaService;
        private readonly IProjectService _projectService;

        /// <summary>
        /// Инициализирует новый экземпляр класса TestResultService
        /// </summary>
        /// <param name="prismaService">Сервис для работы с базой данных</param>
        /// <param name="projectService">Сервис для работы с проектами</param>
        public TestResultService(PrismaService prismaService, IProjectService projectService)
        {
            _prismaService = prismaService;
            _projectService = projectService;
        }

        /// <summary>
        /// Создает результат теста
        /// </summary>
        /// <param name="createTestResultDto">Данные для создания результата теста</param>
        /// <returns>Созданный результат теста</returns>
        /// <exception cref="ProjectNotFoundException">Если проект не найден</exception>
        public async Task<TestResultDto> CreateTestResultAsync(CreateTestResultDto createTestResultDto)
        {
            // Проверяем существование проекта
            var project = await _projectService.GetProjectByIdAsync(createTestResultDto.ProjectId);
            if (project == null)
            {
                throw new ProjectNotFoundException(createTestResultDto.ProjectId);
            }

            var testResult = await _prismaService.TestResult.CreateAsync(new()
            {
                ProjectId = createTestResultDto.ProjectId.ToString(),
                TestName = createTestResultDto.TestName,
                Status = createTestResultDto.Status,
                Duration = createTestResultDto.Duration,
                ErrorMessage = createTestResultDto.ErrorMessage,
                StackTrace = createTestResultDto.StackTrace,
                RawData = createTestResultDto.RawData
            });

            return new TestResultDto
            {
                Id = Guid.Parse(testResult.Id),
                ProjectId = Guid.Parse(testResult.ProjectId),
                TestName = testResult.TestName,
                Status = testResult.Status,
                Duration = testResult.Duration,
                ErrorMessage = testResult.ErrorMessage,
                StackTrace = testResult.StackTrace,
                RawData = testResult.RawData,
                CreatedAt = testResult.CreatedAt
            };
        }

        /// <summary>
        /// Создает результаты тестов из Jest JSON
        /// </summary>
        /// <param name="projectId">Идентификатор проекта</param>
        /// <param name="jestJson">JSON данные от Jest</param>
        /// <returns>Массив созданных результатов тестов</returns>
        public async Task<TestResultDto[]> CreateTestResultsFromJestAsync(Guid projectId, JsonElement jestJson)
        {
            var results = new List<TestResultDto>();

            // Проверяем существование проекта
            var project = await _projectService.GetProjectByIdAsync(projectId);
            if (project == null)
            {
                throw new ProjectNotFoundException(projectId);
            }

            // Парсим Jest JSON
            if (jestJson.TryGetProperty("testResults", out var testResults))
            {
                foreach (var testResult in testResults.EnumerateArray())
                {
                    if (testResult.TryGetProperty("assertionResults", out var assertionResults))
                    {
                        foreach (var assertion in assertionResults.EnumerateArray())
                        {
                            var createDto = new CreateTestResultDto
                            {
                                ProjectId = projectId,
                                TestName = assertion.TryGetProperty("title", out var title) ? title.GetString() ?? "Unknown Test" : "Unknown Test",
                                Status = GetStatusFromJest(assertion),
                                Duration = GetDurationFromJest(assertion),
                                ErrorMessage = GetErrorMessageFromJest(assertion),
                                StackTrace = GetStackTraceFromJest(assertion),
                                RawData = assertion
                            };

                            var result = await CreateTestResultAsync(createDto);
                            results.Add(result);
                        }
                    }
                }
            }

            return results.ToArray();
        }

        private static string GetStatusFromJest(JsonElement assertion)
        {
            if (assertion.TryGetProperty("status", out var status))
            {
                return status.GetString() switch
                {
                    "passed" => "passed",
                    "failed" => "failed",
                    "pending" => "skipped",
                    "todo" => "skipped",
                    _ => "unknown"
                };
            }
            return "unknown";
        }

        private static float? GetDurationFromJest(JsonElement assertion)
        {
            if (assertion.TryGetProperty("duration", out var duration))
            {
                return duration.GetSingle();
            }
            return null;
        }

        private static string? GetErrorMessageFromJest(JsonElement assertion)
        {
            if (assertion.TryGetProperty("failureMessages", out var failureMessages) && 
                failureMessages.GetArrayLength() > 0)
            {
                return failureMessages[0].GetString();
            }
            return null;
        }

        private static string? GetStackTraceFromJest(JsonElement assertion)
        {
            if (assertion.TryGetProperty("failureMessages", out var failureMessages) && 
                failureMessages.GetArrayLength() > 1)
            {
                return string.Join("\n", failureMessages.EnumerateArray().Skip(1).Select(f => f.GetString()));
            }
            return null;
        }
    }
}
