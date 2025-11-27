import React, { useEffect, useState, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Container,
  Box,
  Button,
  Alert,
  CircularProgress,
  Snackbar,
} from "@mui/material";
import {
  getRevisionById,
  updateRevisionStatus,
  savePartialRevision,
  type RevisionDetail as RevisionDetailType,
} from "../services/revisionService";
import { STATUSES } from "../entities/status";
import { Header } from "../components/Header";
import { DatosOriginales } from "../components/DatosOriginales";
import { AutoSaveIndicator } from "../components/AutoSaveIndicator";
import { QuickStatusDial } from "../components/QuickStatusDial";
import { RevisionFormSection } from "../components/RevisionFormSection";
import { useAutoSave } from "../hooks/useAutoSave";
import type { FormularioMantenimientoData } from "../entities/formData";

/**
 * Extrae y normaliza los datos de fields_ok del json_original
 * Maneja tanto el formato con fields_ok como el formato directo
 */
const extractFieldsOk = (
  jsonOriginal: unknown
): FormularioMantenimientoData | null => {
  if (!jsonOriginal || typeof jsonOriginal !== "object") {
    return null;
  }

  const original = jsonOriginal as Record<string, unknown>;

  // Si tiene la estructura con fields_ok, extraerlo
  if (original.fields_ok && typeof original.fields_ok === "object") {
    return original.fields_ok as FormularioMantenimientoData;
  }

  // Si no tiene fields_ok, usar directamente json_original
  return original as FormularioMantenimientoData;
};

/**
 * Combina datos de fields_ok con json_final
 * json_final tiene prioridad sobre fields_ok
 */
const mergeFormData = (
  fieldsOk: FormularioMantenimientoData | null,
  jsonFinal: FormularioMantenimientoData | null
): FormularioMantenimientoData => {
  // Empezar con un objeto vacío
  const merged: FormularioMantenimientoData = {
    dominio: null,
    modelo_vehiculo: null,
    km_actual: null,
    combustible_tipo: null,
    fecha: null,
    ultimo_service: null,
    ultima_distribucion: null,
    documentacion_seguridad: null,
    luces: null,
    neumaticos: null,
    nivel_de_liquidos: null,
    funcionamiento: null,
    estado_general: null,
    observaciones_finales: null,
  };

  // Primero aplicar fields_ok (base) - copiar todos los campos, incluyendo campos planos
  if (fieldsOk) {
    // Copiar todos los campos de fields_ok usando Object.keys para incluir campos dinámicos
    Object.keys(fieldsOk).forEach((key) => {
      const value = fieldsOk[key];

      // Manejar objetos anidados con merge profundo
      if (
        key === "documentacion_seguridad" ||
        key === "luces" ||
        key === "neumaticos" ||
        key === "nivel_de_liquidos" ||
        key === "funcionamiento" ||
        key === "estado_general" ||
        key === "ultimo_service" ||
        key === "ultima_distribucion" ||
        key === "observaciones_finales"
      ) {
        if (value && typeof value === "object" && !Array.isArray(value)) {
          merged[key] = {
            ...((merged[key] as object) || {}),
            ...value,
          } as never;
        } else {
          merged[key] = value as never;
        }
      } else {
        // Campos planos (dominio, modelo_vehiculo, etc.) - copiar directamente
        merged[key] = value as never;
      }
    });
  }

  // Luego aplicar json_final (tiene prioridad) - sobrescribe fields_ok
  if (jsonFinal) {
    // Copiar todos los campos de json_final, sobrescribiendo los de fields_ok
    Object.keys(jsonFinal).forEach((key) => {
      const value = jsonFinal[key];

      // Manejar objetos anidados con merge profundo
      if (
        key === "documentacion_seguridad" ||
        key === "luces" ||
        key === "neumaticos" ||
        key === "nivel_de_liquidos" ||
        key === "funcionamiento" ||
        key === "estado_general" ||
        key === "ultimo_service" ||
        key === "ultima_distribucion" ||
        key === "observaciones_finales"
      ) {
        if (value && typeof value === "object" && !Array.isArray(value)) {
          const existing = merged[key] as Record<string, unknown> | null;
          merged[key] = { ...(existing || {}), ...value } as never;
        } else {
          merged[key] = value as never;
        }
      } else {
        // Campos planos - sobrescribir completamente
        merged[key] = value as never;
      }
    });
  }

  return merged;
};

