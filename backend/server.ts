import express from "express";
import swaggerUi from "swagger-ui-express";
import { swaggerDocument } from "./src/docs/swagger";

const app = express();
const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("DevBoard API is running 🚀");
});

app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
