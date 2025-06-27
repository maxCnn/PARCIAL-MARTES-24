//src/components/JuegoPopup.jsx
import React, { useRef, useEffect } from "react";
import defaultCover from "../assets/default-cover.jpg";

// Popup modal Bootstrap simple
const JuegoPopup = ({ juego, onClose }) => {
    const ref = useRef();

    useEffect(() => {
        const handle = (e) => {
            if (e.target === ref.current) onClose();
        };
        window.addEventListener("click", handle);
        return () => window.removeEventListener("click", handle);
    }, [onClose]);

    return (
        <div className="modal show fade" tabIndex="-1" style={{ display: "block", background: "rgba(0,0,0,0.4)" }} ref={ref}>
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">{juego.nombre}</h5>
                        <button type="button" className="btn-close" onClick={onClose}></button>
                    </div>
                    <div className="modal-body text-center">
                        <img
                            src={juego.imagen || defaultCover}
                            alt={juego.nombre}
                            className="img-fluid mb-3"
                            onError={e => { e.target.onerror = null; e.target.src = defaultCover; }}
                            style={{ maxHeight: 200 }}
                        />
                        <div className="mb-2"><strong>Descripción:</strong> {juego.descripcion || "Sin descripción."}</div>
                        <div className="mb-2"><strong>Duración:</strong> {juego.duracion ? `${juego.duracion} min.` : "No informada."}</div>
                        <div className="mb-2"><strong>Edad mínima:</strong> {juego.edadMinima || "No informada."}</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default JuegoPopup;