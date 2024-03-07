import express, { json } from "express";
import cors from "cors";

const app = express();

app.get("/", (_, res) => {
  return res
    .status(200)
    .json({ message: `Hello from root. Env is ${process.env.TEST_ENV}` });
});

// ミドルウェア設定
app.use(json());
app.use(cors());

app.use((_, res) => {
  return res.status(404).json({ error: "Not Found" });
});

export { app };
