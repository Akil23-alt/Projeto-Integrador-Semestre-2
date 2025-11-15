import express from "express";
import cors from "cors";
import morgan from "morgan";
import { createRequire } from "module";


const require = createRequire(import.meta.url);
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

const mongoose = require('mongoose');

// Conexão com MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB conectado com sucesso!'))
  .catch(err => console.error('❌ Erro ao conectar MongoDB:', err));

//Import rotas
const usersRouter = require('./routes/users.routes');

// Rotas
app.use("/api/users", usersRouter);


// Iniciando serv
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`API está rodando em http://localhost:${PORT} !!!`)
});