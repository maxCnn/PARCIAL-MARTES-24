//api/repositories/partidaRepository.js
import RepositorioBase from "./repositorioBase.js";
import Partida from "../models/partida.js";
import Juego from "../models/juego.js";
import { Op } from "sequelize";

class PartidaRepository extends RepositorioBase {
    constructor() {
        super(Partida);
    }

    async obtenerPorId(id) {
        return this.modelo.findByPk(id, {
            include: {
                model: Juego,
                as: "juego"
            }
        });
    }

    async obtenerFiltrado( filtros  = {}) {
        const condiciones = [];

        if (filtros.idJuego) {
            condiciones.push({ idJuego: filtros.idJuego });
        }

        if (filtros.hasta) {
            condiciones.push({ fecha: { [Op.lte]: filtros.hasta } });
        }

        return this.modelo.findAll({
            where: condiciones.length > 0 ? { [Op.and]: condiciones } : {},
            include: { model: Juego, as: "juego" },
            order: [["fecha", "DESC"], ["id", "DESC"]],
            limit: 25 // regla de negocio fija, no modificable por el frontend
        });
    }

    async obtenerUltimas(limit = 10) {
        return this.modelo.findAll({
            include: { model: Juego, as: "juego" },
            order: [["fecha", "DESC"], ["id", "DESC"]],
            limit
        });
    }
}

export default new PartidaRepository();