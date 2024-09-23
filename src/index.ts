import { json } from "body-parser";
import dotenv from "dotenv";
import express, { Application, Request, Response } from "express";
import connectMongoose from "./db";
import router from "./routes/allRoute";
import cors from "cors";
dotenv.config();

const PORT = process.env.PORT || 5000;

const app: Application = express();
app.use(express.json());
app.use(cors());
app.use(router);

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
