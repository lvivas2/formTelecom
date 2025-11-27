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
  TextField,
  Checkbox,
} from "@mui/material";
import type {
  Funcionamiento as FuncionamientoType,
  EstadoBRM,
  EstadoBRM_NP,
} from "../entities/form-revision.entity";

interface FuncionamientoProps {
  funcionamiento: FuncionamientoType | null;
  handleChange: (data: FuncionamientoType) => void;
}

export const Funcionamiento: React.FC<FuncionamientoProps> = ({
  funcionamiento: rawFuncionamiento,
  handleChange,
}) => {
  // Normalizar datos si es necesario
  const normalizeData = (
    data: FuncionamientoType | null | Record<string, unknown>
  ): FuncionamientoType | null => {
    if (!data) return null;
    if (typeof data === "object" && "motor" in data) {
      return data as FuncionamientoType;
    }
    return null;
  };

  const funcionamiento = normalizeData(rawFuncionamiento);

  if (!funcionamiento) {
    return null;
  }

  // Configuración de funcionamiento según la entidad
  const funcionamientoConfig = [
    {
      key: "motor" as const,
      label: "MOTOR",
    },
    {
      key: "electroventilador" as const,
      label: "ELECTROVENTILADOR",
    },
    {
      key: "embrague" as const,
      label: "EMBRAGUE",
    },
    {
      key: "transmision" as const,
      label: "TRANSMISIÓN",
    },
    {
      key: "direccion" as const,
      label: "DIRECCIÓN",
    },
    {
      key: "escape" as const,
      label: "ESCAPE",
    },
    {
      key: "frenos" as const,
      label: "FRENOS",
    },
    {
      key: "freno_de_mano" as const,
      label: "FRENO DE MANO",
    },
    {
      key: "amortiguadores" as const,
      label: "AMORTIGUADORES",
    },
    {
      key: "tren_delantero" as const,
      label: "TREN DELANTERO",
    },
    {
      key: "aire_acondicionado" as const,
      label: "AIRE ACONDICIONADO",
      special: true, // Puede ser "no posee"
    },
    {
      key: "calefaccion" as const,
      label: "CALEFACCIÓN",
    },
    {
      key: "tablero_instrumental" as const,
      label: "TABLERO INSTRUMENTAL",
    },
    {
      key: "cerraduras" as const,
      label: "CERRADURAS",
    },
    {
      key: "vidrios" as const,
      label: "LEVANTA VIDRIOS",
    },
    {
      key: "limpia_parabrisas" as const,
      label: "LIMPIA PARABRISAS",
    },
    {
      key: "sapito" as const,
      label: "SAPITO",
    },
    {
      key: "bocina" as const,
      label: "BOCINA",
    },
  ];

  // Helper para actualizar un campo de funcionamiento específico
  // Permite deseleccionar enviando null si se hace clic en el mismo valor
  const handleFuncionamientoChange = (
    key: keyof FuncionamientoType,
    value: EstadoBRM | EstadoBRM_NP
  ) => {
    if (
      key === "bateria_marca" ||
      key === "bateria_con_carga" ||
      key === "bateria_fecha_fabricacion"
    ) {
      return;
    }
    if (!funcionamiento) return;

    const currentValue = funcionamiento[key] as
      | EstadoBRM
      | EstadoBRM_NP
      | null
      | undefined;

    // Si se hace clic en el mismo valor, deseleccionar (enviar null)
    if (currentValue === value) {
      handleChange({
        ...funcionamiento,
        [key]: null,
      });
    } else {
      // Si es un valor diferente, actualizar
      handleChange({
        ...funcionamiento,
        [key]: value,
      });
    }
  };

  // Helper para actualizar bateria_marca
  const handleBateriaMarcaChange = (marca: string) => {
    if (!funcionamiento) return;
    handleChange({
      ...funcionamiento,
      bateria_marca: marca,
    });
  };

  // Helper para actualizar bateria_fecha_fabricacion
  const handleBateriaFechaChange = (fecha: string) => {
    if (!funcionamiento) return;
    handleChange({
      ...funcionamiento,
      bateria_fecha_fabricacion: fecha || null,
    });
  };

  // Helper para actualizar bateria_con_carga
  const handleBateriaConCargaChange = (value: boolean) => {
    if (!funcionamiento) return;
    handleChange({
      ...funcionamiento,
      bateria_con_carga: value,
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
        FUNCIONAMIENTO
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
            {funcionamientoConfig.map((config) => {
              const estado = funcionamiento[config.key] as
                | EstadoBRM
                | EstadoBRM_NP;
              const isAireAcondicionado = config.key === "aire_acondicionado";
              return (
                <TableRow key={config.key}>
                  <TableCell sx={{ fontWeight: 500 }}>{config.label}</TableCell>
                  <TableCell align="center">
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        gap: 0.5,
                      }}
                    >
                      <Radio
                        checked={estado === "b"}
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          handleFuncionamientoChange(config.key, "b");
                        }}
                        value="b"
                        size="small"
                      />
                      {isAireAcondicionado && (
                        <Typography
                          variant="caption"
                          sx={{ fontSize: "0.7rem" }}
                        >
                          B - Bueno
                        </Typography>
                      )}
                    </Box>
                  </TableCell>
                  <TableCell align="center">
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        gap: 0.5,
                      }}
                    >
                      {isAireAcondicionado ? (
                        <>
                          <Radio
                            checked={estado === "m"}
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              handleFuncionamientoChange(config.key, "m");
                            }}
                            value="m"
                            size="small"
                          />
                          <Typography
                            variant="caption"
                            sx={{ fontSize: "0.7rem" }}
                          >
                            M - Malo
                          </Typography>
                        </>
                      ) : (
                        <Radio
                          checked={estado === "r"}
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            handleFuncionamientoChange(config.key, "r");
                          }}
                          value="r"
                          size="small"
                        />
                      )}
                    </Box>
                  </TableCell>
                  <TableCell align="center">
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        gap: 0.5,
                      }}
                    >
                      {isAireAcondicionado ? (
                        <>
                          <Radio
                            checked={estado === "no posee"}
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              handleFuncionamientoChange(
                                config.key,
                                "no posee" as EstadoBRM_NP
                              );
                            }}
                            value="no posee"
                            size="small"
                          />
                          <Typography
                            variant="caption"
                            sx={{ fontSize: "0.7rem" }}
                          >
                            No Posee
                          </Typography>
                        </>
                      ) : (
                        <Radio
                          checked={estado === "m"}
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            handleFuncionamientoChange(config.key, "m");
                          }}
                          value="m"
                          size="small"
                        />
                      )}
                    </Box>
                  </TableCell>
                </TableRow>
              );
            })}
            <TableRow>
              <TableCell sx={{ fontWeight: 500 }}>BATERÍA (MARCA)</TableCell>
              <TableCell colSpan={3}>
                <TextField
                  size="small"
                  fullWidth
                  value={funcionamiento.bateria_marca || ""}
                  onChange={(e) => handleBateriaMarcaChange(e.target.value)}
                  placeholder="Marca de la batería"
                />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx={{ fontWeight: 500 }}>
                BATERÍA (FECHA FABRICACIÓN)
              </TableCell>
              <TableCell colSpan={3}>
                <TextField
                  type="date"
                  size="small"
                  fullWidth
                  value={funcionamiento.bateria_fecha_fabricacion || ""}
                  onChange={(e) => handleBateriaFechaChange(e.target.value)}
                  InputLabelProps={{ shrink: true }}
                />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx={{ fontWeight: 500 }}>
                BATERÍA (CON CARGA)
              </TableCell>
              <TableCell align="center">
                <Checkbox
                  checked={funcionamiento.bateria_con_carga}
                  onChange={(e) =>
                    handleBateriaConCargaChange(e.target.checked)
                  }
                />
                <Typography variant="caption" sx={{ ml: 0.5 }}>
                  SI
                </Typography>
              </TableCell>
              <TableCell align="center">
                <Checkbox
                  checked={!funcionamiento.bateria_con_carga}
                  onChange={(e) =>
                    handleBateriaConCargaChange(!e.target.checked)
                  }
                />
                <Typography variant="caption" sx={{ ml: 0.5 }}>
                  NO
                </Typography>
              </TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};
