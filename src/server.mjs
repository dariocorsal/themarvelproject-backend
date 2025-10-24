import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

// Obtener el directorio actual
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configurar dotenv
dotenv.config({ path: path.join(__dirname, "../.env") });

import express from "express";
import cors from "cors";
import connectDB from "./config/db.mjs";
import charactersRoutes from "./routes/characters.mjs";
import usersRoutes from "./routes/users.mjs";

const app = express();

app.use(cors());
app.use(express.json());

// Middleware para conectar a DB serverless
app.use(async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (error) {
    console.error("Error conectando a MongoDB:", error);
    res.status(500).json({
      error: "Error de conexión a base de datos",
    });
  }
});

// Rutas principales
app.get("/", (req, res) => {
  res.json({
    message: "Marvel API corriendo correctamente",
    version: "1.0.0",
    environment: "Vercel Serverless",
    endpoints: {
      characters: "/api/characters",
      users: "/api/users",
    },
  });
});

// Rutas de la API
app.use("/api", charactersRoutes);
app.use("/api", usersRoutes);

// Para desarrollo local
if (process.env.NODE_ENV !== "production") {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Servidor corriendo en puerto ${PORT}`);
  });
}

export default app;
