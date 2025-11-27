import { useEffect, useRef, useState, useCallback } from "react";

interface UseAutoSaveOptions<T> {
  data: T;
  onSave: (data: T) => Promise<void>;
  debounceMs?: number;
  enabled?: boolean;
}

interface UseAutoSaveReturn {
  isSaving: boolean;
  isSaved: boolean;
  error: Error | null;
  saveNow: () => Promise<void>;
}

/**
 * Hook reutilizable para autoguardado con debounce
 *
 * @param data - Los datos a guardar
 * @param onSave - Función async que realiza el guardado
 * @param debounceMs - Tiempo de espera antes de guardar (default: 500ms)
 * @param enabled - Si está habilitado el autoguardado (default: true)
 *
 * @returns { isSaving, isSaved, error, saveNow }
 */
export const useAutoSave = <T>({
  data,
  onSave,
  debounceMs = 500,
  enabled = true,
}: UseAutoSaveOptions<T>): UseAutoSaveReturn => {
  const [isSaving, setIsSaving] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const previousDataRef = useRef<T>(data);
  const isFirstRender = useRef(true);

  // Función para guardar inmediatamente
  const saveNow = useCallback(async () => {
    if (!enabled) return;

    setIsSaving(true);
    setError(null);
    setIsSaved(false);

    try {
      await onSave(data);
      setIsSaved(true);
      previousDataRef.current = data;

      // Resetear el estado "guardado" después de 2 segundos
      setTimeout(() => {
        setIsSaved(false);
      }, 2000);
    } catch (err) {
      const error = err instanceof Error ? err : new Error(String(err));
      setError(error);
      console.error("Error en autoguardado:", error);

      // Mantener el error visible por más tiempo
      setTimeout(() => {
        setError(null);
      }, 5000);
    } finally {
      setIsSaving(false);
    }
  }, [data, onSave, enabled]);

  // Efecto para autoguardado con debounce
  useEffect(() => {
    // Ignorar el primer render
    if (isFirstRender.current) {
      isFirstRender.current = false;
      previousDataRef.current = data;
      return;
    }

    // Solo guardar si los datos cambiaron
    if (JSON.stringify(previousDataRef.current) === JSON.stringify(data)) {
      return;
    }

    if (!enabled) return;

    // Limpiar timeout anterior
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // Crear nuevo timeout
    timeoutRef.current = setTimeout(() => {
      saveNow();
    }, debounceMs);

    // Cleanup
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, debounceMs, enabled]);

  // Cleanup al desmontar
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return {
    isSaving,
    isSaved,
    error,
    saveNow,
  };
};
