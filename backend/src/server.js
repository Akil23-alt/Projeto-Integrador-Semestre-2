import express from "express";
import cors from "cors";
import morgan from "morgan";
import {config} from "dotenv";
import {conectDB} from "./config/db.js";
import usersRouter from "./routes.js";

config ();
const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

await conectDB();

app.get("/api/health",(_req, res) => {
    res.json({status: "ok", env : process.env.NODE_ENV || "dev"});
});

app.use("/api/users", usersRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log('API está rodando em http://localhost:${PORT} !!!')
});