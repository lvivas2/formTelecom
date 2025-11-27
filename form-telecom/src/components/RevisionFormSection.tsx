import React, { useCallback } from "react";
import { Paper, Box, Typography, Divider } from "@mui/material";
import { FormularioMantenimiento } from "./FormularioMantenimiento";
import type { FormularioMantenimientoData } from "../entities/formData";

interface RevisionFormSectionProps {
  formData: FormularioMantenimientoData | null;
  onDataChange: (data: FormularioMantenimientoData) => void;
}

/**
 * Componente memoizado que aísla el formulario pesado.
 * Evita re-renderizados innecesarios cuando cambia el estado del SpeedDial.
 */
export const RevisionFormSection = React.memo<RevisionFormSectionProps>(
  ({ formData, onDataChange }) => {
    const handleDataChange = useCallback(
      (data: FormularioMantenimientoData) => {
        onDataChange(data);
      },
      [onDataChange]
    );

    return (
      <Paper
        elevation={2}
        sx={{
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
          height: "100%",
        }}
      >
        <Box sx={{ p: 2 }}>
          <Typography variant="h6" gutterBottom>
            Formulario Completo (Editable)
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Complete los campos faltantes basándose en los datos originales. Los
            campos ya completados desde n8n aparecerán prellenados.
          </Typography>
        </Box>
        <Divider sx={{ mb: 3 }} />

        <Box
          sx={{
            flex: 1,
            overflow: "auto",
            minHeight: 0,
          }}
        >
          <FormularioMantenimiento
            initialData={formData}
            onDataChange={handleDataChange}
            readOnly={false}
          />
        </Box>
      </Paper>
    );
  }
);

RevisionFormSection.displayName = "RevisionFormSection";
