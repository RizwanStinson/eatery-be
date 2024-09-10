import dotenv from "dotenv";
import express, { Request, Response } from "express";
import { json } from "body-parser";

dotenv.config();

const app = express();
app.use(json());
const PORT = process.env.PORT || 6000;

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    message: "Welcome to Eatery Backend",
  });
});

app.listen(PORT, () => {
  console.log(`server is listening on http://localhost:${PORT}`);
});
