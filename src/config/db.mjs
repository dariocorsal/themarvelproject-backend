import mongoose from "mongoose";

// Cache de conexión para reutilizar en funciones serverless
let cachedConnection = null;

const connectDB = async () => {
  // Verificar si ya existe una conexión
  if (cachedConnection && mongoose.connection.readyState === 1) {
    console.log("Usando conexión existente a MongoDB");
    return cachedConnection;
  }

  try {
    // Configuración optimizada para serverless
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 5000, // Timeout más corto
      socketTimeoutMS: 45000,
      maxPoolSize: 10, // Pool más pequeño para serverless
    });

    cachedConnection = conn;
    console.log("Nueva conexión a MongoDB establecida");
    return conn;
  } catch (error) {
    console.error("Error al conectar a MongoDB:", error.message);
    cachedConnection = null;
    throw error;
  }
};

export default connectDB;
