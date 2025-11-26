import React from "react";
import { Checkbox, TextField, Typography, Box, Paper } from "@mui/material";

interface FuncionamientoProps {
  formData: any;
  handleChange: (name: string, value: any) => void;
}

export const Funcionamiento: React.FC<FuncionamientoProps> = ({
  formData,
  handleChange,
}) => {
  const handleCheckboxChange = (name: string, checked: boolean) => {
    handleChange(name, checked);
  };

  const items = [
    { name: "motor", label: "MOTOR" },
    { name: "electro", label: "ELECTROVENTILADOR" },
    { name: "embrague", label: "EMBRAGUE" },
    { name: "trans", label: "TRANSMISIÓN" },
    { name: "dir", label: "DIRECCIÓN" },
    { name: "escape", label: "ESCAPE" },
    { name: "frenos", label: "FRENOS" },
    { name: "freno_mano", label: "FRENO DE MANO" },
    { name: "amort", label: "AMORTIGUADORES" },
    { name: "tren_del", label: "TREN DELANTERO" },
    { name: "aire", label: "AIRE ACONDICIONADO", special: "no_possee" },
    { name: "calef", label: "CALEFACCIÓN" },
    { name: "bateria", label: "BATERÍA (con carga)" },
    { name: "tablero", label: "TABLERO INSTRUMENTAL" },
    { name: "cerraduras", label: "CERRADURAS" },
    { name: "vidrios", label: "VIDRIOS" },
    { name: "limpia", label: "LIMPIA PARABRISAS" },
    { name: "sapito", label: "SAPITO" },
    { name: "bocina", label: "BOCINA" },
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
        FUNCIONAMIENTO
      </Typography>

      <Paper elevation={2} sx={{ border: "2px solid #333", mb: 2 }}>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "repeat(4, 1fr)",
              sm: "2fr 1fr 1fr 1fr",
            },
            gap: 0,
          }}
        >
          <Box
            sx={{
              bgcolor: "#555",
              color: "white",
              p: 1,
              fontWeight: "bold",
              textAlign: "center",
              borderRight: "1px solid #333",
              borderBottom: "1px solid #333",
            }}
          >
            ITEM
          </Box>
          <Box
            sx={{
              bgcolor: "#555",
              color: "white",
              p: 1,
              fontWeight: "bold",
              textAlign: "center",
              borderRight: "1px solid #333",
              borderBottom: "1px solid #333",
            }}
          >
            B
          </Box>
          <Box
            sx={{
              bgcolor: "#555",
              color: "white",
              p: 1,
              fontWeight: "bold",
              textAlign: "center",
              borderRight: "1px solid #333",
              borderBottom: "1px solid #333",
            }}
          >
            R
          </Box>
          <Box
            sx={{
              bgcolor: "#555",
              color: "white",
              p: 1,
              fontWeight: "bold",
              textAlign: "center",
              borderBottom: "1px solid #333",
            }}
          >
            M
          </Box>

          {items.map((item, index) => (
            <React.Fragment key={item.name}>
              <Box
                sx={{
                  p: 1,
                  fontWeight: 500,
                  borderRight: "1px solid #333",
                  borderBottom:
                    index < items.length - 1 ? "1px solid #333" : "none",
                  minHeight: "48px",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                {item.label}
              </Box>
              <Box
                sx={{
                  p: 1,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  borderRight: "1px solid #333",
                  borderBottom:
                    index < items.length - 1 ? "1px solid #333" : "none",
                  minHeight: "48px",
                }}
              >
                <Checkbox
                  checked={formData[`${item.name}_b`] || false}
                  onChange={(e) =>
                    handleCheckboxChange(`${item.name}_b`, e.target.checked)
                  }
                />
              </Box>
              <Box
                sx={{
                  p: 1,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  borderRight: "1px solid #333",
                  borderBottom:
                    index < items.length - 1 ? "1px solid #333" : "none",
                  minHeight: "48px",
                }}
              >
                <Checkbox
                  checked={formData[`${item.name}_r`] || false}
                  onChange={(e) =>
                    handleCheckboxChange(`${item.name}_r`, e.target.checked)
                  }
                />
              </Box>
              <Box
                sx={{
                  p: 1,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  borderBottom:
                    index < items.length - 1 ? "1px solid #333" : "none",
                  minHeight: "48px",
                }}
              >
                <Checkbox
                  checked={formData[`${item.name}_m`] || false}
                  onChange={(e) =>
                    handleCheckboxChange(`${item.name}_m`, e.target.checked)
                  }
                />
                {item.special === "no_possee" && (
                  <Typography variant="caption" sx={{ ml: 0.5 }}>
                    NO POSEE
                  </Typography>
                )}
              </Box>
            </React.Fragment>
          ))}

          {/* Batería marca y fecha */}
          <Box
            sx={{
              p: 1,
              fontWeight: 500,
              borderRight: "1px solid #333",
              borderBottom: "1px solid #333",
              minHeight: "48px",
              display: "flex",
              alignItems: "center",
            }}
          >
            BATERÍA (MARCA)
          </Box>
          <Box
            sx={{
              p: 1,
              borderRight: "1px solid #333",
              borderBottom: "1px solid #333",
              minHeight: "48px",
              gridColumn: "span 3",
            }}
          >
            <TextField
              fullWidth
              size="small"
              name="bateria_marca"
              value={formData.bateria_marca || ""}
              onChange={(e) => handleChange("bateria_marca", e.target.value)}
            />
          </Box>

          <Box
            sx={{
              p: 1,
              fontWeight: 500,
              borderRight: "1px solid #333",
              borderBottom: "1px solid #333",
              minHeight: "48px",
              display: "flex",
              alignItems: "center",
            }}
          >
            BATERÍA (FECHA FABRICACIÓN)
          </Box>
          <Box
            sx={{
              p: 1,
              borderBottom: "1px solid #333",
              minHeight: "48px",
              gridColumn: "span 3",
            }}
          >
            <TextField
              fullWidth
              size="small"
              name="bateria_fecha"
              value={formData.bateria_fecha || ""}
              onChange={(e) => handleChange("bateria_fecha", e.target.value)}
            />
          </Box>
        </Box>
      </Paper>

      <Box sx={{ mt: 1, p: 1.5, bgcolor: "#f8f9fa", borderRadius: 1 }}>
        <Typography variant="caption" fontWeight="bold">
          B: Bueno
        </Typography>
        <br />
        <Typography variant="caption" fontWeight="bold">
          R: Regular
        </Typography>
        <br />
        <Typography variant="caption" fontWeight="bold">
          M: Malo
        </Typography>
      </Box>
    </Box>
  );
};
