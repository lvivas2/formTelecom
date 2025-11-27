import { useCallback } from "react";

/**
 * Hook personalizado para funciones helper comunes en formularios
 * Extrae funciones repetidas de componentes como Neumaticos y DocumentacionSeguridad
 */
export const useFormHelpers = () => {
  /**
   * Convierte fecha de DD-MM-YYYY a YYYY-MM-DD (formato input date)
   */
  const formatDateForInput = useCallback(
    (dateStr: string | null | undefined): string => {
      if (!dateStr) return "";
      // Si ya está en formato YYYY-MM-DD, retornarlo
      if (/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) return dateStr;
      // Si está en formato DD-MM-YYYY, convertirlo
      const parts = dateStr.split("-");
      if (parts.length === 3 && parts[0].length === 2) {
        return `${parts[2]}-${parts[1]}-${parts[0]}`;
      }
      return dateStr;
    },
    []
  );

  /**
   * Convierte fecha de YYYY-MM-DD a DD-MM-YYYY (formato almacenado)
   */
  const formatDateForStorage = useCallback((dateStr: string): string => {
    if (!dateStr) return "";
    const parts = dateStr.split("-");
    if (parts.length === 3) {
      return `${parts[2]}-${parts[1]}-${parts[0]}`;
    }
    return dateStr;
  }, []);

  /**
   * Normaliza un valor booleano desde diferentes formatos
   */
  const normalizeBoolean = useCallback((value: unknown): boolean => {
    if (typeof value === "boolean") return value;
    if (typeof value === "string") {
      return value === "true" || value === "si" || value === "yes";
    }
    return false;
  }, []);

  /**
   * Normaliza un string, convirtiendo valores no-string a string vacío
   */
  const normalizeString = useCallback((value: unknown): string => {
    if (typeof value === "string") return value;
    return value ? String(value) : "";
  }, []);

  /**
   * Actualiza una propiedad anidada en un objeto
   * Útil para actualizar objetos con estructura: { ...parent, [key]: { ...current, ...updates } }
   */
  const updateNestedProperty = useCallback(
    <T, K extends keyof T>(
      currentData: T,
      key: K,
      updates: Partial<T[K] extends Record<string, unknown> ? T[K] : never>
    ): T => {
      const currentValue = currentData[key];
      if (
        typeof currentValue === "object" &&
        currentValue !== null &&
        !Array.isArray(currentValue)
      ) {
        return {
          ...currentData,
          [key]: {
            ...(currentValue as Record<string, unknown>),
            ...updates,
          },
        } as T;
      }
      return currentData;
    },
    []
  );

  /**
   * Actualiza una propiedad simple en un objeto
   */
  const updateProperty = useCallback(
    <T, K extends keyof T>(currentData: T, key: K, value: T[K]): T => {
      return {
        ...currentData,
        [key]: value,
      };
    },
    []
  );

  /**
   * Obtiene el valor booleano de un objeto con estructura { tiene: boolean }
   */
  const getTieneValue = useCallback(
    (value: { tiene: boolean } | unknown): boolean => {
      if (!value) return false;
      if (typeof value === "object" && value !== null && "tiene" in value) {
        return (value as { tiene: boolean }).tiene;
      }
      return false;
    },
    []
  );

  /**
   * Obtiene la fecha de vencimiento de un objeto TieneVencimiento
   */
  const getVencimiento = useCallback(
    (
      value: { tiene: boolean; vencimiento?: string | null } | unknown
    ): string => {
      if (!value || typeof value !== "object" || value === null) return "";
      if ("vencimiento" in value && value.vencimiento) {
        return formatDateForInput(value.vencimiento as string);
      }
      return "";
    },
    [formatDateForInput]
  );

  return {
    formatDateForInput,
    formatDateForStorage,
    normalizeBoolean,
    normalizeString,
    updateNestedProperty,
    updateProperty,
    getTieneValue,
    getVencimiento,
  };
};
