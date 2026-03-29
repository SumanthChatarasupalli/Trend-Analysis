import express from "express";
import mainrouter from "./routes/index.js";
import cors from "cors";

const app = express();

app.use(cors());

app.use(express.json());

app.use("/api/stock", mainrouter);

const port = 3001;
app.listen(port, () => {
  console.log(`Application is running on port ${port}`);
});
