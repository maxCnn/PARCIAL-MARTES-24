import { Router } from "express";
import partidaService from "../services/partidaService.js";

const router = Router();

// Listado filtrado
router.get("/", async (req, res) => {
    try {
        const filtros = {}
        if (req.query.idJuego) filtros.idJuego = parseInt(req.query.idJuego);
        if (req.query.hasta) filtros.hasta = req.query.hasta;
        
        const partidas = await partidaService.obtenerFiltrado(filtros);
        res.json(partidas)


    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Ultimas 10 cargadas (inicio)
router.get("/ultimas", async (req, res) => {
    try {
        const ultimas = await partidaService.obtenerUltimas();
        res.json(ultimas);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Obtener por id
router.get("/:id", async (req, res) => {
    try {
        const partida = await partidaService.obtenerPorId(parseInt(req.params.id));
        if (!partida) return res.status(404).json({ error: "Partida no encontrada." });
        res.json(partida);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Crear
router.post("/", async (req, res) => {
    try {
        const creada = await partidaService.crear(req.body);
        res.status(201).json(creada);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Actualizar
router.put("/:id", async (req, res) => {
    try {
        const actualizada = await partidaService.actualizar(parseInt(req.params.id), req.body);
        res.json(actualizada);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Eliminar
router.delete("/:id", async (req, res) => {
    try {
        await partidaService.eliminar(parseInt(req.params.id));
        res.status(204).end();
    } catch (err) {
        res.status(404).json({ error: err.message });
    }
});

export default router;