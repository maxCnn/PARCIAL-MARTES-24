import React, { useState } from "react";

const FiltroPartidas = ({ juegos, onBuscar, onLimpiar }) => {
    const [idJuego, setIdJuego] = useState("");
    const [hasta, setHasta] = useState("");

    const submit = (e) => {
        e.preventDefault();
        onBuscar({ idJuego, hasta });
    };

    const limpiar = () => {
        setIdJuego("");
        setHasta("");
        onLimpiar();
    };

    return (
        <form className="row g-3 align-items-end mb-4" onSubmit={submit}>
            <div className="col-md-5">
                <label className="form-label">Juego:</label>
                <select className="form-select" value={idJuego} onChange={e => setIdJuego(e.target.value)}>
                    <option value="">Todos</option>
                    {juegos.map(j => (
                        <option key={j.id} value={j.id}>{j.nombre}</option>
                    ))}
                </select>
            </div>
            <div className="col-md-4">
                <label className="form-label">Hasta fecha:</label>
                <input type="date" className="form-control" value={hasta} onChange={e => setHasta(e.target.value)} />
            </div>
            <div className="col-md-3 d-flex gap-2">
                <button type="submit" className="btn btn-primary">Filtrar</button>
                <button type="button" className="btn btn-secondary" onClick={limpiar}>Limpiar</button>
            </div>
        </form>
    );
};

export default FiltroPartidas;