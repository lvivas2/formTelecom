import React, { useEffect, useState } from "react";
import {
  Container,
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Chip,
  CircularProgress,
  Alert,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { getRevisions, type Revision } from "../services/revisionService";
import { getStatusColor, getStatusLabel } from "../entities/status";
import { Header } from "../components/Header";

export const Revisions: React.FC = () => {
  const [revisions, setRevisions] = useState<Revision[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchRevisions();
  }, []);

  const fetchRevisions = async () => {
    try {
      setLoading(true);
      const data = await getRevisions();
      setRevisions(data);
    } catch (err: unknown) {
      console.error("Error fetching revisions:", err);
      const errorMessage =
        err instanceof Error ? err.message : "Error al cargar las revisiones";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString("es-AR");
  };

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
          <CircularProgress />
        </Box>
      </Container>
    );
  }

  return (
    <>
      <Header title="Revisiones de Formularios" />
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Box
          sx={{
            mb: 3,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography variant="h4" component="h1">
            Lista de Revisiones
          </Typography>
          <Button variant="outlined" onClick={() => navigate("/")}>
            Ver Formulario
          </Button>
        </Box>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: "bold" }}>ID</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Estado</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>
                  Fecha de Creación
                </TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {revisions.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} align="center">
                    <Typography color="text.secondary">
                      No hay revisiones disponibles
                    </Typography>
                  </TableCell>
                </TableRow>
              ) : (
                revisions.map((revision) => (
                  <TableRow key={revision.id}>
                    <TableCell>{revision.id}</TableCell>
                    <TableCell>
                      <Chip
                        label={getStatusLabel(revision.status)}
                        color={getStatusColor(revision.status)}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>{formatDate(revision.created_at)}</TableCell>
                    <TableCell>
                      <Button
                        variant="contained"
                        size="small"
                        onClick={() => navigate(`/revision/${revision.id}`)}
                      >
                        Ver Revisión
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </>
  );
};
