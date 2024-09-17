// import { Request, Response } from "express";
// import newIngredient from "../../models/inventoryModel/inventoryModel";
// import allIngredient from "../../models/inventoryModel/itemsModel";
// import inventoryDetails from "./inventoryDetails";
// import { Idummy } from "../../interfaces/inventoryInterface";
// const addIngredientController = async (req: Request, res: Response) => {
//   try {
//     const data: Idummy = inventoryDetails("Beef Patty");
//     const newObj = {
//       name: req.body.name,
//       unit: req.body.unit,
//       orderPoint: req.body.orderPoint,
//       capacity: req.body.capacity,
//     };
//     console.log("newObj", newObj);
//     const ingredient = await newIngredient.create(newObj);
//     const inventory = await allIngredient.create(
//       Object.assign(newObj, {
//         prevStockExpiry: data.expiryDate,
//         unitCost: data.price,
//       })
//     );
//     res.status(200).json({ ingredient, inventory });
//   } catch (error) {
//     res.status(500);
//     res.send(error);
//   }
// };
// export default addIngredientController;

import { Request, Response } from 'express';
import inventory from '../../models/inventoryModel/inventoryModel';
import newIngredient from '../../models/inventoryModel/newIngredientModel';

const postIngredientController = async (req: Request, res: Response) => {
  try {
    const Ingredient = {
      ingredient: req.body.ingredient,
      unit: req.body.unit,
      poo: req.body.poo,
      capacity: req.body.capacity,
    };
    console.log('new Ingredient: ', Ingredient);
    const createIngredient = await newIngredient.create(Ingredient);
    const Inventory = await inventory.create(Ingredient);
    res.status(200).json({ Inventory });
  } catch (error) {
    res.status(500);
    res.send(error);
  }
};

export default postIngredientController;
