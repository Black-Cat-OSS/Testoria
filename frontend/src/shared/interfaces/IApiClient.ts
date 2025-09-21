/**
 * Базовый интерфейс для API клиентов
 * @template T - Тип данных, с которыми работает API
 */
export interface IApiClient<T> {
  /**
   * Получает все элементы
   * @returns Promise с массивом всех элементов
   */
  getAll(): Promise<Array<T>>;

  /**
   * Получает элемент по ID
   * @param id - Уникальный идентификатор элемента
   * @returns Promise с элементом или null, если элемент не найден
   */
  getById(id: string): Promise<T | null>;
}
