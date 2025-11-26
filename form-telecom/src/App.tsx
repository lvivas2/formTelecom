import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import { AuthProvider } from "./contexts/AuthContext";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { Login } from "./pages/Login";
import { Revisions } from "./pages/Revisions";
import { RevisionDetail } from "./pages/RevisionDetail";
import { FormularioMantenimiento } from "./components/FormularioMantenimiento";

const theme = createTheme({
  palette: {
    mode: "light",
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<FormularioMantenimiento />} />
            <Route
              path="/revisions"
              element={
                <ProtectedRoute>
                  <Revisions />
                </ProtectedRoute>
              }
            />
            <Route
              path="/revision/:id"
              element={
                <ProtectedRoute>
                  <RevisionDetail />
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
