//api/services/partidaService.js
import partidaRepository from "../repositories/partidaRepository.js";
import juegoRepository from "../repositories/juegoRepository.js";

class PartidaService {
    async obtenerPorId(id) {
        return await partidaRepository.obtenerPorId(id);
    }

    async obtenerFiltrado(filtros = {}) {
        // Recibe los filtros como objeto y los pasa directo al repo
        return await partidaRepository.obtenerFiltrado(filtros);
    }

    async obtenerUltimas() {
        return await partidaRepository.obtenerUltimas();
    }

    async crear(datos) {
        await this.#validar(datos);
        return await partidaRepository.crear(datos);
    }

    async actualizar(id, datos) {
        await this.#validar(datos);
        return await partidaRepository.actualizar(id, datos);
    }

    async eliminar(id) {
        return await partidaRepository.eliminar(id);
    }

    // --- Validaciones ---
    async #validar(datos) {
        if (!datos.ganador || datos.ganador.trim() === "") {
            throw new Error("El nombre del ganador no puede estar vacío.");
        }
        if (!datos.jugadores || isNaN(datos.jugadores) || Number(datos.jugadores) < 2) {
            throw new Error("La cantidad de jugadores debe ser mayor o igual a 2.");
        }
        if (!datos.fecha || !/^\d{4}-\d{2}-\d{2}$/.test(datos.fecha)) {
            throw new Error("La fecha debe estar en formato YYYY-MM-DD.");
        }
        // Validar año, mes y día
        const [anio, mes, dia] = datos.fecha.split("-").map(Number);
        if (!Number.isInteger(anio) || !Number.isInteger(mes) || !Number.isInteger(dia)) {
            throw new Error("Año, mes y día deben ser números enteros.");
        }
        if (mes < 1 || mes > 12) {
            throw new Error("El mes debe estar entre 1 y 12.");
        }
        if (dia < 1 || dia > 31) {
            throw new Error("El día debe estar entre 1 y 31.");
        }
        // Validar existencia del juego
        const juego = await juegoRepository.obtenerPorId(datos.idJuego);
        if (!juego) {
            throw new Error(`No existe un juego con ID ${datos.idJuego}.`);
        }
    }
}

export default new PartidaService();