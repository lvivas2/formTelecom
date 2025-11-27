import React from "react";
import { Checkbox, Typography, Box, Paper } from "@mui/material";
import type { FormularioMantenimientoData } from "../entities/formData";

interface EstadoGeneralProps {
  formData: FormularioMantenimientoData | null;
  handleChange: (name: string, value: unknown) => void;
}

export const EstadoGeneral: React.FC<EstadoGeneralProps> = ({
  formData,
  handleChange,
}) => {
  const handleCheckboxChange = (name: string, checked: boolean) => {
    handleChange(name, checked);
  };

  const items = [
    { name: "limp_int", label: "LIMPIEZA INTERIOR" },
    { name: "limp_ext", label: "LIMPIEZA EXTERIOR" },
    { name: "opticas_del", label: "ÓPTICAS DELANTERAS" },
    { name: "faros_tras", label: "FAROS TRASEROS" },
    { name: "espejos", label: "ESPEJOS" },
    { name: "parabrisas", label: "PARABRISAS" },
    { name: "luneta", label: "LUNETA" },
    { name: "vidrios_lat", label: "VIDRIOS LATERALES" },
    { name: "paragolpes", label: "ESTADO PARAGOLPES" },
    { name: "pintura", label: "ESTADO PINTURA" },
    { name: "parag_tras", label: "PARAGOLPE TRASERO" },
    { name: "porta_caj", label: "PORTA CAJUELA" },
    { name: "portezuela", label: "PORTEZUELA" },
    { name: "barias", label: "BARIAS REFLECTIVAS" },
    { name: "ficha", label: "FICHA ENGANCHE" },
    { name: "separador", label: "SEPARADOR DE CARGA" },
    { name: "techo", label: "TECHO ENGANCHE" },
    { name: "tapizados", label: "TAPIZADOS" },
    { name: "alfombras", label: "ALFOMBRAS" },
    { name: "cinturones", label: "CINTURONES DE SEGURIDAD" },
    {
      name: "equip_hidra",
      label: "TIENE EQUIPAMIENTO HIDRÁULICO",
      special: "si_no",
    },
    { name: "estado_equip", label: "ESTADO EQUIPAMIENTO" },
    { name: "cupula", label: "TIENE CUPULA", special: "si_no" },
    { name: "estado_cupula", label: "ESTADO CUPULA" },
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
        ESTADO GENERAL
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
              {item.special === "si_no" ? (
                <>
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
                      checked={formData[`${item.name}_si`] || false}
                      onChange={(e) =>
                        handleCheckboxChange(
                          `${item.name}_si`,
                          e.target.checked
                        )
                      }
                    />
                  </Box>
                  <Box
                    sx={{
                      p: 1,
                      display: "flex",
                      alignItems: "center",
                      borderRight: "1px solid #333",
                      borderBottom:
                        index < items.length - 1 ? "1px solid #333" : "none",
                      minHeight: "48px",
                    }}
                  >
                    <Checkbox
                      checked={formData[`${item.name}_no`] || false}
                      onChange={(e) =>
                        handleCheckboxChange(
                          `${item.name}_no`,
                          e.target.checked
                        )
                      }
                    />
                    <Typography variant="caption" sx={{ ml: 0.5 }}>
                      NO
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      p: 1,
                      borderBottom:
                        index < items.length - 1 ? "1px solid #333" : "none",
                      minHeight: "48px",
                    }}
                  />
                </>
              ) : (
                <>
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
                  </Box>
                </>
              )}
            </React.Fragment>
          ))}
        </Box>
      </Paper>
    </Box>
  );
};
