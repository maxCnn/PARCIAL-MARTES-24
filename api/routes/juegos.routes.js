//api/routes/juegos.routes.js
import { Router } from "express";
import juegoService from "../services/juegoService.js";

const router = Router();

router.get("/", async (req, res) => {
    try {
        const juegos = await juegoService.obtenerTodos();
        res.json(juegos);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.get("/:id", async (req, res) => {
    try {
        const juego = await juegoService.obtenerPorId(parseInt(req.params.id));
        if (!juego) return res.status(404).json({ error: "Juego no encontrado." });
        res.json(juego);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

export default router;