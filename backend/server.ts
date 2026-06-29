import "dotenv/config";
import express from "express";
import swaggerUi from "swagger-ui-express";
import { swaggerDocument } from "./src/docs/swagger";
import authRoutes from "./src/routes/authRoutes";
import projectRoutes from "./src/routes/projectRoutes";
import taskRoutes from "./src/routes/taskRoutes";
import { authenticate } from "./src/middleware/authenticate";
import cors from "cors";
import statsRoutes from "./src/routes/statsRoutes";

const app = express();
const PORT = process.env.PORT || 3000;

const allowedOrigins = process.env.ALLOWED_ORIGINS
  ? process.env.ALLOWED_ORIGINS.split(",")
  : ["http://localhost:5173"];

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  }),
);

app.get("/", (req, res) => {
  res.send("DevBoard API is running 🚀");
});

app.use(express.json());

app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use("/api/auth", authRoutes);

app.use(authenticate);

app.use("/api/stats", statsRoutes);

app.use("/api/projects", projectRoutes);

app.use("/api/tasks", taskRoutes);

app.listen(PORT, () => {
  console.log(
    `Server running on port ${PORT} - Visit: http://localhost:3000/api/docs`,
  );
});
