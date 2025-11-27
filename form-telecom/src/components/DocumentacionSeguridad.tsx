import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Checkbox,
  TextField,
  Typography,
  Box,
} from "@mui/material";
import type {
  DocumentacionSeguridad as DocumentacionSeguridadType,
  TieneVencimiento,
} from "../entities/form-revision.entity";
import { useFormHelpers } from "../hooks/useFormHelpers";

interface DocumentacionSeguridadProps {
  documentacionSeguridad: DocumentacionSeguridadType | null;
  handleChange: (data: DocumentacionSeguridadType) => void;
}

export const DocumentacionSeguridad: React.FC<DocumentacionSeguridadProps> = ({
  documentacionSeguridad: rawDocumentacionSeguridad,
  handleChange,
}) => {
  const {
    formatDateForStorage,
    normalizeBoolean,
    normalizeString,
    getTieneValue,
    getVencimiento: getVencimientoFromHelper,
  } = useFormHelpers();

  // Normalizar datos: convertir datos antiguos al formato nuevo si es necesario
  const normalizeData = (
    data: DocumentacionSeguridadType | null | Record<string, unknown>
  ): DocumentacionSeguridadType | null => {
    if (!data) return null;

    // Si ya es del tipo correcto, retornarlo
    if (typeof data === "object" && "cedula_verde" in data) {
      const normalized: Record<string, unknown> = { ...data };

      // Normalizar campos con TieneVencimiento
      const fieldsWithVencimiento = [
        "cedula_verde",
        "vtv_rto",
        "matafuego_1kg",
        "matafuego_25kg",
        "certificado_habilitacion_hidros",
      ];

      fieldsWithVencimiento.forEach((field) => {
        const value = normalized[field];
        if (value && typeof value === "object" && "tiene" in value) {
          // Ya está en formato correcto
          const tieneValue = (value as { tiene: unknown }).tiene;
          const vencimientoValue =
            "vencimiento" in value
              ? (value as { vencimiento?: unknown }).vencimiento
              : null;
          normalized[field] = {
            tiene: normalizeBoolean(tieneValue),
            vencimiento:
              (typeof vencimientoValue === "string"
                ? vencimientoValue
                : null) || null,
          };
        } else if (typeof value === "boolean" || typeof value === "string") {
          // Convertir boolean/string a objeto
          normalized[field] = {
            tiene: normalizeBoolean(value),
            vencimiento: null,
          };
        }
      });

      // Normalizar campos booleanos
      const booleanFields = [
        "botiquin",
        "seguro",
        "llave_rueda",
        "crickey_gato",
        "cuarta_remolque",
        "balizas",
        "chapa_patente",
      ];

      booleanFields.forEach((field) => {
        normalized[field] = normalizeBoolean(normalized[field]);
      });

      // Normalizar tarjeta_combustible
      normalized.tarjeta_combustible = normalizeString(
        normalized.tarjeta_combustible
      );

      return normalized as unknown as DocumentacionSeguridadType;
    }

    return null;
  };

  const documentacionSeguridad = normalizeData(rawDocumentacionSeguridad);

  // Helper para obtener valor booleano de campos con TieneVencimiento
  const getTieneVencimientoValue = (
    value: TieneVencimiento | { tiene: boolean } | undefined
  ): boolean => {
    return getTieneValue(value);
  };

  // Helper para obtener fecha de vencimiento
  const getVencimiento = (
    value: TieneVencimiento | { tiene: boolean } | undefined
  ): string => {
    return getVencimientoFromHelper(value);
  };

  // Helper para actualizar campos con TieneVencimiento
  const handleTieneVencimientoChange = (
    field: keyof DocumentacionSeguridadType,
    tiene: boolean,
    vencimiento?: string
  ) => {
    if (!documentacionSeguridad) return;

    const currentValue = documentacionSeguridad[field];
    let vencimientoValue: string | null | undefined = null;

    // Si se proporciona un vencimiento (puede ser string vacío)
    if (vencimiento !== undefined) {
      // Si el string está vacío o solo tiene espacios, establecer como null
      if (vencimiento.trim() === "") {
        vencimientoValue = null;
      } else {
        // Si tiene contenido, formatearlo para almacenamiento
        vencimientoValue = formatDateForStorage(vencimiento);
      }
    } else if (
      currentValue &&
      typeof currentValue === "object" &&
      currentValue !== null &&
      "vencimiento" in currentValue
    ) {
      // Si no se proporciona vencimiento, mantener el valor actual
      vencimientoValue = (currentValue as TieneVencimiento).vencimiento || null;
    }

    const newValue: TieneVencimiento = {
      tiene,
      vencimiento: vencimientoValue,
    };

    handleChange({
      ...documentacionSeguridad,
      [field]: newValue,
    });
  };

  // Helper para actualizar campos booleanos simples
  const handleBooleanChange = (
    field: keyof DocumentacionSeguridadType,
    value: boolean
  ) => {
    if (!documentacionSeguridad) return;
    handleChange({
      ...documentacionSeguridad,
      [field]: value,
    });
  };

  // Helper para actualizar tarjeta_combustible (string)
  const handleTarjetaCombustibleChange = (value: string) => {
    if (!documentacionSeguridad) return;
    handleChange({
      ...documentacionSeguridad,
      tarjeta_combustible: value,
    });
  };

  if (!documentacionSeguridad) {
    return null;
  }

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
        DOCUMENTACIÓN - SEGURIDAD
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
                SI
              </TableCell>
              <TableCell
                align="center"
                sx={{ bgcolor: "#555", color: "white", fontWeight: "bold" }}
              >
                NO
              </TableCell>
              <TableCell
                align="center"
                sx={{ bgcolor: "#555", color: "white", fontWeight: "bold" }}
              >
                VENCIMIENTO
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {/* CÉDULA VERDE */}
            <TableRow>
              <TableCell sx={{ fontWeight: 500 }}>CÉDULA VERDE</TableCell>
              <TableCell align="center">
                <Checkbox
                  checked={getTieneVencimientoValue(
                    documentacionSeguridad.cedula_verde
                  )}
                  onChange={(e) =>
                    handleTieneVencimientoChange(
                      "cedula_verde",
                      e.target.checked,
                      getVencimiento(documentacionSeguridad.cedula_verde) ||
                        undefined
                    )
                  }
                />
              </TableCell>
              <TableCell align="center">
                <Checkbox
                  checked={
                    !getTieneVencimientoValue(
                      documentacionSeguridad.cedula_verde
                    )
                  }
                  onChange={(e) =>
                    handleTieneVencimientoChange(
                      "cedula_verde",
                      !e.target.checked,
                      getVencimiento(documentacionSeguridad.cedula_verde) ||
                        undefined
                    )
                  }
                />
              </TableCell>
              <TableCell>
                <TextField
                  type="date"
                  size="small"
                  fullWidth
                  value={getVencimiento(documentacionSeguridad.cedula_verde)}
                  onChange={(e) =>
                    handleTieneVencimientoChange(
                      "cedula_verde",
                      getTieneVencimientoValue(
                        documentacionSeguridad.cedula_verde
                      ),
                      e.target.value
                    )
                  }
                  InputLabelProps={{ shrink: true }}
                />
              </TableCell>
            </TableRow>

            {/* VTV / RTO */}
            <TableRow>
              <TableCell sx={{ fontWeight: 500 }}>
                VENCIMIENTO VTV / RTO
              </TableCell>
              <TableCell align="center">
                <Checkbox
                  checked={getTieneVencimientoValue(
                    documentacionSeguridad.vtv_rto
                  )}
                  onChange={(e) =>
                    handleTieneVencimientoChange(
                      "vtv_rto",
                      e.target.checked,
                      getVencimiento(documentacionSeguridad.vtv_rto) ||
                        undefined
                    )
                  }
                />
              </TableCell>
              <TableCell align="center">
                <Checkbox
                  checked={
                    !getTieneVencimientoValue(documentacionSeguridad.vtv_rto)
                  }
                  onChange={(e) =>
                    handleTieneVencimientoChange(
                      "vtv_rto",
                      !e.target.checked,
                      getVencimiento(documentacionSeguridad.vtv_rto) ||
                        undefined
                    )
                  }
                />
              </TableCell>
              <TableCell>
                <TextField
                  type="date"
                  size="small"
                  fullWidth
                  value={getVencimiento(documentacionSeguridad.vtv_rto)}
                  onChange={(e) =>
                    handleTieneVencimientoChange(
                      "vtv_rto",
                      getTieneVencimientoValue(documentacionSeguridad.vtv_rto),
                      e.target.value
                    )
                  }
                  InputLabelProps={{ shrink: true }}
                />
              </TableCell>
            </TableRow>

            {/* MATAFUEGO 1KG */}
            <TableRow>
              <TableCell sx={{ fontWeight: 500 }}>MATAFUEGO 1KG</TableCell>
              <TableCell align="center">
                <Checkbox
                  checked={getTieneVencimientoValue(
                    documentacionSeguridad.matafuego_1kg
                  )}
                  onChange={(e) =>
                    handleTieneVencimientoChange(
                      "matafuego_1kg",
                      e.target.checked,
                      getVencimiento(documentacionSeguridad.matafuego_1kg) ||
                        undefined
                    )
                  }
                />
              </TableCell>
              <TableCell align="center">
                <Checkbox
                  checked={
                    !getTieneVencimientoValue(
                      documentacionSeguridad.matafuego_1kg
                    )
                  }
                  onChange={(e) =>
                    handleTieneVencimientoChange(
                      "matafuego_1kg",
                      !e.target.checked,
                      getVencimiento(documentacionSeguridad.matafuego_1kg) ||
                        undefined
                    )
                  }
                />
              </TableCell>
              <TableCell>
                <TextField
                  type="date"
                  size="small"
                  fullWidth
                  value={getVencimiento(documentacionSeguridad.matafuego_1kg)}
                  onChange={(e) =>
                    handleTieneVencimientoChange(
                      "matafuego_1kg",
                      getTieneVencimientoValue(
                        documentacionSeguridad.matafuego_1kg
                      ),
                      e.target.value
                    )
                  }
                  InputLabelProps={{ shrink: true }}
                />
              </TableCell>
            </TableRow>

            {/* MATAFUEGO 2.5KG */}
            <TableRow>
              <TableCell sx={{ fontWeight: 500 }}>MATAFUEGO 2.5KG</TableCell>
              <TableCell align="center">
                <Checkbox
                  checked={getTieneVencimientoValue(
                    documentacionSeguridad.matafuego_25kg
                  )}
                  onChange={(e) =>
                    handleTieneVencimientoChange(
                      "matafuego_25kg",
                      e.target.checked,
                      getVencimiento(documentacionSeguridad.matafuego_25kg) ||
                        undefined
                    )
                  }
                />
              </TableCell>
              <TableCell align="center">
                <Checkbox
                  checked={
                    !getTieneVencimientoValue(
                      documentacionSeguridad.matafuego_25kg
                    )
                  }
                  onChange={(e) =>
                    handleTieneVencimientoChange(
                      "matafuego_25kg",
                      !e.target.checked,
                      getVencimiento(documentacionSeguridad.matafuego_25kg) ||
                        undefined
                    )
                  }
                />
              </TableCell>
              <TableCell>
                <TextField
                  type="date"
                  size="small"
                  fullWidth
                  value={getVencimiento(documentacionSeguridad.matafuego_25kg)}
                  onChange={(e) =>
                    handleTieneVencimientoChange(
                      "matafuego_25kg",
                      getTieneVencimientoValue(
                        documentacionSeguridad.matafuego_25kg
                      ),
                      e.target.value
                    )
                  }
                  InputLabelProps={{ shrink: true }}
                />
              </TableCell>
            </TableRow>

            {/* BOTIQUIN */}
            <TableRow>
              <TableCell sx={{ fontWeight: 500 }}>BOTIQUIN</TableCell>
              <TableCell align="center">
                <Checkbox
                  checked={documentacionSeguridad.botiquin}
                  onChange={(e) =>
                    handleBooleanChange("botiquin", e.target.checked)
                  }
                />
              </TableCell>
              <TableCell align="center">
                <Checkbox
                  checked={!documentacionSeguridad.botiquin}
                  onChange={(e) =>
                    handleBooleanChange("botiquin", !e.target.checked)
                  }
                />
              </TableCell>
              <TableCell>
                <TextField size="small" fullWidth disabled />
              </TableCell>
            </TableRow>

            {/* SEGURO */}
            <TableRow>
              <TableCell sx={{ fontWeight: 500 }}>SEGURO</TableCell>
              <TableCell align="center">
                <Checkbox
                  checked={documentacionSeguridad.seguro}
                  onChange={(e) =>
                    handleBooleanChange("seguro", e.target.checked)
                  }
                />
              </TableCell>
              <TableCell align="center">
                <Checkbox
                  checked={!documentacionSeguridad.seguro}
                  onChange={(e) =>
                    handleBooleanChange("seguro", !e.target.checked)
                  }
                />
              </TableCell>
              <TableCell>
                <TextField size="small" fullWidth disabled />
              </TableCell>
            </TableRow>

            {/* TARJETA COMBUSTIBLE */}
            <TableRow>
              <TableCell sx={{ fontWeight: 500 }}>
                TARJETA COMBUSTIBLE
              </TableCell>
              <TableCell align="center">
                <Checkbox
                  checked={!!documentacionSeguridad.tarjeta_combustible}
                  onChange={(e) =>
                    handleTarjetaCombustibleChange(
                      e.target.checked ? "SHELL" : ""
                    )
                  }
                />
              </TableCell>
              <TableCell align="center">
                <Checkbox
                  checked={!documentacionSeguridad.tarjeta_combustible}
                  onChange={(e) =>
                    handleTarjetaCombustibleChange(
                      !e.target.checked ? "" : "SHELL"
                    )
                  }
                />
              </TableCell>
              <TableCell>
                <TextField
                  size="small"
                  fullWidth
                  value={documentacionSeguridad.tarjeta_combustible || ""}
                  onChange={(e) =>
                    handleTarjetaCombustibleChange(e.target.value)
                  }
                  placeholder="VPF / SHELL / TICKET-CARD"
                />
              </TableCell>
            </TableRow>

            {/* LLAVE DE RUEDA */}
            <TableRow>
              <TableCell sx={{ fontWeight: 500 }}>LLAVE DE RUEDA</TableCell>
              <TableCell align="center">
                <Checkbox
                  checked={documentacionSeguridad.llave_rueda}
                  onChange={(e) =>
                    handleBooleanChange("llave_rueda", e.target.checked)
                  }
                />
              </TableCell>
              <TableCell align="center">
                <Checkbox
                  checked={!documentacionSeguridad.llave_rueda}
                  onChange={(e) =>
                    handleBooleanChange("llave_rueda", !e.target.checked)
                  }
                />
              </TableCell>
              <TableCell>
                <TextField size="small" fullWidth disabled />
              </TableCell>
            </TableRow>

            {/* CRICKEY / GATO */}
            <TableRow>
              <TableCell sx={{ fontWeight: 500 }}>CRICKEY / GATO</TableCell>
              <TableCell align="center">
                <Checkbox
                  checked={documentacionSeguridad.crickey_gato}
                  onChange={(e) =>
                    handleBooleanChange("crickey_gato", e.target.checked)
                  }
                />
              </TableCell>
              <TableCell align="center">
                <Checkbox
                  checked={!documentacionSeguridad.crickey_gato}
                  onChange={(e) =>
                    handleBooleanChange("crickey_gato", !e.target.checked)
                  }
                />
              </TableCell>
              <TableCell>
                <TextField size="small" fullWidth disabled />
              </TableCell>
            </TableRow>

            {/* CUARTA DE REMOLQUE */}
            <TableRow>
              <TableCell sx={{ fontWeight: 500 }}>CUARTA DE REMOLQUE</TableCell>
              <TableCell align="center">
                <Checkbox
                  checked={documentacionSeguridad.cuarta_remolque}
                  onChange={(e) =>
                    handleBooleanChange("cuarta_remolque", e.target.checked)
                  }
                />
              </TableCell>
              <TableCell align="center">
                <Checkbox
                  checked={!documentacionSeguridad.cuarta_remolque}
                  onChange={(e) =>
                    handleBooleanChange("cuarta_remolque", !e.target.checked)
                  }
                />
              </TableCell>
              <TableCell>
                <TextField size="small" fullWidth disabled />
              </TableCell>
            </TableRow>

            {/* BALIZAS */}
            <TableRow>
              <TableCell sx={{ fontWeight: 500 }}>BALIZAS</TableCell>
              <TableCell align="center">
                <Checkbox
                  checked={documentacionSeguridad.balizas}
                  onChange={(e) =>
                    handleBooleanChange("balizas", e.target.checked)
                  }
                />
              </TableCell>
              <TableCell align="center">
                <Checkbox
                  checked={!documentacionSeguridad.balizas}
                  onChange={(e) =>
                    handleBooleanChange("balizas", !e.target.checked)
                  }
                />
              </TableCell>
              <TableCell>
                <TextField size="small" fullWidth disabled />
              </TableCell>
            </TableRow>

            {/* CHAPA PATENTE */}
            <TableRow>
              <TableCell sx={{ fontWeight: 500 }}>CHAPA PATENTE</TableCell>
              <TableCell align="center">
                <Checkbox
                  checked={documentacionSeguridad.chapa_patente}
                  onChange={(e) =>
                    handleBooleanChange("chapa_patente", e.target.checked)
                  }
                />
              </TableCell>
              <TableCell align="center">
                <Checkbox
                  checked={!documentacionSeguridad.chapa_patente}
                  onChange={(e) =>
                    handleBooleanChange("chapa_patente", !e.target.checked)
                  }
                />
              </TableCell>
              <TableCell>
                <TextField size="small" fullWidth disabled />
              </TableCell>
            </TableRow>

            {/* CERTIFICADO HABILITACION HIDROS */}
            <TableRow>
              <TableCell sx={{ fontWeight: 500 }}>
                CERTIFICADO HABILITACION TECNICA (SOLO HIDROS)
              </TableCell>
              <TableCell align="center">
                <Checkbox
                  checked={getTieneVencimientoValue(
                    documentacionSeguridad.certificado_habilitacion_hidros
                  )}
                  onChange={(e) =>
                    handleTieneVencimientoChange(
                      "certificado_habilitacion_hidros",
                      e.target.checked,
                      getVencimiento(
                        documentacionSeguridad.certificado_habilitacion_hidros
                      ) || undefined
                    )
                  }
                />
              </TableCell>
              <TableCell align="center">
                <Checkbox
                  checked={
                    !getTieneVencimientoValue(
                      documentacionSeguridad.certificado_habilitacion_hidros
                    )
                  }
                  onChange={(e) =>
                    handleTieneVencimientoChange(
                      "certificado_habilitacion_hidros",
                      !e.target.checked,
                      getVencimiento(
                        documentacionSeguridad.certificado_habilitacion_hidros
                      ) || undefined
                    )
                  }
                />
              </TableCell>
              <TableCell>
                <TextField
                  type="date"
                  size="small"
                  fullWidth
                  value={getVencimiento(
                    documentacionSeguridad.certificado_habilitacion_hidros
                  )}
                  onChange={(e) =>
                    handleTieneVencimientoChange(
                      "certificado_habilitacion_hidros",
                      getTieneVencimientoValue(
                        documentacionSeguridad.certificado_habilitacion_hidros
                      ),
                      e.target.value
                    )
                  }
                  InputLabelProps={{ shrink: true }}
                />
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};
