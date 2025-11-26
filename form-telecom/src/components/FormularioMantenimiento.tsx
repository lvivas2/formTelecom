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

interface FormularioMantenimientoProps {
  initialData?: any;
  onDataChange?: (data: any) => void;
  readOnly?: boolean;
}

export const FormularioMantenimiento: React.FC<
  FormularioMantenimientoProps
> = ({ initialData, onDataChange, readOnly = false }) => {
  const [formData, setFormData] = useState<any>(initialData || {});

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const handleChange = (name: string, value: any) => {
    if (readOnly) return;

    const newData = {
      ...formData,
      [name]: value,
    };
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

        <InformacionGeneral formData={formData} handleChange={handleChange} />
        <DocumentacionSeguridad
          formData={formData}
          handleChange={handleChange}
        />
        <Neumaticos formData={formData} handleChange={handleChange} />
        <NivelLiquidos formData={formData} handleChange={handleChange} />
        <Funcionamiento formData={formData} handleChange={handleChange} />
        <EstadoGeneral formData={formData} handleChange={handleChange} />
        <Observaciones formData={formData} handleChange={handleChange} />
        <Footer formData={formData} handleChange={handleChange} />

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
