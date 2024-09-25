import dotenv from 'dotenv';
import express, { Application } from 'express';
import path from 'path';
import cors = require('cors');

import connectMongoose from './db';
import router from './routes/allRoute';
import { DefaultValues } from './consts';
dotenv.config();
const app: Application = express();

app.use(express.json());
const PORT = process.env.PORT || 6000;
app.use(cors({ origin: DefaultValues.frontendOrigin }));
app.use(router);
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

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
