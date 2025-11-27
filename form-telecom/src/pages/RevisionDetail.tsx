import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Container,
  Box,
  Typography,
  Paper,
  Button,
  Alert,
  CircularProgress,
  Divider,
  SpeedDial,
  SpeedDialAction,
  SpeedDialIcon,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import {
  getRevisionById,
  updateRevision,
  type RevisionDetail as RevisionDetailType,
} from "../services/revisionService";
import { STATUSES } from "../entities/status";
import { FormularioMantenimiento } from "../components/FormularioMantenimiento";
import { Header } from "../components/Header";
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
  const [speedDialOpen, setSpeedDialOpen] = useState(false);

  useEffect(() => {
    if (id) {
      fetchRevision();
    }
  }, [id]);

  const fetchRevision = async () => {
    if (!id) return;

    try {
      setLoading(true);
      const data = await getRevisionById(id);

      setRevision(data);
      setStatus(data.status || "pending");

      // Extraer fields_ok del json_original
      const fieldsOkData = extractFieldsOk(data.json_original);
      console.log("fields_ok extraído:", fieldsOkData);

      // Si hay json_final, usarlo (tiene prioridad sobre fields_ok)
      const finalData =
        (data.json_final as FormularioMantenimientoData) || null;

      // Combinar: json_final tiene prioridad, pero si falta algo, usar fields_ok
      const mergedData = mergeFormData(fieldsOkData, finalData);
      console.log("Datos combinados para el formulario:", mergedData);

      setFormData(mergedData);
    } catch (err: unknown) {
      console.error("Error fetching revision:", err);
      const errorMessage =
        err instanceof Error ? err.message : "Error al cargar la revisión";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleQuickStatusChange = async (newStatus: string) => {
    if (!id || saving || status === newStatus) return;

    try {
      setSaving(true);
      setError("");
      setSuccess("");
      setSpeedDialOpen(false);

      const data = await updateRevision(id, formData || {}, newStatus);

      setRevision(data);
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
  };

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
        <Box
          sx={{
            mb: 2,
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
            flexShrink: 0,
          }}
        >
          <Button variant="outlined" onClick={() => navigate("/revisions")}>
            Volver a Revisiones
          </Button>
        </Box>

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
          {/* JSON Original - Datos recibidos desde n8n - Izquierda */}
          <Paper
            elevation={2}
            sx={{
              display: "flex",
              flexDirection: "column",
              overflow: "hidden",
              height: "100%",
            }}
          >
            <Box sx={{ p: 2 }}>
              <Typography variant="h6" gutterBottom>
                Datos Originales (desde n8n)
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Estos son los datos que llegaron automáticamente desde el
                formulario
              </Typography>
            </Box>
            <Divider sx={{ mb: 2 }} />
            <Box
              sx={{
                bgcolor: "#f5f5f5",
                p: 2,
                borderRadius: 1,
                flex: 1,
                overflow: "auto",
              }}
            >
              {revision.json_original ? (
                <pre
                  style={{
                    margin: 0,
                    fontSize: "12px",
                    whiteSpace: "pre-wrap",
                  }}
                >
                  {JSON.stringify(revision.json_original, null, 2)}
                </pre>
              ) : (
                <Typography color="text.secondary">
                  No hay datos originales disponibles
                </Typography>
              )}
            </Box>
          </Paper>

          {/* Formulario Editable - Derecha (más ancho) */}
          <Paper
            elevation={2}
            sx={{
              display: "flex",
              flexDirection: "column",
              overflow: "hidden",
              height: "100%",
            }}
          >
            <Box sx={{ p: 2 }}>
              <Typography variant="h6" gutterBottom>
                Formulario Completo (Editable)
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Complete los campos faltantes basándose en los datos originales.
                Los campos ya completados desde n8n aparecerán prellenados.
              </Typography>
            </Box>
            <Divider sx={{ mb: 3 }} />

            <Box
              sx={{
                flex: 1,
                overflow: "auto",
                minHeight: 0,
              }}
            >
              <FormularioMantenimiento
                initialData={formData}
                onDataChange={setFormData}
                readOnly={false}
              />
            </Box>
          </Paper>
        </Box>

        {/* Speed Dial Flotante para cambio rápido de estado */}
        <SpeedDial
          ariaLabel="Cambiar estado de revisión"
          sx={{
            position: "fixed",
            bottom: { xs: 16, md: 24 },
            right: { xs: 16, md: 24 },
            zIndex: 1000,
          }}
          icon={<SpeedDialIcon />}
          onClose={() => setSpeedDialOpen(false)}
          onOpen={() => setSpeedDialOpen(true)}
          open={speedDialOpen}
        >
          {status !== "in_review" && (
            <SpeedDialAction
              key="in_review"
              icon={<EditIcon />}
              tooltipTitle="En Revisión"
              onClick={() => handleQuickStatusChange("in_review")}
            />
          )}
          {status !== "completed" && (
            <SpeedDialAction
              key="completed"
              icon={<CheckCircleIcon />}
              tooltipTitle="Completado"
              onClick={() => handleQuickStatusChange("completed")}
            />
          )}
        </SpeedDial>
      </Box>
    </>
  );
};
