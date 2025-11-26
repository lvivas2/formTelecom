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

interface DocumentacionSeguridadProps {
  formData: any;
  handleChange: (name: string, value: any) => void;
}

export const DocumentacionSeguridad: React.FC<DocumentacionSeguridadProps> = ({
  formData,
  handleChange,
}) => {
  const handleCheckboxChange = (name: string, checked: boolean) => {
    handleChange(name, checked);
  };

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
        DOCUMENTACIÓN - SEGURIDAD
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
                SI
              </TableCell>
              <TableCell
                align="center"
                sx={{ bgcolor: "#555", color: "white", fontWeight: "bold" }}
              >
                NO
              </TableCell>
              <TableCell
                align="center"
                sx={{ bgcolor: "#555", color: "white", fontWeight: "bold" }}
              >
                VENCIMIENTO
              </TableCell>
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
                align="center"
                sx={{ bgcolor: "#555", color: "white", fontWeight: "bold" }}
              >
                OBSERV.
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell sx={{ fontWeight: 500 }}>CÉDULA VERDE</TableCell>
              <TableCell align="center">
                <Checkbox
                  checked={formData.cedula_si || false}
                  onChange={(e) =>
                    handleCheckboxChange("cedula_si", e.target.checked)
                  }
                />
              </TableCell>
              <TableCell align="center">
                <Checkbox
                  checked={formData.cedula_no || false}
                  onChange={(e) =>
                    handleCheckboxChange("cedula_no", e.target.checked)
                  }
                />
              </TableCell>
              <TableCell>
                <TextField
                  type="date"
                  size="small"
                  fullWidth
                  name="cedula_venc"
                  value={formData.cedula_venc || ""}
                  onChange={(e) => handleChange("cedula_venc", e.target.value)}
                  InputLabelProps={{ shrink: true }}
                />
              </TableCell>
              <TableCell sx={{ fontWeight: 500 }}>
                LUZ GIRO DELANTERA / TRASERA
              </TableCell>
              <TableCell align="center">
                <Checkbox
                  checked={formData.luz_giro_del_b || false}
                  onChange={(e) =>
                    handleCheckboxChange("luz_giro_del_b", e.target.checked)
                  }
                />
              </TableCell>
              <TableCell align="center">
                <Checkbox
                  checked={formData.luz_giro_del_m || false}
                  onChange={(e) =>
                    handleCheckboxChange("luz_giro_del_m", e.target.checked)
                  }
                />
              </TableCell>
              <TableCell>
                <TextField
                  size="small"
                  fullWidth
                  name="luz_giro_del_obs"
                  value={formData.luz_giro_del_obs || ""}
                  onChange={(e) =>
                    handleChange("luz_giro_del_obs", e.target.value)
                  }
                />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx={{ fontWeight: 500 }}>
                VENCIMIENTO VTV / RTO
              </TableCell>
              <TableCell align="center">
                <Checkbox
                  checked={formData.vtv_si || false}
                  onChange={(e) =>
                    handleCheckboxChange("vtv_si", e.target.checked)
                  }
                />
              </TableCell>
              <TableCell align="center">
                <Checkbox
                  checked={formData.vtv_no || false}
                  onChange={(e) =>
                    handleCheckboxChange("vtv_no", e.target.checked)
                  }
                />
              </TableCell>
              <TableCell>
                <TextField
                  type="date"
                  size="small"
                  fullWidth
                  name="vtv_venc"
                  value={formData.vtv_venc || ""}
                  onChange={(e) => handleChange("vtv_venc", e.target.value)}
                  InputLabelProps={{ shrink: true }}
                />
              </TableCell>
              <TableCell sx={{ fontWeight: 500 }}>BALIZA / GIRO</TableCell>
              <TableCell align="center">
                <Checkbox
                  checked={formData.baliza_b || false}
                  onChange={(e) =>
                    handleCheckboxChange("baliza_b", e.target.checked)
                  }
                />
              </TableCell>
              <TableCell align="center">
                <Checkbox
                  checked={formData.baliza_m || false}
                  onChange={(e) =>
                    handleCheckboxChange("baliza_m", e.target.checked)
                  }
                />
              </TableCell>
              <TableCell>
                <TextField
                  size="small"
                  fullWidth
                  name="baliza_obs"
                  value={formData.baliza_obs || ""}
                  onChange={(e) => handleChange("baliza_obs", e.target.value)}
                />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx={{ fontWeight: 500 }}>MATAFUEGO 1KG</TableCell>
              <TableCell align="center">
                <Checkbox
                  checked={formData.matafuego1_si || false}
                  onChange={(e) =>
                    handleCheckboxChange("matafuego1_si", e.target.checked)
                  }
                />
              </TableCell>
              <TableCell align="center">
                <Checkbox
                  checked={formData.matafuego1_no || false}
                  onChange={(e) =>
                    handleCheckboxChange("matafuego1_no", e.target.checked)
                  }
                />
              </TableCell>
              <TableCell>
                <TextField
                  type="date"
                  size="small"
                  fullWidth
                  name="matafuego1_venc"
                  value={formData.matafuego1_venc || ""}
                  onChange={(e) =>
                    handleChange("matafuego1_venc", e.target.value)
                  }
                  InputLabelProps={{ shrink: true }}
                />
              </TableCell>
              <TableCell sx={{ fontWeight: 500 }}>LUZ BAJA</TableCell>
              <TableCell align="center">
                <Checkbox
                  checked={formData.luz_baja_b || false}
                  onChange={(e) =>
                    handleCheckboxChange("luz_baja_b", e.target.checked)
                  }
                />
              </TableCell>
              <TableCell align="center">
                <Checkbox
                  checked={formData.luz_baja_m || false}
                  onChange={(e) =>
                    handleCheckboxChange("luz_baja_m", e.target.checked)
                  }
                />
              </TableCell>
              <TableCell>
                <TextField
                  size="small"
                  fullWidth
                  name="luz_baja_obs"
                  value={formData.luz_baja_obs || ""}
                  onChange={(e) => handleChange("luz_baja_obs", e.target.value)}
                />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx={{ fontWeight: 500 }}>MATAFUEGO 2.5KG</TableCell>
              <TableCell align="center">
                <Checkbox
                  checked={formData.matafuego2_si || false}
                  onChange={(e) =>
                    handleCheckboxChange("matafuego2_si", e.target.checked)
                  }
                />
              </TableCell>
              <TableCell align="center">
                <Checkbox
                  checked={formData.matafuego2_no || false}
                  onChange={(e) =>
                    handleCheckboxChange("matafuego2_no", e.target.checked)
                  }
                />
              </TableCell>
              <TableCell>
                <TextField
                  type="date"
                  size="small"
                  fullWidth
                  name="matafuego2_venc"
                  value={formData.matafuego2_venc || ""}
                  onChange={(e) =>
                    handleChange("matafuego2_venc", e.target.value)
                  }
                  InputLabelProps={{ shrink: true }}
                />
              </TableCell>
              <TableCell sx={{ fontWeight: 500 }}>LUZ ALTA</TableCell>
              <TableCell align="center">
                <Checkbox
                  checked={formData.luz_alta_b || false}
                  onChange={(e) =>
                    handleCheckboxChange("luz_alta_b", e.target.checked)
                  }
                />
              </TableCell>
              <TableCell align="center">
                <Checkbox
                  checked={formData.luz_alta_m || false}
                  onChange={(e) =>
                    handleCheckboxChange("luz_alta_m", e.target.checked)
                  }
                />
              </TableCell>
              <TableCell>
                <TextField
                  size="small"
                  fullWidth
                  name="luz_alta_obs"
                  value={formData.luz_alta_obs || ""}
                  onChange={(e) => handleChange("luz_alta_obs", e.target.value)}
                />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx={{ fontWeight: 500 }}>BOTIQUIN</TableCell>
              <TableCell align="center">
                <Checkbox
                  checked={formData.botiquin_si || false}
                  onChange={(e) =>
                    handleCheckboxChange("botiquin_si", e.target.checked)
                  }
                />
              </TableCell>
              <TableCell align="center">
                <Checkbox
                  checked={formData.botiquin_no || false}
                  onChange={(e) =>
                    handleCheckboxChange("botiquin_no", e.target.checked)
                  }
                />
              </TableCell>
              <TableCell>
                <TextField
                  size="small"
                  fullWidth
                  name="botiquin_venc"
                  value={formData.botiquin_venc || ""}
                  onChange={(e) =>
                    handleChange("botiquin_venc", e.target.value)
                  }
                />
              </TableCell>
              <TableCell sx={{ fontWeight: 500 }}>ANTINIEBLA</TableCell>
              <TableCell align="center">
                <Checkbox
                  checked={formData.antiniebla_b || false}
                  onChange={(e) =>
                    handleCheckboxChange("antiniebla_b", e.target.checked)
                  }
                />
              </TableCell>
              <TableCell align="center">
                <Checkbox
                  checked={formData.antiniebla_m || false}
                  onChange={(e) =>
                    handleCheckboxChange("antiniebla_m", e.target.checked)
                  }
                />
              </TableCell>
              <TableCell>
                <TextField
                  size="small"
                  fullWidth
                  name="antiniebla_obs"
                  value={formData.antiniebla_obs || ""}
                  onChange={(e) =>
                    handleChange("antiniebla_obs", e.target.value)
                  }
                />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx={{ fontWeight: 500 }}>SEGURO</TableCell>
              <TableCell align="center">
                <Checkbox
                  checked={formData.seguro_si || false}
                  onChange={(e) =>
                    handleCheckboxChange("seguro_si", e.target.checked)
                  }
                />
              </TableCell>
              <TableCell align="center">
                <Checkbox
                  checked={formData.seguro_no || false}
                  onChange={(e) =>
                    handleCheckboxChange("seguro_no", e.target.checked)
                  }
                />
              </TableCell>
              <TableCell>
                <TextField
                  size="small"
                  fullWidth
                  name="seguro_venc"
                  value={formData.seguro_venc || ""}
                  onChange={(e) => handleChange("seguro_venc", e.target.value)}
                />
              </TableCell>
              <TableCell sx={{ fontWeight: 500 }}>LUZ RETROCESO</TableCell>
              <TableCell align="center">
                <Checkbox
                  checked={formData.luz_retro_b || false}
                  onChange={(e) =>
                    handleCheckboxChange("luz_retro_b", e.target.checked)
                  }
                />
              </TableCell>
              <TableCell align="center">
                <Checkbox
                  checked={formData.luz_retro_m || false}
                  onChange={(e) =>
                    handleCheckboxChange("luz_retro_m", e.target.checked)
                  }
                />
              </TableCell>
              <TableCell>
                <TextField
                  size="small"
                  fullWidth
                  name="luz_retro_obs"
                  value={formData.luz_retro_obs || ""}
                  onChange={(e) =>
                    handleChange("luz_retro_obs", e.target.value)
                  }
                />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx={{ fontWeight: 500 }}>
                TARJETA COMBUSTIBLE
              </TableCell>
              <TableCell align="center">
                <Checkbox
                  checked={formData.tarjeta_si || false}
                  onChange={(e) =>
                    handleCheckboxChange("tarjeta_si", e.target.checked)
                  }
                />
              </TableCell>
              <TableCell align="center">
                <Checkbox
                  checked={formData.tarjeta_no || false}
                  onChange={(e) =>
                    handleCheckboxChange("tarjeta_no", e.target.checked)
                  }
                />
              </TableCell>
              <TableCell>
                <TextField
                  size="small"
                  fullWidth
                  name="tarjeta_venc"
                  value={formData.tarjeta_venc || ""}
                  onChange={(e) => handleChange("tarjeta_venc", e.target.value)}
                  placeholder="TICKET + CARD"
                />
              </TableCell>
              <TableCell sx={{ fontWeight: 500 }}>LUZ STOP</TableCell>
              <TableCell align="center">
                <Checkbox
                  checked={formData.luz_stop_b || false}
                  onChange={(e) =>
                    handleCheckboxChange("luz_stop_b", e.target.checked)
                  }
                />
              </TableCell>
              <TableCell align="center">
                <Checkbox
                  checked={formData.luz_stop_m || false}
                  onChange={(e) =>
                    handleCheckboxChange("luz_stop_m", e.target.checked)
                  }
                />
              </TableCell>
              <TableCell>
                <TextField
                  size="small"
                  fullWidth
                  name="luz_stop_obs"
                  value={formData.luz_stop_obs || ""}
                  onChange={(e) => handleChange("luz_stop_obs", e.target.value)}
                />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx={{ fontWeight: 500 }}>LLAVE DE RUEDA</TableCell>
              <TableCell align="center">
                <Checkbox
                  checked={formData.llave_si || false}
                  onChange={(e) =>
                    handleCheckboxChange("llave_si", e.target.checked)
                  }
                />
              </TableCell>
              <TableCell align="center">
                <Checkbox
                  checked={formData.llave_no || false}
                  onChange={(e) =>
                    handleCheckboxChange("llave_no", e.target.checked)
                  }
                />
              </TableCell>
              <TableCell>
                <TextField
                  size="small"
                  fullWidth
                  name="llave_venc"
                  value={formData.llave_venc || ""}
                  onChange={(e) => handleChange("llave_venc", e.target.value)}
                />
              </TableCell>
              <TableCell sx={{ fontWeight: 500 }}>LUZ POSICIÓN</TableCell>
              <TableCell align="center">
                <Checkbox
                  checked={formData.luz_pos_b || false}
                  onChange={(e) =>
                    handleCheckboxChange("luz_pos_b", e.target.checked)
                  }
                />
              </TableCell>
              <TableCell align="center">
                <Checkbox
                  checked={formData.luz_pos_m || false}
                  onChange={(e) =>
                    handleCheckboxChange("luz_pos_m", e.target.checked)
                  }
                />
              </TableCell>
              <TableCell>
                <TextField
                  size="small"
                  fullWidth
                  name="luz_pos_obs"
                  value={formData.luz_pos_obs || ""}
                  onChange={(e) => handleChange("luz_pos_obs", e.target.value)}
                />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx={{ fontWeight: 500 }}>CRICKEY / GATO</TableCell>
              <TableCell align="center">
                <Checkbox
                  checked={formData.crickey_si || false}
                  onChange={(e) =>
                    handleCheckboxChange("crickey_si", e.target.checked)
                  }
                />
              </TableCell>
              <TableCell align="center">
                <Checkbox
                  checked={formData.crickey_no || false}
                  onChange={(e) =>
                    handleCheckboxChange("crickey_no", e.target.checked)
                  }
                />
              </TableCell>
              <TableCell>
                <TextField
                  size="small"
                  fullWidth
                  name="crickey_venc"
                  value={formData.crickey_venc || ""}
                  onChange={(e) => handleChange("crickey_venc", e.target.value)}
                />
              </TableCell>
              <TableCell colSpan={4} sx={{ fontWeight: 500 }}>
                OBSERVACIONES:
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx={{ fontWeight: 500 }}>CUARTA DE REMOLQUE</TableCell>
              <TableCell align="center">
                <Checkbox
                  checked={formData.cuarta_si || false}
                  onChange={(e) =>
                    handleCheckboxChange("cuarta_si", e.target.checked)
                  }
                />
              </TableCell>
              <TableCell align="center">
                <Checkbox
                  checked={formData.cuarta_no || false}
                  onChange={(e) =>
                    handleCheckboxChange("cuarta_no", e.target.checked)
                  }
                />
              </TableCell>
              <TableCell>
                <TextField
                  size="small"
                  fullWidth
                  name="cuarta_venc"
                  value={formData.cuarta_venc || ""}
                  onChange={(e) => handleChange("cuarta_venc", e.target.value)}
                />
              </TableCell>
              <TableCell colSpan={4} rowSpan={5}>
                <TextareaAutosize
                  minRows={5}
                  style={{
                    width: "100%",
                    padding: "8px",
                    border: "1px solid #ccc",
                    borderRadius: "4px",
                  }}
                  name="observaciones_luces"
                  value={formData.observaciones_luces || ""}
                  onChange={(e) =>
                    handleChange("observaciones_luces", e.target.value)
                  }
                />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx={{ fontWeight: 500 }}>BALIZAS</TableCell>
              <TableCell align="center">
                <Checkbox
                  checked={formData.balizas_si || false}
                  onChange={(e) =>
                    handleCheckboxChange("balizas_si", e.target.checked)
                  }
                />
              </TableCell>
              <TableCell align="center">
                <Checkbox
                  checked={formData.balizas_no || false}
                  onChange={(e) =>
                    handleCheckboxChange("balizas_no", e.target.checked)
                  }
                />
              </TableCell>
              <TableCell>
                <TextField
                  size="small"
                  fullWidth
                  name="balizas_venc"
                  value={formData.balizas_venc || ""}
                  onChange={(e) => handleChange("balizas_venc", e.target.value)}
                />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx={{ fontWeight: 500 }}>CHALECO PATENTE</TableCell>
              <TableCell align="center">
                <Checkbox
                  checked={formData.chaleco_si || false}
                  onChange={(e) =>
                    handleCheckboxChange("chaleco_si", e.target.checked)
                  }
                />
              </TableCell>
              <TableCell align="center">
                <Checkbox
                  checked={formData.chaleco_no || false}
                  onChange={(e) =>
                    handleCheckboxChange("chaleco_no", e.target.checked)
                  }
                />
              </TableCell>
              <TableCell>
                <TextField
                  size="small"
                  fullWidth
                  name="chaleco_venc"
                  value={formData.chaleco_venc || ""}
                  onChange={(e) => handleChange("chaleco_venc", e.target.value)}
                />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx={{ fontWeight: 500 }}>
                CERTIFICADO HABILITACION TECNICA (SOLO HIDROS)
              </TableCell>
              <TableCell align="center">
                <Checkbox
                  checked={formData.cert_si || false}
                  onChange={(e) =>
                    handleCheckboxChange("cert_si", e.target.checked)
                  }
                />
              </TableCell>
              <TableCell align="center">
                <Checkbox
                  checked={formData.cert_no || false}
                  onChange={(e) =>
                    handleCheckboxChange("cert_no", e.target.checked)
                  }
                />
              </TableCell>
              <TableCell>
                <TextField
                  type="date"
                  size="small"
                  fullWidth
                  name="cert_venc"
                  value={formData.cert_venc || ""}
                  onChange={(e) => handleChange("cert_venc", e.target.value)}
                  InputLabelProps={{ shrink: true }}
                />
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

