import express from "express";
import morgan from "morgan";
import path from "path";
import cors from 'cors'
import {ACCESS_TOKEN, PORT} from '../config.js'
import paymentRoutes from "./routes/payment.routes.js";

const app = express();
app.use(express.json());
app.use(cors()); // Habilitar CORS para todas las solicitudes
app.use(morgan("dev"));

app.use(paymentRoutes);

//app.use(express.static(path.resolve("src/public")));

app.listen(PORT);
console.log("Server on port", PORT);