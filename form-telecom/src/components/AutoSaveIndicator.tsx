import React from "react";
import { Box, CircularProgress, IconButton, Tooltip } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorIcon from "@mui/icons-material/Error";

interface AutoSaveIndicatorProps {
  isSaving: boolean;
  isSaved: boolean;
  error: Error | null;
}

/**
 * Indicador visual discreto del estado de autoguardado
 * Muestra: spinner (guardando), check (guardado), error (error)
 */
export const AutoSaveIndicator: React.FC<AutoSaveIndicatorProps> = ({
  isSaving,
  isSaved,
  error,
}) => {
  if (error) {
    return (
      <Tooltip title={`Error al guardar: ${error.message}`}>
        <IconButton
          size="small"
          sx={{
            color: "error.main",
            "&:hover": { bgcolor: "error.light", opacity: 0.8 },
          }}
        >
          <ErrorIcon fontSize="small" />
        </IconButton>
      </Tooltip>
    );
  }

  if (isSaving) {
    return (
      <Tooltip title="Guardando...">
        <Box sx={{ display: "flex", alignItems: "center", p: 0.5 }}>
          <CircularProgress size={20} thickness={4} />
        </Box>
      </Tooltip>
    );
  }

  if (isSaved) {
    return (
      <Tooltip title="Guardado automáticamente">
        <IconButton
          size="small"
          sx={{
            color: "success.main",
            "&:hover": { bgcolor: "success.light", opacity: 0.8 },
          }}
        >
          <CheckCircleIcon fontSize="small" />
        </IconButton>
      </Tooltip>
    );
  }

  return null;
};
