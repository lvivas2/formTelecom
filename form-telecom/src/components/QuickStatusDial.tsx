import React, { useState, useCallback } from "react";
import {
  SpeedDial,
  SpeedDialAction,
  SpeedDialIcon,
  Backdrop,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

interface QuickStatusDialProps {
  currentStatus: string;
  onStatusChange: (newStatus: string) => void;
  disabled?: boolean;
}

export const QuickStatusDial: React.FC<QuickStatusDialProps> = ({
  currentStatus,
  onStatusChange,
  disabled = false,
}) => {
  const [open, setOpen] = useState(false);

  const handleClose = useCallback(() => {
    setOpen(false);
  }, []);

  const handleOpen = useCallback(() => {
    if (!disabled) {
      setOpen(true);
    }
  }, [disabled]);

  const handleActionClick = useCallback(
    (newStatus: string) => {
      setOpen(false);
      onStatusChange(newStatus);
    },
    [onStatusChange]
  );

  return (
    <>
      <Backdrop open={open} onClick={handleClose} />
      <SpeedDial
        ariaLabel="Cambiar estado de revisión"
        sx={{
          position: "absolute",
          bottom: 16,
          right: 16,
          "& .MuiSpeedDial-actions": {
            transitionDelay: "0ms !important",
          },
          "& .MuiSpeedDialAction-fab": {
            transitionDelay: "0ms !important",
          },
        }}
        icon={<SpeedDialIcon />}
        onClose={handleClose}
        onOpen={handleOpen}
        open={open}
        transitionDuration={150}
      >
        {currentStatus !== "in_review" && (
          <SpeedDialAction
            key="in_review"
            icon={<EditIcon />}
            slotProps={{
              tooltip: {
                open: true,
                title: "En Revisión",
              },
            }}
            onClick={() => handleActionClick("in_review")}
          />
        )}
        {currentStatus !== "completed" && (
          <SpeedDialAction
            key="completed"
            icon={<CheckCircleIcon />}
            slotProps={{
              tooltip: {
                open: true,
                title: "Completado",
              },
            }}
            onClick={() => handleActionClick("completed")}
          />
        )}
      </SpeedDial>
    </>
  );
};
