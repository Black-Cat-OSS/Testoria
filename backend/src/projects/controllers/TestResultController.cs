using System;
using System.Text.Json;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Testoria.Projects.DTO;
using Testoria.Projects.Services;

namespace Testoria.Projects.Controllers
{
    /// <summary>
    /// Контроллер для управления результатами тестов
    /// </summary>
    [ApiController]
    [Route("api/[controller]")]
    public sealed class TestResultController : ControllerBase
    {
        private readonly TestResultService _testResultService;

        /// <summary>
        /// Инициализирует новый экземпляр класса TestResultController
        /// </summary>
        /// <param name="testResultService">Сервис для работы с результатами тестов</param>
        public TestResultController(TestResultService testResultService)
        {
            _testResultService = testResultService;
        }

        /// <summary>
        /// Создает результат теста
        /// </summary>
        /// <param name="createTestResultDto">Данные для создания результата теста</param>
        /// <returns>Созданный результат теста</returns>
        /// <response code="201">Результат теста успешно создан</response>
        /// <response code="400">Некорректные данные запроса</response>
        /// <response code="404">Проект не найден</response>
        [HttpPost]
        [ProducesResponseType(typeof(TestResultDto), 201)]
        [ProducesResponseType(400)]
        [ProducesResponseType(404)]
        public async Task<ActionResult<TestResultDto>> CreateTestResult([FromBody] CreateTestResultDto createTestResultDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                var testResult = await _testResultService.CreateTestResultAsync(createTestResultDto);
                return CreatedAtAction(nameof(GetTestResult), new { id = testResult.Id }, testResult);
            }
            catch (ProjectNotFoundException)
            {
                return NotFound($"Проект с идентификатором {createTestResultDto.ProjectId} не найден");
            }
        }

        /// <summary>
        /// Отправляет результаты тестов Jest в формате JSON
        /// </summary>
        /// <param name="projectId">Идентификатор проекта</param>
        /// <param name="jestJson">JSON данные от Jest</param>
        /// <returns>Массив созданных результатов тестов</returns>
        /// <response code="201">Результаты тестов успешно созданы</response>
        /// <response code="400">Некорректные данные запроса</response>
        /// <response code="404">Проект не найден</response>
        [HttpPost("jest/{projectId}")]
        [ProducesResponseType(typeof(TestResultDto[]), 201)]
        [ProducesResponseType(400)]
        [ProducesResponseType(404)]
        public async Task<ActionResult<TestResultDto[]>> CreateTestResultsFromJest(
            Guid projectId, 
            [FromBody] JsonElement jestJson)
        {
            try
            {
                var testResults = await _testResultService.CreateTestResultsFromJestAsync(projectId, jestJson);
                return CreatedAtAction(nameof(GetTestResultsByProject), new { projectId }, testResults);
            }
            catch (ProjectNotFoundException)
            {
                return NotFound($"Проект с идентификатором {projectId} не найден");
            }
            catch (JsonException ex)
            {
                return BadRequest($"Некорректный JSON: {ex.Message}");
            }
        }

        /// <summary>
        /// Получает результат теста по идентификатору
        /// </summary>
        /// <param name="id">Идентификатор результата теста</param>
        /// <returns>Результат теста</returns>
        /// <response code="200">Результат теста найден</response>
        /// <response code="404">Результат теста не найден</response>
        [HttpGet("{id}")]
        [ProducesResponseType(typeof(TestResultDto), 200)]
        [ProducesResponseType(404)]
        public async Task<ActionResult<TestResultDto>> GetTestResult(Guid id)
        {
            // TODO: Реализовать получение результата теста по ID
            return NotFound("Метод не реализован");
        }

        /// <summary>
        /// Получает все результаты тестов для проекта
        /// </summary>
        /// <param name="projectId">Идентификатор проекта</param>
        /// <returns>Список результатов тестов</returns>
        /// <response code="200">Список результатов тестов получен</response>
        [HttpGet("project/{projectId}")]
        [ProducesResponseType(typeof(TestResultDto[]), 200)]
        public async Task<ActionResult<TestResultDto[]>> GetTestResultsByProject(Guid projectId)
        {
            // TODO: Реализовать получение результатов тестов по проекту
            return Ok(Array.Empty<TestResultDto>());
        }
    }
}
