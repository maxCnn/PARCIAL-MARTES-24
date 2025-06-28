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
    const [partidaAEliminar, setPartidaAEliminar] = useState(null);
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
        setPartidaAEliminar(partida);
    };

    const confirmarEliminar = async () => {
        await partidasService.eliminar(partidaAEliminar.id);
        setPartidaAEliminar(null);

        // Comprobar si los filtros están vacíos
        if (!filtros.idJuego && !filtros.hasta) {
            // Sin filtros: cargar las partidas más recientes
            const data = await partidasService.obtenerUltimas();
            setPartidas(data);
        } else {
            // Con filtros: buscar partidas filtradas
            buscarFiltradas(filtros);
        }
    };

    const limpiarFiltros = async () => {
        setFiltros({ idJuego: "", hasta: "" });
        const data = await partidasService.obtenerUltimas();
        setPartidas(data);
    };

    return (
        <main className="container my-4">
            <div className="d-flex flex-column flex-md-row align-items-center justify-content-between mb-4">
                <h2 className="mb-3 mb-md-0">Listado de Partidas</h2>
                <button className="btn btn-success" onClick={() => navigate("/partidas/nueva")}>
                    Nueva Partida
                </button>
            </div>
            <FiltroPartidas juegos={juegos} onBuscar={buscarFiltradas} onLimpiar={limpiarFiltros} />
            <PartidasLista
                partidas={partidas}
                onEditar={onEditar}
                onEliminar={onEliminar}
            />
            {partidaAEliminar && (
                <ConfirmarDialogo
                    mensaje={`¿Seguro que desea eliminar la partida de "${partidaAEliminar.juego?.nombre}" del día ${partidaAEliminar.fecha}?`}
                    onConfirmar={confirmarEliminar}
                    onCancelar={() => setPartidaAEliminar(null)}
                />
            )}
        </main>
    );
};

export default Partidas;