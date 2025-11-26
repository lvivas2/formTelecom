import React from "react";
import {
  TextField,
  FormControlLabel,
  Radio,
  RadioGroup,
  Box,
  Typography,
} from "@mui/material";

interface InformacionGeneralProps {
  formData: any;
  handleChange: (name: string, value: any) => void;
}

export const InformacionGeneral: React.FC<InformacionGeneralProps> = ({
  formData,
  handleChange,
}) => {
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
            value={formData.dominio || ""}
            onChange={(e) => handleChange("dominio", e.target.value)}
            placeholder="Ingrese dominio"
          />
        </Box>
        <Box>
          <TextField
            fullWidth
            label="MODELO VEHÍCULO"
            name="modelo"
            value={formData.modelo || ""}
            onChange={(e) => handleChange("modelo", e.target.value)}
            placeholder="Ingrese modelo"
          />
        </Box>
        <Box>
          <TextField
            fullWidth
            type="number"
            label="KM ACTUAL"
            name="km_actual"
            value={formData.km_actual || ""}
            onChange={(e) => handleChange("km_actual", e.target.value)}
            placeholder="Ingrese KM"
          />
        </Box>
        <Box>
          <TextField
            fullWidth
            label="COMBUSTIBLE TIPO"
            name="combustible"
            value={formData.combustible || ""}
            onChange={(e) => handleChange("combustible", e.target.value)}
            placeholder="Nafta/Diesel/GNC"
          />
        </Box>
        <Box>
          <TextField
            fullWidth
            type="date"
            label="FECHA"
            name="fecha"
            value={formData.fecha || ""}
            onChange={(e) => handleChange("fecha", e.target.value)}
            InputLabelProps={{ shrink: true }}
          />
        </Box>
        <Box>
          <TextField
            fullWidth
            label="BASE VEC"
            name="base_vec"
            value={formData.base_vec || ""}
            onChange={(e) => handleChange("base_vec", e.target.value)}
            placeholder="Ingrese base"
          />
        </Box>
        <Box sx={{ gridColumn: { xs: "1", sm: "span 2" } }}>
          <TextField
            fullWidth
            label="*USUARIO CONDUCTOR (numérico)"
            name="usuario_conductor"
            value={formData.usuario_conductor || ""}
            onChange={(e) => handleChange("usuario_conductor", e.target.value)}
            placeholder="Ingrese número de usuario"
          />
        </Box>
        <Box sx={{ gridColumn: { xs: "1", sm: "span 2" } }}>
          <TextField
            fullWidth
            label="*DIRECCIÓN Guarda Domiciliaria (Calle, altura, localidad, Pcia)"
            name="direccion"
            value={formData.direccion || ""}
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
              value={formData.guarda || ""}
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
            name="ultimo_service_km"
            value={formData.ultimo_service_km || ""}
            onChange={(e) => handleChange("ultimo_service_km", e.target.value)}
            placeholder="KM"
          />
        </Box>
        <Box>
          <TextField
            fullWidth
            type="date"
            label="FECHA REALIZADO"
            name="ultimo_service_fecha"
            value={formData.ultimo_service_fecha || ""}
            onChange={(e) =>
              handleChange("ultimo_service_fecha", e.target.value)
            }
            InputLabelProps={{ shrink: true }}
          />
        </Box>
        <Box>
          <TextField
            fullWidth
            type="number"
            label="ÚLTIMA DISTRIBUCIÓN: KM"
            name="ultima_distribucion_km"
            value={formData.ultima_distribucion_km || ""}
            onChange={(e) =>
              handleChange("ultima_distribucion_km", e.target.value)
            }
            placeholder="KM"
          />
        </Box>
        <Box>
          <TextField
            fullWidth
            type="date"
            label="FECHA REALIZADO"
            name="ultima_distribucion_fecha"
            value={formData.ultima_distribucion_fecha || ""}
            onChange={(e) =>
              handleChange("ultima_distribucion_fecha", e.target.value)
            }
            InputLabelProps={{ shrink: true }}
          />
        </Box>
      </Box>
    </Box>
  );
};
