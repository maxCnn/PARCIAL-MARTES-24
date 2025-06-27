//src/components/ConfirmarDialogo.jsx
import React from "react";

const ConfirmarDialogo = ({ mensaje, onConfirmar, onCancelar }) => (
    <div className="modal show fade" tabIndex="-1" style={{ display: "block", background: "rgba(0,0,0,0.4)" }}>
        <div className="modal-dialog">
            <div className="modal-content">
                <div className="modal-header"><h5 className="modal-title">Confirmar</h5></div>
                <div className="modal-body">
                    <p>{mensaje}</p>
                </div>
                <div className="modal-footer">
                    <button className="btn btn-danger" onClick={onConfirmar}>Eliminar</button>
                    <button className="btn btn-secondary" onClick={onCancelar}>Cancelar</button>
                </div>
            </div>
        </div>
    </div>
);

export default ConfirmarDialogo;