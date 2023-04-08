import express from "express";
import cors from "cors";
import router from "./routes/index.js";

const PORT = 3500;

const app = express();

app.use(cors({ origin: true }));

app.use(express.json());

app.use("/appointments", router);

app.listen(PORT, () => console.log(`Server started on PORT ${PORT}...`));
