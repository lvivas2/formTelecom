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

export const RevisionDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [revision, setRevision] = useState<RevisionDetailType | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [formData, setFormData] = useState<any>({});
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

      // Si hay json_final, usarlo; si no, usar json_original como base
      // Esto permite que el analista complete los campos faltantes
      const baseData = data.json_final || {};
      const originalData = data.json_original || {};

      // Combinar: json_final tiene prioridad, pero si falta algo, usar json_original
      const mergedData = {
        ...originalData,
        ...baseData,
      };

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

      const data = await updateRevision(id, formData, newStatus);

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
      <Box mx={2}>
        <Box
          sx={{
            mb: 3,
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
          }}
        >
          <Button variant="outlined" onClick={() => navigate("/revisions")}>
            Volver a Revisiones
          </Button>
        </Box>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        {success && (
          <Alert severity="success" sx={{ mb: 2 }}>
            {success}
          </Alert>
        )}

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
            gap: 3,
            mb: 3,
          }}
        >
          {/* Formulario Editable - Izquierda */}
          <Paper elevation={2} sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Formulario Completo (Editable)
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              Complete los campos faltantes basándose en los datos originales.
              Los campos ya completados desde n8n aparecerán prellenados.
            </Typography>
            <Divider sx={{ mb: 3 }} />
            <FormularioMantenimiento
              initialData={formData}
              onDataChange={setFormData}
              readOnly={false}
            />
          </Paper>

          {/* JSON Original - Datos recibidos desde n8n - Derecha */}
          <Paper elevation={2} sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Datos Originales (desde n8n)
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              Estos son los datos que llegaron automáticamente desde el
              formulario
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <Box
              sx={{
                bgcolor: "#f5f5f5",
                p: 2,
                borderRadius: 1,
                maxHeight: "500px",
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
