import { LocalService } from './local.service';

describe('LocalService', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('should set an item in localStorage', () => {
    const key = 'testKey';
    const value = { name: 'John Doe', age: 30 };

    LocalService.setItem(key, value);

    const storedValue = localStorage.getItem(key);
    expect(storedValue).toEqual(JSON.stringify(value));
  });

  it('should get an item from localStorage', () => {
    const key = 'testKey';
    const value = { name: 'Jane Doe', age: 25 };
    localStorage.setItem(key, JSON.stringify(value));

    const retrievedValue = LocalService.getItem<{ name: string; age: number }>(key);

    expect(retrievedValue).toEqual(value);
  });

  it('should return null when getting a non-existent key', () => {
    const retrievedValue = LocalService.getItem('nonExistentKey');
    expect(retrievedValue).toBeNull();
  });

  it('should remove an item from localStorage', () => {
    const key = 'testKey';
    localStorage.setItem(key, 'testValue');

    LocalService.removeItem(key);

    expect(localStorage.getItem(key)).toBeNull();
  });

  it('should clear all items from localStorage', () => {
    localStorage.setItem('key1', 'value1');
    localStorage.setItem('key2', 'value2');

    LocalService.clear();

    expect(localStorage.getItem('key1')).toBeNull();
    expect(localStorage.getItem('key2')).toBeNull();
  });

  it('should return true if a key exists in localStorage', () => {
    const key = 'existingKey';
    localStorage.setItem(key, 'value');

    const exists = LocalService.hasKey(key);

    expect(exists).toBeTrue();
  });

  it('should return false if a key does not exist in localStorage', () => {
    const exists = LocalService.hasKey('nonExistentKey');
    expect(exists).toBeFalse();
  });

  it('should handle JSON parse errors gracefully in getItem', () => {
    try {
      const key = 'malformedKey';
      localStorage.setItem(key, 'this is not valid JSON');

      const retrievedValue = LocalService.getItem(key);

      expect(retrievedValue).toBeNull();
    } catch (error) {
      fail(`Error inesperado en el test 'JSON parse errors': ${error}`);
    }
  });

  describe('LocalService Error Handling', () => {
    it('should log an error if localStorage.removeItem throws', () => {
      const key = 'testKey';
      spyOn(localStorage, 'removeItem').and.throwError('Test error');
      spyOn(console, 'error');

      LocalService.removeItem(key);

      expect(console.error).toHaveBeenCalledWith(
        `Error eliminando en localStorage (${key}): Error: Test error`
      );
    });

    it('should log an error if localStorage.clear throws', () => {
      spyOn(localStorage, 'clear').and.throwError('Test error');
      spyOn(console, 'error');

      LocalService.clear();

      expect(console.error).toHaveBeenCalledWith(
        'Error limpiando localStorage: Error: Test error'
      );
    });
  });

  it('should handle JSON stringify errors gracefully in setItem', () => {
    try {
      const key = 'errorKey';
      const value: any = { circular: null };
      value.circular = value;

      spyOn(console, 'error');

      LocalService.setItem(key, value);

      expect(localStorage.getItem(key)).toBeNull();
      expect(console.error).toHaveBeenCalled();
    } catch (error) {
      fail(`Error inesperado en el test 'JSON stringify errors': ${error}`);
    }
  });
});
