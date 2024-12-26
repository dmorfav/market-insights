import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalService {
  static setItem(key: string, value: any): void {
    try {
      const serializedValue = JSON.stringify(value);
      localStorage.setItem(key, serializedValue);
    } catch (error) {
      console.error(`Error guardando en localStorage (${key}): ${error}`);
    }
  }

  static getItem<T>(key: string): T | null {
    try {
      const serializedValue = localStorage.getItem(key);
      if (!serializedValue) {
        return null;
      }
      return JSON.parse(serializedValue) as T;
    } catch (error) {
      console.warn(
        `Error leyendo de localStorage (${key}): Valor no es JSON válido. Detalle: ${error}`
      );
      return null;
    }
  }

  static removeItem(key: string): void {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error(`Error eliminando en localStorage (${key}): ${error}`);
    }
  }

  static clear(): void {
    try {
      localStorage.clear();
    } catch (error) {
      console.error(`Error limpiando localStorage: ${error}`);
    }
  }

  static hasKey(key: string): boolean {
    return localStorage.getItem(key) !== null;
  }
}
