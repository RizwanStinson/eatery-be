// import { Request, Response } from "express";
// import menu from "../../models/menuModel/menuModel";
// import {
//   Imenu,
//   IaddOn,
//   Iingredient,
//   Isize,
//   ImealTime,
// } from "../../interfaces/inventoryInterface/interfaces";

// const menuController = async (req: Request, res: Response) => {
//   try {
//     const menuController: Imenu = {
//       name: req.body.name,
//       category: req.body.category,
//       mealTime: req.body.mealTime.map((mealtime: ImealTime) => ({
//         mealtime: mealtime.mealtime,
//       })),
//       description: req.body.description,
//       image: req.body.image,
//       size: req.body.size.map((size: Isize) => ({
//         sizeName: size.sizeName,
//         ingredients: size.ingredients.map((ingredient: Iingredient) => ({
//           name: ingredient.name,
//           properties: {
//             quantity: ingredient.properties.quantity,
//             unit: ingredient.properties.unit,
//           },
//         })),
//         preparationTime: size.preparationTime,
//         sellingPrice: size.sellingPrice,
//         addOns: size.addOns.map((addOn: IaddOn) => ({
//           name: addOn.name,
//           quantity: addOn.quantity,
//           unit: addOn.unit,
//           addonPrice: addOn.addonPrice,
//         })),
//       })),
//     };
//     console.log("newMenu:", menuController);
//     const newMenuItem = await menu.create(menuController);
//     res.status(200).json(newMenuItem);
//   } catch (error) {
//     console.error("Error creating menu item:", error); // Log the error
//     res.status(500);
//     res.send(error);
//   }
// };
// export default menuController;

import { Request, Response } from "express";
import menu from "../../models/menuModel/menuModel";
import {
  Imenu,
  IaddOn,
  Iingredient,
  Isize,
  ImealTime,
} from "../../interfaces/inventoryInterface/interfaces";
import fs from "fs";
import path from "path";
const menuController = async (req: Request, res: Response) => {
  try {
    console.log("file", req.file);
    const menuController: Imenu = {
      name: req.body.name,
      category: req.body.category,
      mealTime: req.body.mealTime.map((mealtime: ImealTime) => ({
        mealtime: mealtime.mealtime,
      })),
      description: req.body.description,
      image: `/uploads/${req.file?.filename}`, // Manually create the image path

      size: req.body.size.map((size: Isize) => ({
        sizeName: size.sizeName,
        ingredients: size.ingredients.map((ingredient: Iingredient) => ({
          name: ingredient.name,
          properties: {
            quantity: ingredient.properties.quantity,
            unit: ingredient.properties.unit,
          },
        })),
        preparationTime: size.preparationTime,
        sellingPrice: size.sellingPrice,
        addOns: size.addOns.map((addOn: IaddOn) => ({
          name: addOn.name,
          quantity: addOn.quantity,
          unit: addOn.unit,
          addonPrice: addOn.addonPrice,
        })),
      })),
    };
    console.log("newMenu:", menuController);
    const newMenuItem = await menu.create(menuController);
    res.status(200).json(newMenuItem);
  } catch (error) {
    console.error("Error creating menu item:", error);
    res.status(500).send(error);
  }
};

export default menuController;
