import React, { useState } from "react";
import {
  TextField,
  FormControlLabel,
  Radio,
  Box,
  Typography,
  Paper,
  TextareaAutosize,
  Checkbox,
  Collapse,
  IconButton,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import type {
  Neumaticos as NeumaticosType,
  NeumaticoDetalle,
  EstadoBRM,
} from "../entities/form-revision.entity";

interface NeumaticosProps {
  neumaticos: NeumaticosType | null;
  handleChange: (data: NeumaticosType) => void;
}

export const Neumaticos: React.FC<NeumaticosProps> = ({
  neumaticos: rawNeumaticos,
  handleChange,
}) => {
  // Normalizar datos si es necesario
  const normalizeData = (
    data: NeumaticosType | null | Record<string, unknown>
  ): NeumaticosType | null => {
    if (!data) return null;
    if (typeof data === "object" && "medida" in data) {
      return data as NeumaticosType;
    }
    return null;
  };

  const neumaticos = normalizeData(rawNeumaticos);

  if (!neumaticos) {
    return null;
  }

  // Configuración de neumáticos según la entidad
  const neumaticosConfig = [
    {
      key: "delantera_derecha" as const,
      label: "DELANTERA DERECHA",
    },
    {
      key: "delantera_izquierda" as const,
      label: "DELANTERA IZQUIERDA",
    },
    {
      key: "trasera_derecha" as const,
      label: "TRASERA DERECHA",
    },
    {
      key: "trasera_izquierda" as const,
      label: "TRASERA IZQUIERDA",
    },
    {
      key: "inferior_td" as const,
      label: "INFERIOR TD",
    },
    {
      key: "inferior_ti" as const,
      label: "INFERIOR TI",
    },
    {
      key: "rueda_auxilio" as const,
      label: "RUEDA DE AUXILIO",
    },
  ];

  // Helper para actualizar un neumático específico
  // Permite deseleccionar enviando null si se hace clic en el mismo valor
  const handleNeumaticoChange = (
    key: keyof NeumaticosType,
    updates: Partial<NeumaticoDetalle>
  ) => {
    if (
      key === "medida" ||
      key === "tuerca_seguridad" ||
      key === "observaciones"
    ) {
      return;
    }
    if (!neumaticos) return;
    const currentDetalle = neumaticos[key] as NeumaticoDetalle;

    // Si se actualiza el estado y es el mismo valor, deseleccionar (enviar null)
    if ("estado" in updates && currentDetalle?.estado === updates.estado) {
      handleChange({
        ...neumaticos,
        [key]: {
          ...currentDetalle,
          estado: null,
        },
      });
    } else {
      // Actualización normal
      handleChange({
        ...neumaticos,
        [key]: {
          ...currentDetalle,
          ...updates,
        },
      });
    }
  };

  // Helper para actualizar medida
  const handleMedidaChange = (medida: string) => {
    if (!neumaticos) return;
    handleChange({
      ...neumaticos,
      medida,
    });
  };

  // Helper para actualizar tuerca_seguridad
  const handleTuercaSeguridadChange = (value: boolean) => {
    if (!neumaticos) return;
    handleChange({
      ...neumaticos,
      tuerca_seguridad: value,
    });
  };

  // Helper para actualizar observaciones
  const handleObservacionesChange = (observaciones: string) => {
    if (!neumaticos) return;
    handleChange({
      ...neumaticos,
      observaciones: observaciones || null,
    });
  };

  // Componente interno para cada neumático
  const NeumaticoCard: React.FC<{
    config: { key: keyof NeumaticosType; label: string };
    detalle: NeumaticoDetalle;
  }> = ({ config, detalle }) => {
    const hasDotOrMm = !!(detalle?.dot || detalle?.mm);
    const [showOtherFields, setShowOtherFields] = useState(hasDotOrMm);

    // Actualizar estado cuando hay datos
    React.useEffect(() => {
      if (hasDotOrMm) {
        setShowOtherFields(true);
      }
    }, [hasDotOrMm]);

    return (
      <Paper
        elevation={2}
        sx={{
          p: 2,
          border: "1px solid #333",
          borderRadius: 1,
        }}
      >
        <Typography variant="subtitle2" fontWeight="bold" sx={{ mb: 1.5 }}>
          {config.label}
        </Typography>
        <Box>
          <FormControlLabel
            control={
              <Radio
                checked={detalle?.estado === "b"}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  handleNeumaticoChange(config.key, {
                    estado: "b" as EstadoBRM,
                  });
                }}
                size="small"
              />
            }
            label="B - Bueno"
          />
          <FormControlLabel
            control={
              <Radio
                checked={detalle?.estado === "r"}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  handleNeumaticoChange(config.key, {
                    estado: "r" as EstadoBRM,
                  });
                }}
                size="small"
              />
            }
            label="R - Regular"
          />
          <FormControlLabel
            control={
              <Radio
                checked={detalle?.estado === "m"}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  handleNeumaticoChange(config.key, {
                    estado: "m" as EstadoBRM,
                  });
                }}
                size="small"
              />
            }
            label="M - Malo"
          />
        </Box>
        <Box sx={{ mt: 1.5 }}>
          <TextField
            size="small"
            label="MARCA"
            value={detalle?.marca || ""}
            onChange={(e) =>
              handleNeumaticoChange(config.key, {
                marca: e.target.value || null,
              })
            }
            placeholder="Marca"
            fullWidth
          />
        </Box>
        <Box sx={{ mt: 1 }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              cursor: "pointer",
            }}
            onClick={() => setShowOtherFields(!showOtherFields)}
          >
            <Typography
              variant="caption"
              sx={{
                color: "text.secondary",
                fontSize: "0.75rem",
                fontWeight: 500,
              }}
            >
              Otros campos
            </Typography>
            <IconButton
              size="small"
              onClick={(e) => {
                e.stopPropagation();
                setShowOtherFields(!showOtherFields);
              }}
              sx={{ p: 0.5 }}
            >
              {showOtherFields ? (
                <ExpandLessIcon fontSize="small" />
              ) : (
                <ExpandMoreIcon fontSize="small" />
              )}
            </IconButton>
          </Box>
          <Collapse in={showOtherFields || hasDotOrMm}>
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 1,
                mt: 1,
              }}
            >
              <TextField
                size="small"
                label="DOT"
                value={detalle?.dot || ""}
                onChange={(e) =>
                  handleNeumaticoChange(config.key, {
                    dot: e.target.value || null,
                  })
                }
                placeholder="DOT"
              />
              <TextField
                size="small"
                type="number"
                label="mm"
                value={detalle?.mm || ""}
                onChange={(e) =>
                  handleNeumaticoChange(config.key, {
                    mm: e.target.value ? Number(e.target.value) : null,
                  })
                }
                placeholder="mm"
              />
            </Box>
          </Collapse>
        </Box>
      </Paper>
    );
  };

  return (
    <Box>
      <Typography
        variant="h6"
        sx={{
          bgcolor: "#333",
          color: "white",
          p: 1.5,
          mt: 2,
          mb: 1,
          fontWeight: "bold",
          borderRadius: 1,
        }}
      >
        NEUMÁTICOS
      </Typography>

      <Box sx={{ mb: 2, p: 1.5, bgcolor: "#f8f9fa", borderRadius: 1 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
          <Typography fontWeight="bold">MEDIDA:</Typography>
          <TextField
            size="small"
            name="medida"
            value={neumaticos.medida || ""}
            onChange={(e) => handleMedidaChange(e.target.value)}
            placeholder="Ej: 175/65 R14"
            sx={{ flexGrow: 1, maxWidth: 300 }}
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={neumaticos.tuerca_seguridad}
                onChange={(e) => handleTuercaSeguridadChange(e.target.checked)}
              />
            }
            label="TUERCA SEGURIDAD"
          />
        </Box>
      </Box>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            sm: "repeat(2, 1fr)",
            md: "repeat(4, 1fr)",
          },
          gap: 2,
          mb: 2,
        }}
      >
        {neumaticosConfig.map((config) => {
          const detalle = neumaticos[config.key] as NeumaticoDetalle;
          return (
            <Box key={config.key}>
              <NeumaticoCard config={config} detalle={detalle} />
            </Box>
          );
        })}
      </Box>

      <Box>
        <Typography fontWeight="bold" sx={{ mb: 1 }}>
          OBSERVACIONES:
        </Typography>
        <TextareaAutosize
          minRows={3}
          style={{
            width: "100%",
            padding: "8px",
            border: "1px solid #ccc",
            borderRadius: "4px",
          }}
          name="observaciones"
          value={neumaticos.observaciones || ""}
          onChange={(e) => handleObservacionesChange(e.target.value)}
        />
      </Box>
    </Box>
  );
};
