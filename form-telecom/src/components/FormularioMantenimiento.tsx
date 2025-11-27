import React, { useState, useEffect } from "react";
import { Container, Box, Button, Paper } from "@mui/material";
import { InformacionGeneral } from "./InformacionGeneral";
import { DocumentacionSeguridad } from "./DocumentacionSeguridad";
import { Neumaticos } from "./Neumaticos";
import { NivelLiquidos } from "./NivelLiquidos";
import { Funcionamiento } from "./Funcionamiento";
import { EstadoGeneral } from "./EstadoGeneral";
import { Observaciones } from "./Observaciones";
import { Footer } from "./Footer";
import type { FormularioMantenimientoData } from "../entities/formData";

interface FormularioMantenimientoProps {
  initialData?: FormularioMantenimientoData | null;
  onDataChange?: (data: FormularioMantenimientoData) => void;
  readOnly?: boolean;
}

export const FormularioMantenimiento: React.FC<
  FormularioMantenimientoProps
> = ({ initialData, onDataChange, readOnly = false }) => {
  const [formData, setFormData] = useState<FormularioMantenimientoData | null>(
    initialData || null
  );

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const handleChange = (name: string, value: unknown) => {
    if (readOnly || !formData) return;

    const newData: FormularioMantenimientoData = {
      ...formData,
      [name]: value,
    } as FormularioMantenimientoData;
    setFormData(newData);
    if (onDataChange) {
      onDataChange(newData);
    }
  };

  const handleSubmit = () => {
    console.log("Datos del formulario:", formData);
    alert(
      "Formulario guardado exitosamente!\n\nEn producción, aquí se enviarían los datos al servidor."
    );
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
        <Box
          sx={{
            textAlign: "center",
            bgcolor: "#333",
            color: "white",
            p: 2,
            mb: 3,
            borderRadius: 1,
            fontWeight: "bold",
            fontSize: "18px",
          }}
        >
          PM PREVENTIVO Y ORDINARIO CADA 120 DÍAS
        </Box>

        <InformacionGeneral
          formData={formData || null}
          handleChange={handleChange}
        />
        <DocumentacionSeguridad
          documentacionSeguridad={
            (formData?.documentacion_seguridad as any) || null
          }
          handleChange={(docSeg) =>
            handleChange("documentacion_seguridad", docSeg)
          }
        />
        <Neumaticos
          neumaticos={(formData?.neumaticos as any) || null}
          handleChange={(neumaticos) => handleChange("neumaticos", neumaticos)}
        />
        <NivelLiquidos
          nivelLiquidos={(formData?.nivel_de_liquidos as any) || null}
          handleChange={(nivelLiquidos) =>
            handleChange("nivel_de_liquidos", nivelLiquidos)
          }
        />
        <Funcionamiento
          funcionamiento={(formData?.funcionamiento as any) || null}
          handleChange={(funcionamiento) =>
            handleChange("funcionamiento", funcionamiento)
          }
        />
        <EstadoGeneral
          estadoGeneral={(formData?.estado_general as any) || null}
          handleChange={(estadoGeneral) =>
            handleChange("estado_general", estadoGeneral)
          }
        />
        <Observaciones
          formData={formData || null}
          handleChange={handleChange}
        />
        <Footer formData={formData || null} handleChange={handleChange} />

        {!readOnly && (
          <Box
            sx={{
              mt: 3,
              display: "flex",
              gap: 2,
              flexDirection: { xs: "column", sm: "row" },
            }}
          >
            <Button
              variant="contained"
              color="success"
              fullWidth
              size="large"
              onClick={handleSubmit}
              sx={{ py: 1.5, fontSize: "16px", fontWeight: "bold" }}
            >
              GUARDAR FORMULARIO
            </Button>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              size="large"
              onClick={handlePrint}
              sx={{ py: 1.5, fontSize: "16px", fontWeight: "bold" }}
            >
              IMPRIMIR FORMULARIO
            </Button>
          </Box>
        )}
      </Paper>
    </Container>
  );
};
