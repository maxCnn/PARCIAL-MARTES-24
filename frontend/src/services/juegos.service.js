//src/services/juegos.service.js
import axios from "./axios.config.js";

const obtenerTodos = async () => {
    const response = await axios.get("/juegos");
    return response.data;
};

const obtenerPorId = async (id) => {
    const response = await axios.get(`/juegos/${id}`);
    return response.data;
};

export default {
    obtenerTodos,
    obtenerPorId,
};