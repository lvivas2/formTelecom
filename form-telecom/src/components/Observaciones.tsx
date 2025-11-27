import React from "react";
import { Typography, Box, TextareaAutosize } from "@mui/material";
import type { FormularioMantenimientoData } from "../entities/formData";

interface ObservacionesProps {
  formData: FormularioMantenimientoData | null;
  handleChange: (name: string, value: unknown) => void;
}

export const Observaciones: React.FC<ObservacionesProps> = ({
  formData,
  handleChange,
}) => {
  return (
    <Box sx={{ mt: 2 }}>
      <Typography
        variant="h6"
        sx={{
          bgcolor: "#333",
          color: "white",
          p: 1.5,
          mb: 1,
          fontWeight: "bold",
          borderRadius: 1,
        }}
      >
        OBSERVACIONES:
      </Typography>
      <TextareaAutosize
        minRows={6}
        style={{
          width: "100%",
          padding: "10px",
          border: "1px solid #333",
          borderRadius: "4px",
          fontFamily: "Arial, sans-serif",
          fontSize: "14px",
        }}
        name="observaciones_finales.observaciones"
        value={formData?.observaciones_finales?.observaciones || ""}
        onChange={(e) => {
          if (!formData) return;
          const obsFinales = formData.observaciones_finales || {};
          handleChange("observaciones_finales", {
            ...obsFinales,
            observaciones: e.target.value,
          });
        }}
      />
    </Box>
  );
};
