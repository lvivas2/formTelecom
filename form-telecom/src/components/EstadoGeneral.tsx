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
  Checkbox,
} from "@mui/material";
import type {
  EstadoGeneral as EstadoGeneralType,
  EstadoBRM,
} from "../entities/form-revision.entity";

interface EstadoGeneralProps {
  estadoGeneral: EstadoGeneralType | null;
  handleChange: (data: EstadoGeneralType) => void;
}

export const EstadoGeneral: React.FC<EstadoGeneralProps> = ({
  estadoGeneral: rawEstadoGeneral,
  handleChange,
}) => {
  // Normalizar datos si es necesario
  const normalizeData = (
    data: EstadoGeneralType | null | Record<string, unknown>
  ): EstadoGeneralType | null => {
    if (!data) return null;
    if (typeof data === "object" && "luneta" in data) {
      return data as EstadoGeneralType;
    }
    return null;
  };

  const estadoGeneral = normalizeData(rawEstadoGeneral);

  if (!estadoGeneral) {
    return null;
  }

  // Configuración de estado general según la entidad
  const estadoGeneralConfig = [
    {
      key: "limpieza_interior" as const,
      label: "LIMPIEZA INTERIOR",
    },
    {
      key: "limpieza_exterior" as const,
      label: "LIMPIEZA EXTERIOR",
    },
    {
      key: "opticas_delanteras" as const,
      label: "ÓPTICAS DELANTERAS",
    },
    {
      key: "faros_traseros" as const,
      label: "FAROS TRASEROS",
    },
    {
      key: "espejos" as const,
      label: "ESPEJOS",
    },
    {
      key: "parabrisas" as const,
      label: "PARABRISAS",
    },
    {
      key: "luneta" as const,
      label: "LUNETA",
    },
    {
      key: "vidrios_laterales" as const,
      label: "VIDRIOS LATERALES",
    },
    {
      key: "estado_carroceria" as const,
      label: "ESTADO CARROCERÍA",
    },
    {
      key: "estado_pintura" as const,
      label: "ESTADO PINTURA",
    },
    {
      key: "paragolpe_delantero" as const,
      label: "PARAGOLPE DELANTERO",
    },
    {
      key: "paragolpe_trasero" as const,
      label: "PARAGOLPE TRASERO",
    },
    {
      key: "porta_cajuela" as const,
      label: "PORTA CAJUELA",
    },
    {
      key: "puertas" as const,
      label: "PUERTAS",
      optional: true,
    },
    {
      key: "bandas_refractivas" as const,
      label: "BANDAS REFRACTIVAS",
    },
    {
      key: "ficha_enganche" as const,
      label: "FICHA ENGANCHE",
    },
    {
      key: "separador_de_carga" as const,
      label: "SEPARADOR DE CARGA",
      optional: true,
    },
    {
      key: "tapizados" as const,
      label: "TAPIZADOS",
    },
    {
      key: "alfombras" as const,
      label: "ALFOMBRAS",
    },
    {
      key: "cinturones_de_seguridad" as const,
      label: "CINTURONES DE SEGURIDAD",
    },
  ];

  // Helper para actualizar un campo de estado general específico
  const handleEstadoChange = (
    key: keyof EstadoGeneralType,
    value: EstadoBRM
  ) => {
    if (
      key === "cupula" ||
      key === "equipamiento_hidraulico" ||
      typeof value !== "string"
    ) {
      return;
    }
    if (!estadoGeneral) return;
    handleChange({
      ...estadoGeneral,
      [key]: value,
    });
  };

  // Helper para actualizar cupula
  const handleCupulaChange = (tiene: boolean, estado?: EstadoBRM | null) => {
    if (!estadoGeneral) return;
    handleChange({
      ...estadoGeneral,
      cupula: {
        tiene,
        estado: estado || null,
      },
    });
  };

  // Helper para actualizar equipamiento_hidraulico
  const handleEquipamientoHidraulicoChange = (
    tiene: boolean,
    estado?: EstadoBRM | null
  ) => {
    if (!estadoGeneral) return;
    handleChange({
      ...estadoGeneral,
      equipamiento_hidraulico: {
        tiene,
        estado: estado || null,
      },
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
        ESTADO GENERAL
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
                R - Regular
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
            {estadoGeneralConfig.map((config) => {
              const estado = estadoGeneral[config.key] as
                | EstadoBRM
                | null
                | undefined;
              return (
                <TableRow key={config.key}>
                  <TableCell sx={{ fontWeight: 500 }}>{config.label}</TableCell>
                  <TableCell align="center">
                    <Radio
                      checked={estado === "b"}
                      onChange={() => handleEstadoChange(config.key, "b")}
                      value="b"
                      size="small"
                    />
                  </TableCell>
                  <TableCell align="center">
                    <Radio
                      checked={estado === "r"}
                      onChange={() => handleEstadoChange(config.key, "r")}
                      value="r"
                      size="small"
                    />
                  </TableCell>
                  <TableCell align="center">
                    <Radio
                      checked={estado === "m"}
                      onChange={() => handleEstadoChange(config.key, "m")}
                      value="m"
                      size="small"
                    />
                  </TableCell>
                </TableRow>
              );
            })}
            {/* EQUIPAMIENTO HIDRÁULICO */}
            <TableRow>
              <TableCell sx={{ fontWeight: 500 }}>
                TIENE EQUIPAMIENTO HIDRÁULICO
              </TableCell>
              <TableCell align="center">
                <Checkbox
                  checked={estadoGeneral.equipamiento_hidraulico.tiene}
                  onChange={(e) =>
                    handleEquipamientoHidraulicoChange(
                      e.target.checked,
                      estadoGeneral.equipamiento_hidraulico.estado
                    )
                  }
                />
                <Typography variant="caption" sx={{ ml: 0.5 }}>
                  SI
                </Typography>
              </TableCell>
              <TableCell align="center">
                <Checkbox
                  checked={!estadoGeneral.equipamiento_hidraulico.tiene}
                  onChange={(e) =>
                    handleEquipamientoHidraulicoChange(!e.target.checked, null)
                  }
                />
                <Typography variant="caption" sx={{ ml: 0.5 }}>
                  NO
                </Typography>
              </TableCell>
              <TableCell></TableCell>
            </TableRow>
            {estadoGeneral.equipamiento_hidraulico.tiene && (
              <TableRow>
                <TableCell sx={{ fontWeight: 500, pl: 4 }}>
                  ESTADO EQUIPAMIENTO HIDRÁULICO
                </TableCell>
                <TableCell align="center">
                  <Radio
                    checked={
                      estadoGeneral.equipamiento_hidraulico.estado === "b"
                    }
                    onChange={() =>
                      handleEquipamientoHidraulicoChange(true, "b")
                    }
                    value="b"
                    size="small"
                  />
                </TableCell>
                <TableCell align="center">
                  <Radio
                    checked={
                      estadoGeneral.equipamiento_hidraulico.estado === "r"
                    }
                    onChange={() =>
                      handleEquipamientoHidraulicoChange(true, "r")
                    }
                    value="r"
                    size="small"
                  />
                </TableCell>
                <TableCell align="center">
                  <Radio
                    checked={
                      estadoGeneral.equipamiento_hidraulico.estado === "m"
                    }
                    onChange={() =>
                      handleEquipamientoHidraulicoChange(true, "m")
                    }
                    value="m"
                    size="small"
                  />
                </TableCell>
              </TableRow>
            )}
            {/* CUPULA */}
            <TableRow>
              <TableCell sx={{ fontWeight: 500 }}>TIENE CUPULA</TableCell>
              <TableCell align="center">
                <Checkbox
                  checked={estadoGeneral.cupula.tiene}
                  onChange={(e) =>
                    handleCupulaChange(
                      e.target.checked,
                      estadoGeneral.cupula.estado
                    )
                  }
                />
                <Typography variant="caption" sx={{ ml: 0.5 }}>
                  SI
                </Typography>
              </TableCell>
              <TableCell align="center">
                <Checkbox
                  checked={!estadoGeneral.cupula.tiene}
                  onChange={(e) => handleCupulaChange(!e.target.checked, null)}
                />
                <Typography variant="caption" sx={{ ml: 0.5 }}>
                  NO
                </Typography>
              </TableCell>
              <TableCell></TableCell>
            </TableRow>
            {estadoGeneral.cupula.tiene && (
              <TableRow>
                <TableCell sx={{ fontWeight: 500, pl: 4 }}>
                  ESTADO CUPULA
                </TableCell>
                <TableCell align="center">
                  <Radio
                    checked={estadoGeneral.cupula.estado === "b"}
                    onChange={() => handleCupulaChange(true, "b")}
                    value="b"
                    size="small"
                  />
                </TableCell>
                <TableCell align="center">
                  <Radio
                    checked={estadoGeneral.cupula.estado === "r"}
                    onChange={() => handleCupulaChange(true, "r")}
                    value="r"
                    size="small"
                  />
                </TableCell>
                <TableCell align="center">
                  <Radio
                    checked={estadoGeneral.cupula.estado === "m"}
                    onChange={() => handleCupulaChange(true, "m")}
                    value="m"
                    size="small"
                  />
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};
