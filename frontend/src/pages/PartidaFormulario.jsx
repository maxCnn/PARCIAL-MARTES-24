import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import juegosService from "../services/juegos.service";
import partidasService from "../services/partidas.service";

const PartidaFormulario = () => {
    const { id } = useParams();

    const [juegos, setJuegos] = useState([]);
    const [loading, setLoading] = useState(true);

    const { register, handleSubmit, setValue, formState: { errors }, reset } = useForm();
    const navigate = useNavigate();
    
    useEffect(() => {
        // Cargar juegos y, si edita, cargar partida
        const fetchData = async () => {
            const juegosData = await juegosService.obtenerTodos();
            setJuegos(juegosData);
            if (id) {
                const partida = await partidasService.obtenerPorId(id);
                reset({
                    ganador: partida.ganador,
                    jugadores: partida.jugadores,
                    fecha: partida.fecha ? new Date(partida.fecha).toISOString().slice(0, 10) : "",
                    idJuego: partida.juego?.id || ""
                });
            }
            setLoading(false);
        };
        fetchData();
    }, [id, reset]);

    const onSubmit = async (data) => {
        data.jugadores = Number(data.jugadores);
        data.idJuego = Number(data.idJuego);
        if (id) {
            await partidasService.actualizar(id, data);
        } else {
            await partidasService.crear(data);
        }
        navigate("/partidas");
    };

    if (loading) return <div className="text-center my-5">Cargando...</div>;

    return (
        <div className="row justify-content-center">
            <div className="col-lg-6 col-md-8 col-12">
                <div className="card shadow-sm">
                    <div className="card-header bg-primary text-white">
                        <h4 className="mb-0">{id ? "Editar Partida" : "Nueva Partida"}</h4>
                    </div>
                    <form onSubmit={handleSubmit(onSubmit)} className="card-body">
                        <div className="mb-3">
                            <label className="form-label">Ganador:</label>
                            <input
                                {...register("ganador", { required: "Campo obligatorio" })}
                                className={`form-control ${errors.ganador ? "is-invalid" : ""}`}
                                autoFocus
                            />
                            {errors.ganador && <div className="invalid-feedback">{errors.ganador.message}</div>}
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Jugadores:</label>
                            <input
                                type="number"
                                {...register("jugadores", {
                                    required: "Campo obligatorio",
                                    min: { value: 2, message: "Mínimo 2 jugadores" }
                                })}
                                className={`form-control ${errors.jugadores ? "is-invalid" : ""}`}
                            />
                            {errors.jugadores && <div className="invalid-feedback">{errors.jugadores.message}</div>}
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Fecha:</label>
                            <input
                                type="date"
                                {...register("fecha", { required: "Campo obligatorio" })}
                                className={`form-control ${errors.fecha ? "is-invalid" : ""}`}
                            />
                            {errors.fecha && <div className="invalid-feedback">{errors.fecha.message}</div>}
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Juego:</label>
                            <select
                                {...register("idJuego", { required: "Seleccione un juego" })}
                                className={`form-select ${errors.idJuego ? "is-invalid" : ""}`}
                            >
                                <option value="">Seleccione</option>
                                {juegos.map(j => (
                                    <option key={j.id} value={j.id}>{j.nombre}</option>
                                ))}
                            </select>
                            {errors.idJuego && <div className="invalid-feedback">{errors.idJuego.message}</div>}
                        </div>
                        <div className="d-flex justify-content-between mt-4">
                            <button type="submit" className="btn btn-success px-4">
                                Guardar
                            </button>
                            <button type="button" className="btn btn-secondary px-4" onClick={() => navigate("/partidas")}>
                                Cancelar
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default PartidaFormulario;