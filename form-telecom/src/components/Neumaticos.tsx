import React from "react";
import {
  TextField,
  FormControlLabel,
  Radio,
  RadioGroup,
  Box,
  Typography,
  Paper,
  TextareaAutosize,
} from "@mui/material";

interface NeumaticosProps {
  formData: any;
  handleChange: (name: string, value: any) => void;
}

export const Neumaticos: React.FC<NeumaticosProps> = ({
  formData,
  handleChange,
}) => {
  const neumaticos = [
    { name: "cub_derecha", label: "CUBIERTA DERECHA" },
    { name: "cub_izquierda", label: "CUBIERTA IZQUIERDA" },
    { name: "tras_derecha", label: "TRASERA DERECHA" },
    { name: "tras_izquierda", label: "TRASERA IZQUIERDA" },
    { name: "inf_td", label: "INFERIOR TD" },
    { name: "inf_ti", label: "INFERIOR TI" },
    { name: "auxilio", label: "RUEDA DE AUXILIO" },
  ];

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
          <Typography fontWeight="bold">MEDIDA (E): 175/65 R14</Typography>
          <TextField
            size="small"
            name="medida_neumaticos"
            value={formData.medida_neumaticos || ""}
            onChange={(e) => handleChange("medida_neumaticos", e.target.value)}
            placeholder="Ingrese medida"
            sx={{ flexGrow: 1, maxWidth: 300 }}
          />
        </Box>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", sm: "repeat(3, 1fr)" },
            gap: 2,
          }}
        >
          <TextField
            fullWidth
            size="small"
            label="DOT"
            name="dot"
            value={formData.dot || ""}
            onChange={(e) => handleChange("dot", e.target.value)}
            placeholder="DOT"
          />
          <TextField
            fullWidth
            size="small"
            label="MARCA"
            name="marca"
            value={formData.marca || ""}
            onChange={(e) => handleChange("marca", e.target.value)}
            placeholder="Marca"
          />
          <TextField
            fullWidth
            size="small"
            type="number"
            label="mm"
            name="mm"
            value={formData.mm || ""}
            onChange={(e) => handleChange("mm", e.target.value)}
            placeholder="mm"
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
        {neumaticos.map((neumatico) => (
          <Box key={neumatico.name}>
            <Paper
              elevation={2}
              sx={{
                p: 2,
                border: "1px solid #333",
                borderRadius: 1,
              }}
            >
              <Typography
                variant="subtitle2"
                fontWeight="bold"
                sx={{ mb: 1.5 }}
              >
                {neumatico.label}
              </Typography>
              <RadioGroup
                name={neumatico.name}
                value={formData[neumatico.name] || ""}
                onChange={(e) => handleChange(neumatico.name, e.target.value)}
              >
                <FormControlLabel
                  value="B"
                  control={<Radio size="small" />}
                  label="B - Bueno"
                />
                <FormControlLabel
                  value="R"
                  control={<Radio size="small" />}
                  label="R - Regular"
                />
                <FormControlLabel
                  value="M"
                  control={<Radio size="small" />}
                  label="M - Malo"
                />
              </RadioGroup>
            </Paper>
          </Box>
        ))}
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
          name="observaciones_neumaticos"
          value={formData.observaciones_neumaticos || ""}
          onChange={(e) =>
            handleChange("observaciones_neumaticos", e.target.value)
          }
        />
      </Box>
    </Box>
  );
};
