import express from "express";
import apiRouter from "./routes/api/index.js";
import pageRouter from "./routes/page.js";
import pageSection from "./routes/pageSection.js";
import sectionRouter from "./routes/section.js";
import database from "./database/database.js";

const app = express();
const PORT = 3000;

app.use(express.json());
app.use("/api", apiRouter);
app.use("/pages", pageRouter);
app.use("/page-sections", pageSection);
app.use("/sections", sectionRouter);

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
