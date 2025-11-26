import React from "react";
import { Typography, Box, TextareaAutosize } from "@mui/material";

interface ObservacionesProps {
  formData: any;
  handleChange: (name: string, value: any) => void;
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
        name="observaciones_generales"
        value={formData.observaciones_generales || ""}
        onChange={(e) =>
          handleChange("observaciones_generales", e.target.value)
        }
      />
    </Box>
  );
};

