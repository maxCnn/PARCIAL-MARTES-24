//api/repositories/juegoRepository.js
import RepositorioBase from "./repositorioBase.js";
import Juego from "../models/juego.js";

class JuegoRepository extends RepositorioBase {
  constructor() {
    super(Juego);
  }

  async obtenerTodos() {
    return this.modelo.findAll({ order: [["nombre", "ASC"]] });
  }

  async obtenerPorId(id) {
    return this.modelo.findByPk(id);
  }
}

export default new JuegoRepository();