import React from "react";
import {
  TextField,
  FormControlLabel,
  Radio,
  RadioGroup,
  Box,
  Typography,
} from "@mui/material";
import type { FormularioMantenimientoData } from "../entities/formData";
import { useFormHelpers } from "../hooks/useFormHelpers";

interface InformacionGeneralProps {
  formData: FormularioMantenimientoData | null;
  handleChange: (name: string, value: unknown) => void;
}

export const InformacionGeneral: React.FC<InformacionGeneralProps> = ({
  formData,
  handleChange,
}) => {
  const { formatDateForInput, formatDateForStorage } = useFormHelpers();

  return (
    <Box>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
          gap: 2,
          mb: 2,
          p: 2,
          border: "2px solid #333",
          borderRadius: 1,
        }}
      >
        <Box>
          <TextField
            fullWidth
            label="DOMINIO"
            name="dominio"
            value={formData?.dominio || ""}
            onChange={(e) => handleChange("dominio", e.target.value)}
            placeholder="Ingrese dominio"
          />
        </Box>
        <Box>
          <TextField
            fullWidth
            label="MODELO VEHÍCULO"
            name="modelo"
            value={formData?.modelo_vehiculo || ""}
            onChange={(e) => handleChange("modelo_vehiculo", e.target.value)}
            placeholder="Ingrese modelo"
          />
        </Box>
        <Box>
          <TextField
            fullWidth
            type="number"
            label="KM ACTUAL"
            name="km_actual"
            value={formData?.km_actual || ""}
            onChange={(e) => handleChange("km_actual", e.target.value)}
            placeholder="Ingrese KM"
          />
        </Box>
        <Box>
          <TextField
            fullWidth
            label="COMBUSTIBLE TIPO"
            name="combustible_tipo"
            value={formData?.combustible_tipo || ""}
            onChange={(e) => handleChange("combustible_tipo", e.target.value)}
            placeholder="Nafta/Diesel/GNC"
          />
        </Box>
        <Box>
          <TextField
            fullWidth
            type="date"
            label="FECHA"
            name="fecha"
            value={formatDateForInput(formData?.fecha)}
            onChange={(e) =>
              handleChange("fecha", formatDateForStorage(e.target.value))
            }
            InputLabelProps={{ shrink: true }}
          />
        </Box>
        <Box>
          <TextField
            fullWidth
            label="BASE VEC"
            name="base_vec"
            value={formData?.base_vec || ""}
            onChange={(e) => handleChange("base_vec", e.target.value)}
            placeholder="Ingrese base"
          />
        </Box>
        <Box sx={{ gridColumn: { xs: "1", sm: "span 2" } }}>
          <TextField
            fullWidth
            label="*USUARIO CONDUCTOR (numérico)"
            name="usuario_conductor"
            value={formData?.usuario_conductor || ""}
            onChange={(e) => handleChange("usuario_conductor", e.target.value)}
            placeholder="Ingrese número de usuario"
          />
        </Box>
        <Box sx={{ gridColumn: { xs: "1", sm: "span 2" } }}>
          <TextField
            fullWidth
            label="*DIRECCIÓN Guarda Domiciliaria (Calle, altura, localidad, Pcia)"
            name="direccion"
            value={formData?.direccion || ""}
            onChange={(e) => handleChange("direccion", e.target.value)}
            placeholder="Ingrese dirección completa"
          />
        </Box>
        <Box sx={{ gridColumn: { xs: "1", sm: "span 2" } }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Typography fontWeight="bold">*GUARDA DOMICILIARIA:</Typography>
            <RadioGroup
              row
              name="guarda"
              value={formData?.guarda || ""}
              onChange={(e) => handleChange("guarda", e.target.value)}
            >
              <FormControlLabel value="si" control={<Radio />} label="SI" />
              <FormControlLabel value="no" control={<Radio />} label="NO" />
            </RadioGroup>
          </Box>
        </Box>
      </Box>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
          gap: 2,
          mb: 2,
        }}
      >
        <Box>
          <TextField
            fullWidth
            type="number"
            label="ÚLTIMO SERVICE: KM"
            name="ultimo_service.km"
            value={formData?.ultimo_service?.km || ""}
            onChange={(e) => {
              if (!formData) return;
              const service = formData.ultimo_service || {};
              handleChange("ultimo_service", {
                ...service,
                km: e.target.value,
              });
            }}
            placeholder="KM"
          />
        </Box>
        <Box>
          <TextField
            fullWidth
            type="date"
            label="FECHA REALIZADO"
            name="ultimo_service.fecha_realizado"
            value={formatDateForInput(
              formData?.ultimo_service?.fecha_realizado
            )}
            onChange={(e) => {
              if (!formData) return;
              const service = formData.ultimo_service || {};
              handleChange("ultimo_service", {
                ...service,
                fecha_realizado: formatDateForStorage(e.target.value),
              });
            }}
            InputLabelProps={{ shrink: true }}
          />
        </Box>
        <Box>
          <TextField
            fullWidth
            type="number"
            label="ÚLTIMA DISTRIBUCIÓN: KM"
            name="ultima_distribucion.km"
            value={formData?.ultima_distribucion?.km || ""}
            onChange={(e) => {
              if (!formData) return;
              const distribucion = formData.ultima_distribucion || {};
              handleChange("ultima_distribucion", {
                ...distribucion,
                km: e.target.value,
              });
            }}
            placeholder="KM"
          />
        </Box>
        <Box>
          <TextField
            fullWidth
            type="date"
            label="FECHA REALIZADO"
            name="ultima_distribucion.fecha_realizado"
            value={formatDateForInput(
              formData?.ultima_distribucion?.fecha_realizado
            )}
            onChange={(e) => {
              if (!formData) return;
              const distribucion = formData.ultima_distribucion || {};
              handleChange("ultima_distribucion", {
                ...distribucion,
                fecha_realizado: formatDateForStorage(e.target.value),
              });
            }}
            InputLabelProps={{ shrink: true }}
          />
        </Box>
      </Box>
    </Box>
  );
};
