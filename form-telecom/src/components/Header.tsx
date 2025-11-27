import React from "react";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { useAuth } from "../contexts/AuthContext";
import LogoutIcon from "@mui/icons-material/Logout";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

interface HeaderProps {
  title?: string;
  createdAt?: string;
  updatedAt?: string | null;
  onBack?: () => void;
  backLabel?: string;
  rightAction?: React.ReactNode;
}

export const Header: React.FC<HeaderProps> = ({
  title = "Panel de Análisis",
  createdAt,
  updatedAt,
  onBack,
  backLabel = "Volver",
  rightAction,
}) => {
  const { signOut, user } = useAuth();

  const handleLogout = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  return (
    <AppBar position="static">
      <Toolbar>
        {onBack && (
          <Button
            color="inherit"
            onClick={onBack}
            startIcon={<ArrowBackIcon />}
            sx={{ textTransform: "none", mr: 2 }}
          >
            {backLabel}
          </Button>
        )}
        <Box sx={{ flexGrow: 1 }}>
          <Typography variant="h6" component="div">
            {title}
          </Typography>
          {(createdAt || updatedAt) && (
            <Box sx={{ display: "flex", gap: 2, mt: 0.5 }}>
              {createdAt && (
                <Typography
                  variant="caption"
                  sx={{ opacity: 0.9, display: { xs: "none", sm: "block" } }}
                >
                  Creado: {new Date(createdAt).toLocaleString("es-AR")}
                </Typography>
              )}
              {updatedAt && (
                <Typography
                  variant="caption"
                  sx={{ opacity: 0.9, display: { xs: "none", sm: "block" } }}
                >
                  Actualizado: {new Date(updatedAt).toLocaleString("es-AR")}
                </Typography>
              )}
            </Box>
          )}
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          {rightAction && <Box>{rightAction}</Box>}
          {user && (
            <>
              <Typography
                variant="body2"
                sx={{ display: { xs: "none", sm: "block" } }}
              >
                {user.email}
              </Typography>
              <Button
                color="inherit"
                onClick={handleLogout}
                startIcon={<LogoutIcon />}
                sx={{ textTransform: "none" }}
              >
                Cerrar Sesión
              </Button>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};
