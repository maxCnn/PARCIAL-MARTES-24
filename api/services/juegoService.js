//api/services/juegoService.js
import juegoRepository from "../repositories/juegoRepository.js";

class JuegoService {
    async obtenerTodos() {
        return await juegoRepository.obtenerTodos();
    }

    async obtenerPorId(id) {
        return await juegoRepository.obtenerPorId(id);
    }
}

export default new JuegoService();