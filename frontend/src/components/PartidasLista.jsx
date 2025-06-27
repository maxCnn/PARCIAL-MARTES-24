import React, { useState } from "react";
import JuegoPopup from "./JuegoPopup";

const PartidasLista = ({ partidas, onEditar, onEliminar }) => {
    const [juegoPopup, setJuegoPopup] = useState(null);

    return (
        <div className="table-responsive">
            <table className="table table-hover table-bordered align-middle bg-white shadow-sm">
                <thead className="table-primary">
                    <tr>
                        <th>Juego</th>
                        <th>Ganador</th>
                        <th>Jugadores</th>
                        <th>Fecha</th>
                        <th style={{ minWidth: 120 }}>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {partidas.length === 0 ? (
                        <tr>
                            <td colSpan={5} className="text-center text-secondary py-4">
                                No hay partidas cargadas.
                            </td>
                        </tr>
                    ) : (
                        partidas.map(partida => (
                            <tr key={partida.id}>
                                <td>
                                    <button
                                        type="button"
                                        className="btn btn-link p-0"
                                        onClick={() => setJuegoPopup(partida.juego)}
                                    >
                                        {partida.juego?.nombre}
                                    </button>
                                </td>
                                <td>{partida.ganador}</td>
                                <td>{partida.jugadores}</td>
                                <td>{new Date(partida.fecha).toLocaleDateString()}</td>
                                <td className="text-nowrap">
                                    <button
                                        className="btn btn-sm btn-outline-primary me-2"
                                        onClick={() => onEditar(partida)}
                                    >
                                        Editar
                                    </button>
                                    <button
                                        className="btn btn-sm btn-outline-danger"
                                        onClick={() => onEliminar(partida)}
                                    >
                                        Eliminar
                                    </button>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
            {juegoPopup && (
                <JuegoPopup
                    juego={juegoPopup}
                    onClose={() => setJuegoPopup(null)}
                />
            )}
        </div>
    );
};

export default PartidasLista;