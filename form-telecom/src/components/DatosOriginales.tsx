import React, { useMemo, useState } from "react";
import {
  Box,
  Typography,
  Tabs,
  Tab,
  Paper,
  Card,
  CardContent,
  Chip,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  List,
  ListItem,
  ListItemText,
  Badge,
  Divider,
  Grid,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import WarningIcon from "@mui/icons-material/Warning";
import ErrorIcon from "@mui/icons-material/Error";
import InfoIcon from "@mui/icons-material/Info";
import type { FormularioMantenimientoData } from "../entities/formData";

interface DatosOriginalesProps {
  jsonOriginal: unknown;
  formData: FormularioMantenimientoData | null;
  updatedAt?: string | null;
}

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`datos-tabpanel-${index}`}
      aria-labelledby={`datos-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 2 }}>{children}</Box>}
    </div>
  );
}

// Helper para obtener el estado de un campo
const getFieldStatus = (
  value: unknown,
  isRequired: boolean = false
): "ok" | "missing" | "review" | "na" => {
  if (value === null || value === undefined || value === "") {
    return isRequired ? "missing" : "na";
  }
  if (typeof value === "boolean" && !value) {
    return "review";
  }
  if (typeof value === "string" && value.toLowerCase() === "no posee") {
    return "na";
  }
  return "ok";
};

// Helper para obtener el badge según el estado
const getStatusBadge = (status: "ok" | "missing" | "review" | "na") => {
  switch (status) {
    case "ok":
      return (
        <Chip
          icon={<CheckCircleIcon />}
          label="OK"
          size="small"
          color="success"
          sx={{ height: 20, fontSize: "0.7rem" }}
        />
      );
    case "missing":
      return (
        <Chip
          icon={<ErrorIcon />}
          label="FALTA"
          size="small"
          color="error"
          sx={{ height: 20, fontSize: "0.7rem" }}
        />
      );
    case "review":
      return (
        <Chip
          icon={<WarningIcon />}
          label="REVISAR"
          size="small"
          color="warning"
          sx={{ height: 20, fontSize: "0.7rem" }}
        />
      );
    case "na":
      return (
        <Chip
          icon={<InfoIcon />}
          label="N/A"
          size="small"
          sx={{ height: 20, fontSize: "0.7rem", bgcolor: "#e0e0e0" }}
        />
      );
  }
};

export const DatosOriginales: React.FC<DatosOriginalesProps> = ({
  jsonOriginal,
  formData,
  updatedAt,
}) => {
  const [tabValue, setTabValue] = useState(0);

  // Analizar datos y calcular estadísticas
  const stats = useMemo(() => {
    if (!formData) {
      return {
        total: 0,
        completed: 0,
        missing: 0,
        review: 0,
        critical: [] as Array<{ section: string; field: string; path: string }>,
      };
    }

    const critical: Array<{ section: string; field: string; path: string }> =
      [];
    let total = 0;
    let completed = 0;
    let missing = 0;
    let review = 0;

    // Analizar campos principales
    const sections = [
      {
        name: "Información General",
        fields: [
          { key: "dominio", label: "Dominio", required: true },
          { key: "modelo_vehiculo", label: "Modelo Vehículo", required: true },
          { key: "km_actual", label: "KM Actual", required: true },
          { key: "combustible_tipo", label: "Combustible", required: false },
          { key: "fecha", label: "Fecha", required: true },
        ],
      },
      {
        name: "Neumáticos",
        fields: [
          { key: "neumaticos.medida", label: "Medida", required: true },
          {
            key: "neumaticos.delantera_izquierda.mm",
            label: "DD Izq - MM",
            required: false,
          },
          {
            key: "neumaticos.delantera_izquierda.dot",
            label: "DD Izq - DOT",
            required: false,
          },
          {
            key: "neumaticos.delantera_derecha.mm",
            label: "DD Der - MM",
            required: false,
          },
          {
            key: "neumaticos.delantera_derecha.dot",
            label: "DD Der - DOT",
            required: false,
          },
        ],
      },
      {
        name: "Documentación",
        fields: [
          {
            key: "documentacion_seguridad.cedula_verde",
            label: "Cédula Verde",
            required: true,
          },
          {
            key: "documentacion_seguridad.vtv_rto",
            label: "VTV/RTO",
            required: true,
          },
          {
            key: "documentacion_seguridad.matafuego_1kg",
            label: "Matafuego 1kg",
            required: true,
          },
        ],
      },
      {
        name: "Estado General",
        fields: [
          {
            key: "estado_general.cupula.estado",
            label: "Cúpula - Estado",
            required: false,
          },
          { key: "estado_general.puertas", label: "Puertas", required: false },
          {
            key: "estado_general.separador_de_carga",
            label: "Separador de Carga",
            required: false,
          },
        ],
      },
    ];

    sections.forEach((section) => {
      section.fields.forEach((field) => {
        total++;
        const keys = field.key.split(".");
        let value: unknown = formData;

        for (const key of keys) {
          if (value && typeof value === "object" && key in value) {
            value = (value as Record<string, unknown>)[key];
          } else {
            value = null;
            break;
          }
        }

        const status = getFieldStatus(value, field.required);

        if (status === "ok") {
          completed++;
        } else if (status === "missing") {
          missing++;
          if (field.required) {
            critical.push({
              section: section.name,
              field: field.label,
              path: field.key,
            });
          }
        } else if (status === "review") {
          review++;
        }
      });
    });

    return { total, completed, missing, review, critical };
  }, [formData]);

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  // Renderizar campo individual
  const renderField = (
    label: string,
    value: unknown,
    required: boolean = false
  ) => {
    const status = getFieldStatus(value, required);
    const displayValue =
      value === null || value === undefined || value === ""
        ? "--"
        : String(value);

    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          py: 1,
          borderBottom: "1px solid #f0f0f0",
        }}
      >
        <Typography variant="body2">
          <strong>{label}:</strong> {displayValue}
        </Typography>
        {getStatusBadge(status)}
      </Box>
    );
  };

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
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          aria-label="datos originales tabs"
        >
          <Tab label="Resumen" />
          <Tab label="Detalles" />
          <Tab
            label={
              <Badge badgeContent={stats.critical.length} color="error">
                Pendientes
              </Badge>
            }
          />
        </Tabs>
      </Box>

      {/* Tab Resumen */}
      <TabPanel value={tabValue} index={0}>
        <Grid container spacing={2}>
          {/* Card de Estadísticas */}
          <Grid item xs={12}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Estadísticas Generales
                </Typography>
                <Grid container spacing={2} sx={{ mt: 1 }}>
                  <Grid item xs={6} sm={3}>
                    <Box textAlign="center">
                      <Typography variant="h4" color="primary">
                        {stats.completed}/{stats.total}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        Campos Completados
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={6} sm={3}>
                    <Box textAlign="center">
                      <Typography variant="h4" color="error">
                        {stats.missing}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        Campos Faltantes
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={6} sm={3}>
                    <Box textAlign="center">
                      <Typography variant="h4" color="warning.main">
                        {stats.review}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        Requieren Revisión
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={6} sm={3}>
                    <Box textAlign="center">
                      <Typography variant="h4" color="error">
                        {stats.critical.length}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        Críticos Pendientes
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>
                {updatedAt && (
                  <Box sx={{ mt: 2, pt: 2, borderTop: "1px solid #e0e0e0" }}>
                    <Typography variant="caption" color="text.secondary">
                      Última actualización:{" "}
                      {new Date(updatedAt).toLocaleString("es-AR")}
                    </Typography>
                  </Box>
                )}
              </CardContent>
            </Card>
          </Grid>

          {/* Alertas Importantes */}
          {stats.critical.length > 0 && (
            <Grid item xs={12}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Alertas Importantes
                  </Typography>
                  <Box
                    sx={{ display: "flex", flexWrap: "wrap", gap: 1, mt: 1 }}
                  >
                    {stats.critical.slice(0, 5).map((item, idx) => (
                      <Chip
                        key={idx}
                        icon={<WarningIcon />}
                        label={`${item.section}: ${item.field}`}
                        color="warning"
                        size="small"
                      />
                    ))}
                    {stats.critical.length > 5 && (
                      <Chip
                        label={`+${stats.critical.length - 5} más`}
                        size="small"
                        variant="outlined"
                      />
                    )}
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          )}
        </Grid>
      </TabPanel>

      {/* Tab Detalles */}
      <TabPanel value={tabValue} index={1}>
        <Box sx={{ maxHeight: "calc(100vh - 300px)", overflow: "auto" }}>
          {formData && (
            <>
              {/* Información General */}
              <Accordion defaultExpanded>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography variant="subtitle1" fontWeight="bold">
                    INFORMACIÓN GENERAL
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  {renderField("Dominio", formData.dominio, true)}
                  {renderField(
                    "Modelo Vehículo",
                    formData.modelo_vehiculo,
                    true
                  )}
                  {renderField("KM Actual", formData.km_actual, true)}
                  {renderField("Combustible", formData.combustible_tipo)}
                  {renderField("Fecha", formData.fecha, true)}
                </AccordionDetails>
              </Accordion>

              {/* Neumáticos */}
              {formData.neumaticos && (
                <Accordion>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography variant="subtitle1" fontWeight="bold">
                      NEUMÁTICOS
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    {renderField(
                      "Medida",
                      (formData.neumaticos as any)?.medida,
                      true
                    )}
                    {renderField(
                      "Tuerca Seguridad",
                      (formData.neumaticos as any)?.tuerca_seguridad
                    )}
                    {/* Detalles de neumáticos */}
                    {["delantera_izquierda", "delantera_derecha"].map((pos) => {
                      const detalle = (formData.neumaticos as any)?.[pos];
                      return (
                        <Accordion key={pos} sx={{ mt: 1 }}>
                          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography variant="body2" fontWeight="bold">
                              {pos.replace("_", " ").toUpperCase()}
                            </Typography>
                          </AccordionSummary>
                          <AccordionDetails>
                            {renderField("Estado", detalle?.estado)}
                            {renderField("Marca", detalle?.marca)}
                            {renderField("MM", detalle?.mm)}
                            {renderField("DOT", detalle?.dot)}
                          </AccordionDetails>
                        </Accordion>
                      );
                    })}
                  </AccordionDetails>
                </Accordion>
              )}

              {/* Documentación Seguridad */}
              {formData.documentacion_seguridad && (
                <Accordion>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography variant="subtitle1" fontWeight="bold">
                      DOCUMENTACIÓN - SEGURIDAD
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    {renderField(
                      "Cédula Verde",
                      (formData.documentacion_seguridad as any)?.cedula_verde
                    )}
                    {renderField(
                      "VTV/RTO",
                      (formData.documentacion_seguridad as any)?.vtv_rto
                    )}
                    {renderField(
                      "Matafuego 1kg",
                      (formData.documentacion_seguridad as any)?.matafuego_1kg
                    )}
                    {renderField(
                      "Botiquín",
                      (formData.documentacion_seguridad as any)?.botiquin
                    )}
                  </AccordionDetails>
                </Accordion>
              )}

              {/* Nivel de Líquidos */}
              {formData.nivel_de_liquidos && (
                <Accordion>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography variant="subtitle1" fontWeight="bold">
                      NIVEL DE LÍQUIDOS
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    {renderField(
                      "Aceite Motor",
                      (formData.nivel_de_liquidos as any)?.aceite_motor
                    )}
                    {renderField(
                      "Aceite Caja",
                      (formData.nivel_de_liquidos as any)?.aceite_caja
                    )}
                    {renderField(
                      "Líquido Frenos",
                      (formData.nivel_de_liquidos as any)?.liquido_frenos
                    )}
                    {renderField(
                      "Posee Pérdida",
                      (formData.nivel_de_liquidos as any)?.posee_perdida
                    )}
                  </AccordionDetails>
                </Accordion>
              )}

              {/* Funcionamiento */}
              {formData.funcionamiento && (
                <Accordion>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography variant="subtitle1" fontWeight="bold">
                      FUNCIONAMIENTO
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    {renderField(
                      "Motor",
                      (formData.funcionamiento as any)?.motor
                    )}
                    {renderField(
                      "Frenos",
                      (formData.funcionamiento as any)?.frenos
                    )}
                    {renderField(
                      "Dirección",
                      (formData.funcionamiento as any)?.direccion
                    )}
                    {renderField(
                      "Aire Acondicionado",
                      (formData.funcionamiento as any)?.aire_acondicionado
                    )}
                  </AccordionDetails>
                </Accordion>
              )}

              {/* Estado General */}
              {formData.estado_general && (
                <Accordion>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography variant="subtitle1" fontWeight="bold">
                      ESTADO GENERAL
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    {renderField(
                      "Limpieza Interior",
                      (formData.estado_general as any)?.limpieza_interior
                    )}
                    {renderField(
                      "Limpieza Exterior",
                      (formData.estado_general as any)?.limpieza_exterior
                    )}
                    {renderField(
                      "Estado Pintura",
                      (formData.estado_general as any)?.estado_pintura
                    )}
                    {renderField(
                      "Cúpula",
                      (formData.estado_general as any)?.cupula
                    )}
                  </AccordionDetails>
                </Accordion>
              )}
            </>
          )}
        </Box>
      </TabPanel>

      {/* Tab Pendientes */}
      <TabPanel value={tabValue} index={2}>
        {stats.critical.length > 0 ? (
          <List>
            <Typography variant="h6" gutterBottom>
              Campos Críticos Pendientes ({stats.critical.length})
            </Typography>
            <Divider sx={{ mb: 2 }} />
            {stats.critical.map((item, idx) => (
              <ListItem key={idx} sx={{ borderBottom: "1px solid #f0f0f0" }}>
                <ListItemText
                  primary={item.field}
                  secondary={item.section}
                  primaryTypographyProps={{ fontWeight: 500 }}
                />
                <Chip
                  icon={<ErrorIcon />}
                  label="CRÍTICO"
                  size="small"
                  color="error"
                />
              </ListItem>
            ))}
          </List>
        ) : (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              py: 4,
            }}
          >
            <CheckCircleIcon
              sx={{ fontSize: 64, color: "success.main", mb: 2 }}
            />
            <Typography variant="h6" color="text.secondary">
              ¡Todos los campos críticos están completos!
            </Typography>
          </Box>
        )}
      </TabPanel>
    </Paper>
  );
};