// Componente memoizado para el contenido del grid
// Evita re-renderizados cuando cambia el estado del SpeedDial
interface FormContentProps {
  revision: RevisionDetailType;
  formData: FormularioMantenimientoData | null;
  onFormDataChange: (data: FormularioMantenimientoData) => void;
}

const FormContent = React.memo<FormContentProps>(
  ({ revision, formData, onFormDataChange }) => {
    return (
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "1fr 1.4fr" },
          gap: 3,
          flex: 1,
          minHeight: 0,
          overflow: "hidden",
        }}
      >
        {/* Datos Originales - Izquierda */}
        <DatosOriginales
          jsonOriginal={revision.json_original}
          formData={formData}
          updatedAt={revision.updated_at}
        />

        {/* Formulario Editable - Derecha (más ancho) - Componente aislado y memoizado */}
        <RevisionFormSection
          formData={formData}
          onDataChange={onFormDataChange}
        />
      </Box>
    );
  }
);

FormContent.displayName = "FormContent";

export const RevisionDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [revision, setRevision] = useState<RevisionDetailType | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [formData, setFormData] = useState<FormularioMantenimientoData | null>(
    null
  );
  const [status, setStatus] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  // Callback memoizado para cambio de datos del formulario
  // Solo se crea una vez, manteniendo la referencia estable para componentes memoizados
  const handleDataChange = useCallback(
    (data: FormularioMantenimientoData) => {
      setFormData(data);
    },
    [] // Sin dependencias: la función es estable
  );

  // Callback memoizado para autoguardado
  const handleAutoSave = useCallback(
    async (data: FormularioMantenimientoData | null) => {
      if (!id || !data) return;
      await savePartialRevision(id, data);
    },
    [id]
  );

  // Hook de autoguardado
  const {
    isSaving,
    isSaved,
    error: autoSaveError,
  } = useAutoSave({
    data: formData,
    onSave: handleAutoSave,
    debounceMs: 500,
    enabled: !!id && !!formData && !loading,
  });

  // Mostrar error en Snackbar si hay error de autoguardado
  useEffect(() => {
    if (autoSaveError) {
      setSnackbarMessage(`Error al guardar: ${autoSaveError.message}`);
      setSnackbarOpen(true);
    }
  }, [autoSaveError]);

  const fetchRevision = useCallback(async () => {
    if (!id) return;

    try {
      setLoading(true);
      const data = await getRevisionById(id);

      // Si el estado es pending, cambiarlo automáticamente a in_review
      if (data.status === "pending") {
        try {
          await updateRevisionStatus(id, "in_review");
          // Actualizar el estado local
          data.status = "in_review";
          data.updated_at = new Date().toISOString();
        } catch (statusError) {
          console.error("Error al actualizar estado a in_review:", statusError);
          // Continuar aunque falle el cambio de estado
        }
      }

      setRevision(data);
      setStatus(data.status || "pending");

      // Extraer fields_ok del json_original
      const fieldsOkData = extractFieldsOk(data.json_original);

      // Si hay json_final, usarlo (tiene prioridad sobre fields_ok)
      const finalData =
        (data.json_final as FormularioMantenimientoData) || null;

      // Combinar: json_final tiene prioridad, pero si falta algo, usar fields_ok
      const mergedData = mergeFormData(fieldsOkData, finalData);

      setFormData(mergedData);
    } catch (err: unknown) {
      console.error("Error fetching revision:", err);
      const errorMessage =
        err instanceof Error ? err.message : "Error al cargar la revisión";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    if (id) {
      fetchRevision();
    }
  }, [id, fetchRevision]);

  // Función principal para cambio de estado
  // Usa updateRevisionStatus para cambiar solo el estado sin modificar json_final
  const handleQuickStatusChange = useCallback(
    async (newStatus: string) => {
      if (!id || saving || status === newStatus) return;

      // Validar que el estado sea uno de los permitidos
      const validStatuses: Array<
        "pending" | "in_review" | "completed" | "processed"
      > = ["pending", "in_review", "completed", "processed"];
      if (!validStatuses.includes(newStatus as any)) {
        setError(`Estado inválido: ${newStatus}`);
        return;
      }

      try {
        setSaving(true);
        setError("");
        setSuccess("");

        // Usar updateRevisionStatus para cambiar solo el estado
        await updateRevisionStatus(id, newStatus as any);

        // Actualizar el estado local y la revisión
        const updatedRevision = revision
          ? {
              ...revision,
              status: newStatus,
              updated_at: new Date().toISOString(),
            }
          : null;

        if (updatedRevision) {
          setRevision(updatedRevision);
        }
        setStatus(newStatus);
        setSuccess(
          `Estado actualizado a: ${
            STATUSES.find((s) => s.value === newStatus)?.label || newStatus
          }`
        );
      } catch (err: unknown) {
        console.error("Error updating status:", err);
        const errorMessage =
          err instanceof Error ? err.message : "Error al actualizar el estado";
        setError(errorMessage);
      } finally {
        setSaving(false);
      }
    },
    [id, saving, status, revision]
  );

  // Callback memoizado para el SpeedDial
  // Mantiene referencia estable para evitar re-renderizados innecesarios
  const handleStatusChange = useCallback(
    (newStatus: string) => {
      handleQuickStatusChange(newStatus);
    },
    [handleQuickStatusChange]
  );

  if (loading) {
    return (
      <>
        <Header />
        <Container maxWidth="lg" sx={{ py: 4 }}>
          <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
            <CircularProgress />
          </Box>
        </Container>
      </>
    );
  }

  if (!revision) {
    return (
      <>
        <Header />
        <Container maxWidth="lg" sx={{ py: 4 }}>
          <Alert severity="error">Revisión no encontrada</Alert>
          <Button sx={{ mt: 2 }} onClick={() => navigate("/revisions")}>
            Volver a Revisiones
          </Button>
        </Container>
      </>
    );
  }

  return (
    <>
      <Header
        title={`Revisión #${revision.id}`}
        createdAt={revision.created_at}
        updatedAt={revision.updated_at}
        onBack={() => navigate("/revisions")}
        backLabel="Volver a Revisiones"
        rightAction={
          <AutoSaveIndicator
            isSaving={isSaving}
            isSaved={isSaved}
            error={autoSaveError}
          />
        }
      />
      <Box
        sx={{
          height: "calc(100vh - 64px)",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
          padding: "2rem 2rem 0 2rem",
        }}
      >
        {error && (
          <Alert severity="error" sx={{ mb: 2, flexShrink: 0 }}>
            {error}
          </Alert>
        )}

        {success && (
          <Alert severity="success" sx={{ mb: 2, flexShrink: 0 }}>
            {success}
          </Alert>
        )}

        <FormContent
          revision={revision}
          formData={formData}
          onFormDataChange={handleDataChange}
        />

        {/* Speed Dial Flotante para cambio rápido de estado */}
        <QuickStatusDial
          currentStatus={status}
          onStatusChange={handleStatusChange}
          disabled={saving}
        />

        {/* Snackbar para errores de autoguardado */}
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={5000}
          onClose={() => setSnackbarOpen(false)}
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        >
          <Alert
            onClose={() => setSnackbarOpen(false)}
            severity="error"
            sx={{ width: "100%" }}
          >
            {snackbarMessage}
          </Alert>
        </Snackbar>
      </Box>
    </>
  );
};
