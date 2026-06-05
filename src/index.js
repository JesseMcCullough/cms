import express from "express";
import apiRouter from "./routes/api/index.js";
import pageRouter from "./routes/page.js";
import database from "./database/database.js";

const app = express();
const PORT = 3000;

app.use(express.json());
app.use("/api", apiRouter);
app.use("/pages", pageRouter);

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
