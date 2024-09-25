
import dotenv from "dotenv";
import express, { Application, Request, Response } from "express";
import cors = require("cors");
import connectMongoose from "./db";
import router from "./routes/allRoute";
import path from 'path';

import { DefaultValues } from './consts';
dotenv.config();

const PORT = process.env.PORT || 5000;
const app: Application = express();
app.use(express.json());
app.use(cors());
app.use(router);
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

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
