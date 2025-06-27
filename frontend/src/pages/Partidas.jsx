//SRC: frontend/src/pages/Partidas.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import partidasService from "../services/partidas.service";
import juegosService from "../services/juegos.service";
import PartidasLista from "../components/PartidasLista";
import FiltroPartidas from "../components/FiltroPartidas";
import ConfirmarDialogo from "../components/ConfirmarDialogo";

const Partidas = () => {
    const [partidas, setPartidas] = useState([]);
    const [juegos, setJuegos] = useState([]);
    const [filtros, setFiltros] = useState({ idJuego: "", hasta: "" });
    const [confirmarEliminacion, setConfirmarEliminacion] = useState(null);
    const navigate = useNavigate();

    // Carga inicial
    useEffect(() => {
        juegosService.obtenerTodos().then(setJuegos);
        partidasService.obtenerUltimas().then(setPartidas);
    }, []);

    // Filtrado
    const buscarFiltradas = async (filtrosAplicados) => {
        setFiltros(filtrosAplicados);
        const data = await partidasService.obtenerFiltradas(filtrosAplicados);
        setPartidas(data);
    };

    const onEditar = (partida) => {
        navigate(`/partidas/editar/${partida.id}`);
    };

    const onEliminar = (partida) => {
        setConfirmarEliminacion(partida);
    };

    const confirmarEliminar = async () => {
        await partidasService.eliminar(confirmarEliminacion.id);
        setConfirmarEliminacion(null);
        buscarFiltradas(filtros);
    };

    return (
        <main className="container my-4">
            <div className="d-flex flex-column flex-md-row align-items-center justify-content-between mb-4">
                <h2 className="mb-3 mb-md-0">Listado de Partidas</h2>
                <button className="btn btn-success" onClick={() => navigate("/partidas/nueva")}>
                    Nueva Partida
                </button>
            </div>
            <FiltroPartidas juegos={juegos} onBuscar={buscarFiltradas} />
            <PartidasLista
                partidas={partidas}
                onEditar={onEditar}
                onEliminar={onEliminar}
            />
            {confirmarEliminacion && (
                <ConfirmarDialogo
                    mensaje={`¿Seguro que desea eliminar la partida de "${confirmarEliminacion.juego?.nombre}" del día ${confirmarEliminacion.fecha}?`}
                    onConfirmar={confirmarEliminar}
                    onCancelar={() => setConfirmarEliminacion(null)}
                />
            )}
        </main>
    );
};

export default Partidas;