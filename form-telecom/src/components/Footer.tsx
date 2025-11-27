import React from "react";
import { TextField, Box, Typography } from "@mui/material";
import type { FormularioMantenimientoData } from "../entities/formData";

interface FooterProps {
  formData: FormularioMantenimientoData | null;
  handleChange: (name: string, value: unknown) => void;
}

export const Footer: React.FC<FooterProps> = ({ formData, handleChange }) => {
  return (
    <Box
      sx={{
        mt: 2,
        p: 2,
        border: "2px solid #333",
        borderRadius: 1,
      }}
    >
      <Box sx={{ mb: 2 }}>
        <Typography fontWeight="bold" sx={{ mb: 1 }}>
          REALIZADO POR (EMPRESA / NOMBRE Y APELLIDO):
        </Typography>
        <TextField
          fullWidth
          name="observaciones_finales.realizado_por"
          value={formData?.observaciones_finales?.realizado_por || ""}
          onChange={(e) => {
            if (!formData) return;
            const obsFinales = formData.observaciones_finales || {};
            handleChange("observaciones_finales", {
              ...obsFinales,
              realizado_por: e.target.value,
            });
          }}
          placeholder="Ingrese empresa y nombre completo"
        />
      </Box>
    </Box>
  );
};
