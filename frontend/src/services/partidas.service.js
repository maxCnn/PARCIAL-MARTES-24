//src/services/partidas.service.js
import axios from "./axios.config.js";

const obtenerUltimas = async () => {
    const response = await axios.get("/partidas/ultimas");
    return response.data;
};

const obtenerFiltradas = async (filtros) => {
    const params = new URLSearchParams(filtros).toString();
    const response = await axios.get(`/partidas?${params}`);
    return response.data;
};

const obtenerPorId = async (id) => {
    const response = await axios.get(`/partidas/${id}`);
    return response.data;
};

const crear = async (partida) => {
    const response = await axios.post("/partidas", partida);
    return response.data;
};

const actualizar = async (id, partida) => {
    const response = await axios.put(`/partidas/${id}`, partida);
    return response.data;
};

const eliminar = async (id) => {
    await axios.delete(`/partidas/${id}`);
};

export default {
    obtenerUltimas,
    obtenerFiltradas,
    obtenerPorId,
    crear,
    actualizar,
    eliminar
};