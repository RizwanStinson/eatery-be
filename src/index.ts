import dotenv from "dotenv";
import express, { Application, Request, Response } from "express";
import { json } from "body-parser";

import connectMongoose from "./db";

dotenv.config();

const app: Application = express();
app.use(json());
const PORT = process.env.PORT || 6000;

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    message: "Welcome to Eatery Backend",
  });
});

async function dbConnect() {
  try {
    await connectMongoose();
    app.listen(PORT, () => {
      console.log(`server is listening on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
}
dbConnect();
