// api/app.js
import express from 'express';
import sequelize from './db.js';
import partidasRouter from './routes/partidas.routes.js';
import juegosRouter from './routes/juegos.routes.js';
import logger from './middlewares/logger.js';
import cors from 'cors';

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(logger);
app.use(cors());
// Ruta principal de servidor
app.get("/", (req, res) => {
  res.send(`
    <html>
      <head>
        <title>Servidor Express</title>
        <style>
          body { background-color: #f2f2f2; font-family: Arial, sans-serif; display: flex; justify-content: center; align-items: center; height: 100vh; }
          .container { background: #fff; padding: 2rem; border-radius: 12px; box-shadow: 0 0 12px rgba(0,0,0,0.1); text-align: center; }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>🚀 Servidor Express Activo</h1>
          <p>API corriendo en <strong>http://localhost:3000</strong></p>
        </div>
      </body>
    </html>
  `);
});

// Rutas principales
app.use("/api/partidas", partidasRouter);
app.use("/api/juegos", juegosRouter);

// 404
app.use((req, res) => {
  res.status(404).json({ error: "Ruta no encontrada" });
});

// Inicialización
(async function start() {
    try {
      await sequelize.authenticate();
      console.log("✅ Conexión a la base de datos establecida.");
    } catch (err) {
      console.error("❌ Error al conectar a la base de datos:", err);
      process.exit(1);
    }

    app.listen(PORT, () => {
        console.log(`Servidor iniciado y escuchando en el puerto ${PORT}`);
    });
})();