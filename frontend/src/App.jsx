//src/App.jsx
import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Encabezado from "./components/Encabezado";
import PiePagina from "./components/PiePagina";
import Partidas from "./pages/Partidas";
import PartidaFormulario from "./pages/PartidaFormulario"; // Nuevo: la página del form

function App() {
  return (
    <BrowserRouter>
      <Encabezado />
      <main className="container my-4">
        <Routes>
          <Route path="/partidas" element={<Partidas />} />
          <Route path="/partidas/nueva" element={<PartidaFormulario />} />
          <Route path="/partidas/editar/:id" element={<PartidaFormulario />} />
          <Route path="/" element={<Navigate to="/partidas" />} />
        </Routes>
      </main>
      <PiePagina />
    </BrowserRouter>
  );
}

export default App;