import React from "react";
import { TextField, Box, Typography } from "@mui/material";

interface FooterProps {
  formData: any;
  handleChange: (name: string, value: any) => void;
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
          NÚMERO DE TICKET VEC PARA PM PREVENTIVO Y ORDINARIO CADA 120 DÍAS:
        </Typography>
        <TextField
          fullWidth
          name="ticket_vec"
          value={formData.ticket_vec || ""}
          onChange={(e) => handleChange("ticket_vec", e.target.value)}
          placeholder="Ingrese número de ticket"
        />
      </Box>

      <Box>
        <Typography fontWeight="bold" sx={{ mb: 1 }}>
          REALIZADO POR (EMPRESA / NOMBRE Y APELLIDO):
        </Typography>
        <TextField
          fullWidth
          name="realizado_por"
          value={formData.realizado_por || ""}
          onChange={(e) => handleChange("realizado_por", e.target.value)}
          placeholder="Ingrese empresa y nombre completo"
        />
      </Box>
    </Box>
  );
};

