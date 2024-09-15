import { json } from 'body-parser';
import dotenv from 'dotenv';
import express, { Application, Request, Response } from 'express';
import connectMongoose from './db';
import router from './routes/allRoute';
import newIngredientRoute from './routes/inventoryRoute/ingredientRoute';
import stockRoute from './routes/inventoryRoute/stockRoute';
import routerMenu from './routes/menuRoute/menuRoute';
dotenv.config();

const PORT = process.env.PORT || 5000;

const app: Application = express();
app.use(json());
app.use(router);

app.get('/', (req: Request, res: Response) => {
  res.status(200).json({
    message: 'Welcome to Eatery Backend',
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

app.use('/ingredient', newIngredientRoute);
app.use('/stock', stockRoute);
app.use('/menu', routerMenu);

dbConnect();
