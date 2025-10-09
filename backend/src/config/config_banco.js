import mongoose from "mongose";
import { config } from "dotenv";
config();

export async function connectBD() {
  const ur = process.env.MONGODB_URI;
  if (!ur) {
    console.error("ERROR Mongo_URI não identificada no .env");
    process.exit(1);
  }
  try {
    mongoose.set("strictQuery", true);
    await mongoose.connect(ur, { bdName: undefined }); //definir nome mais tarde
    console.log(" SUCESSO Conectado ao MongoDB:", ur);
  } catch (err) {
    console.error("ERRO Falha ao tentar conectar ao MongoDB:", err.message);
    process.exit(1);
  }
}
