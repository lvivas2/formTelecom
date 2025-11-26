import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Checkbox,
  TextField,
  Typography,
  Box,
  TextareaAutosize,
} from "@mui/material";

interface NivelLiquidosProps {
  formData: any;
  handleChange: (name: string, value: any) => void;
}

export const NivelLiquidos: React.FC<NivelLiquidosProps> = ({
  formData,
  handleChange,
}) => {
  const handleCheckboxChange = (name: string, checked: boolean) => {
    handleChange(name, checked);
  };

  const items = [
    { name: "aceite_motor", label: "ACEITE MOTOR" },
    { name: "aceite_caja", label: "ACEITE CAJA" },
    { name: "aceite_dif", label: "ACEITE DIFERENCIAL" },
    { name: "liq_frenos", label: "LÍQUIDO FRENOS" },
    { name: "liq_refrig", label: "LÍQUIDO REFRIGERANTE" },
    { name: "liq_hidra", label: "LÍQUIDO HIDRÁULICA" },
    { name: "liq_limpia", label: "LÍQUIDO LIMPIAPARABRISAS" },
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
        NIVEL DE LÍQUIDOS
      </Typography>
      <TableContainer component={Paper}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell
                sx={{ bgcolor: "#555", color: "white", fontWeight: "bold" }}
              >
                ITEM
              </TableCell>
              <TableCell
                align="center"
                sx={{ bgcolor: "#555", color: "white", fontWeight: "bold" }}
              >
                B
              </TableCell>
              <TableCell
                align="center"
                sx={{ bgcolor: "#555", color: "white", fontWeight: "bold" }}
              >
                M
              </TableCell>
              <TableCell
                sx={{ bgcolor: "#555", color: "white", fontWeight: "bold" }}
              >
                OBS.
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {items.map((item) => (
              <TableRow key={item.name}>
                <TableCell sx={{ fontWeight: 500 }}>{item.label}</TableCell>
                <TableCell align="center">
                  <Checkbox
                    checked={formData[`${item.name}_b`] || false}
                    onChange={(e) =>
                      handleCheckboxChange(`${item.name}_b`, e.target.checked)
                    }
                  />
                </TableCell>
                <TableCell align="center">
                  <Checkbox
                    checked={formData[`${item.name}_m`] || false}
                    onChange={(e) =>
                      handleCheckboxChange(`${item.name}_m`, e.target.checked)
                    }
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    size="small"
                    fullWidth
                    name={`${item.name}_obs`}
                    value={formData[`${item.name}_obs`] || ""}
                    onChange={(e) =>
                      handleChange(`${item.name}_obs`, e.target.value)
                    }
                  />
                </TableCell>
              </TableRow>
            ))}
            <TableRow>
              <TableCell sx={{ fontWeight: 500 }}>
                POSEE PERDIDA DE ACEITE / LÍQUIDOS
              </TableCell>
              <TableCell align="center">
                <Checkbox
                  checked={formData.perdida_si || false}
                  onChange={(e) =>
                    handleCheckboxChange("perdida_si", e.target.checked)
                  }
                />
              </TableCell>
              <TableCell align="center">
                <Checkbox
                  checked={formData.perdida_no || false}
                  onChange={(e) =>
                    handleCheckboxChange("perdida_no", e.target.checked)
                  }
                />
              </TableCell>
              <TableCell>
                <TextField
                  size="small"
                  fullWidth
                  name="perdida_obs"
                  value={formData.perdida_obs || ""}
                  onChange={(e) => handleChange("perdida_obs", e.target.value)}
                />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={4} sx={{ fontWeight: 500 }}>
                DETALLAR CUÁL:
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={4}>
                <TextareaAutosize
                  minRows={3}
                  style={{
                    width: "100%",
                    padding: "8px",
                    border: "1px solid #ccc",
                    borderRadius: "4px",
                  }}
                  name="perdida_detalle"
                  value={formData.perdida_detalle || ""}
                  onChange={(e) =>
                    handleChange("perdida_detalle", e.target.value)
                  }
                />
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

