import { NavLink } from "react-router-dom";
import "./Encabezado.css";

export default function Encabezado() {
    return (
        <header className="py-4 mb-4 shadow-sm"
            style={{ backgroundColor: "darkgray", color: "#f8f9fa" }}
        >
            <div className="container">
                <div className="d-flex flex-column flex-md-row align-items-center justify-content-between">
                    <div>
                        <h1 className="display-6 fw-bold mb-1" style={{ letterSpacing: "1px" }}>
                            🎲 Gestor de Partidas de Juegos de Mesa
                        </h1>
                        <div className="usuario-pill mt-2">
                            <i className="bi bi-person-circle"></i>
                            <span className="ms-2">Nombre Apellido</span>
                        </div>
                    </div>
                    <nav className="mt-3 mt-md-0">
                        <ul className="nav nav-pills gap-2">
                            <li className="nav-item">
                                <NavLink to="/partidas" className="nav-link" activeclassname="active">
                                    Partidas
                                </NavLink>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        </header>
    );
}