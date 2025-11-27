import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Radio,
  Typography,
  Box,
  TextareaAutosize,
  Checkbox,
} from "@mui/material";
import type {
  NivelLiquidos as NivelLiquidosType,
  EstadoBRM,
} from "../entities/form-revision.entity";

interface NivelLiquidosProps {
  nivelLiquidos: NivelLiquidosType | null;
  handleChange: (data: NivelLiquidosType) => void;
}

export const NivelLiquidos: React.FC<NivelLiquidosProps> = ({
  nivelLiquidos: rawNivelLiquidos,
  handleChange,
}) => {
  // Normalizar datos si es necesario
  const normalizeData = (
    data: NivelLiquidosType | null | Record<string, unknown>
  ): NivelLiquidosType | null => {
    if (!data) return null;
    if (typeof data === "object" && "aceite_motor" in data) {
      return data as NivelLiquidosType;
    }
    return null;
  };

  const nivelLiquidos = normalizeData(rawNivelLiquidos);

  if (!nivelLiquidos) {
    return null;
  }

  // Configuración de líquidos según la entidad
  const liquidosConfig = [
    {
      key: "aceite_motor" as const,
      label: "ACEITE MOTOR",
    },
    {
      key: "aceite_caja" as const,
      label: "ACEITE CAJA",
    },
    {
      key: "aceite_diferencial" as const,
      label: "ACEITE DIFERENCIAL",
    },
    {
      key: "liquido_frenos" as const,
      label: "LÍQUIDO FRENOS",
    },
    {
      key: "liquido_refrigerante" as const,
      label: "LÍQUIDO REFRIGERANTE",
    },
    {
      key: "liquido_dir_hidraulica" as const,
      label: "LÍQUIDO DIRECCIÓN HIDRÁULICA",
    },
    {
      key: "liquido_limpiaparabrisas" as const,
      label: "LÍQUIDO LIMPIAPARABRISAS",
    },
  ];

  // Helper para actualizar un líquido específico
  // Permite deseleccionar enviando null si se hace clic en el mismo valor
  const handleLiquidoChange = (
    key: keyof NivelLiquidosType,
    value: EstadoBRM
  ) => {
    if (key === "posee_perdida" || key === "detalle_perdida") {
      return;
    }
    if (!nivelLiquidos) return;

    const currentValue = nivelLiquidos[key] as EstadoBRM | null | undefined;

    // Si se hace clic en el mismo valor, deseleccionar (enviar null)
    if (currentValue === value) {
      handleChange({
        ...nivelLiquidos,
        [key]: null,
      });
    } else {
      // Si es un valor diferente, actualizar
      handleChange({
        ...nivelLiquidos,
        [key]: value,
      });
    }
  };

  // Helper para actualizar posee_perdida
  const handlePoseePerdidaChange = (value: boolean) => {
    if (!nivelLiquidos) return;
    handleChange({
      ...nivelLiquidos,
      posee_perdida: value,
    });
  };

  // Helper para actualizar detalle_perdida
  const handleDetallePerdidaChange = (detalle: string) => {
    if (!nivelLiquidos) return;
    handleChange({
      ...nivelLiquidos,
      detalle_perdida: detalle || null,
    });
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
        NIVEL DE LÍQUIDOS
      </Typography>
      <TableContainer component={Paper}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell
                sx={{ bgcolor: "#555", color: "white", fontWeight: "bold" }}
              >
                ITEM
              </TableCell>
              <TableCell
                align="center"
                sx={{ bgcolor: "#555", color: "white", fontWeight: "bold" }}
              >
                B - Bueno
              </TableCell>
              <TableCell
                align="center"
                sx={{ bgcolor: "#555", color: "white", fontWeight: "bold" }}
              >
                M - Malo
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {liquidosConfig.map((config) => {
              const estado = nivelLiquidos[config.key] as EstadoBRM;
              return (
                <TableRow key={config.key}>
                  <TableCell sx={{ fontWeight: 500 }}>{config.label}</TableCell>
                  <TableCell align="center">
                    <Radio
                      checked={estado === "b"}
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        handleLiquidoChange(config.key, "b");
                      }}
                      value="b"
                      size="small"
                    />
                  </TableCell>
                  <TableCell align="center">
                    <Radio
                      checked={estado === "m"}
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        handleLiquidoChange(config.key, "m");
                      }}
                      value="m"
                      size="small"
                    />
                  </TableCell>
                </TableRow>
              );
            })}
            <TableRow>
              <TableCell sx={{ fontWeight: 500 }}>
                POSEE PERDIDA DE ACEITE / LÍQUIDOS
              </TableCell>
              <TableCell align="center">
                <Checkbox
                  checked={nivelLiquidos.posee_perdida}
                  onChange={(e) => handlePoseePerdidaChange(e.target.checked)}
                />
                <Typography variant="caption" sx={{ ml: 0.5 }}>
                  SI
                </Typography>
              </TableCell>
              <TableCell align="center">
                <Checkbox
                  checked={!nivelLiquidos.posee_perdida}
                  onChange={(e) => handlePoseePerdidaChange(!e.target.checked)}
                />
                <Typography variant="caption" sx={{ ml: 0.5 }}>
                  NO
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={3} sx={{ fontWeight: 500 }}>
                DETALLAR CUÁL:
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={3}>
                <TextareaAutosize
                  minRows={3}
                  style={{
                    width: "100%",
                    padding: "8px",
                    border: "1px solid #ccc",
                    borderRadius: "4px",
                  }}
                  name="detalle_perdida"
                  value={nivelLiquidos.detalle_perdida || ""}
                  onChange={(e) => handleDetallePerdidaChange(e.target.value)}
                />
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};
