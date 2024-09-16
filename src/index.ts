import { json } from 'body-parser';
import dotenv from 'dotenv';
import express, { Application } from 'express';
import cors = require('cors');

import newIngredientRoute from './routes/inventoryRoute/ingredientRoute';
import stockRoute from './routes/inventoryRoute/stockRoute';
import routerMenu from './routes/menuRoute/menuRoute';

import connectMongoose from './db';
dotenv.config();
const app: Application = express();
app.use(json());
const PORT = process.env.PORT || 6000;
app.use(cors({ origin: '*' }));

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

app.use('/ingredient', newIngredientRoute);
app.use('/stock', stockRoute);
app.use('/menu', routerMenu);

dbConnect();
