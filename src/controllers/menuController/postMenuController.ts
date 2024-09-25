<<<<<<< HEAD
import { Response } from "express";
import mongoose from "mongoose";
import Menu from "../../models/menuModel/menuModel";
=======
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

import { Request, Response } from 'express';
>>>>>>> featureMenuBuilder
import {
  IaddOn,
  Iingredient,
  ImealTime,
<<<<<<< HEAD
} from "../../interfaces/inventoryInterface/interfaces";
import { ExtendedRequest } from "../../interfaces/extendedRequest";
=======
  Imenu,
  Isize,
} from '../../interfaces/inventoryInterface/interfaces';
import menu from '../../models/menuModel/menuModel';
import { DefaultValues } from '../../consts';
>>>>>>> featureMenuBuilder

const menuController = async (req: ExtendedRequest, res: Response) => {
  try {
<<<<<<< HEAD
    if (!req.user) {
      return res.status(401).json({ message: "User not authenticated" });
    }

    const organizationName = req.user.organizationName;
    /*  if (!mongoose.Types.ObjectId.isValid(organizationId.toString())) {
      return res.status(400).json({ message: "Invalid organization ID" });
    } */
    const menuItem: Imenu = {
=======
    console.log('file', req.file);
    const menuController: Imenu = {
>>>>>>> featureMenuBuilder
      name: req.body.name,
      category: req.body.category,
      mealTime: req.body.mealTime.map((mealtime: ImealTime) => ({
        mealtime: mealtime.mealtime,
      })),
      description: req.body.description,
      image: `${DefaultValues.backendOrigin}/uploads/${req.body.image}`, // Manually create the image path

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
      organizationName: organizationName,
      quantity: req.body.quantity || 0,
      totalPrice: req.body.totalPrice || 0,
    };
<<<<<<< HEAD

    const newMenuItem = await Menu.create(menuItem);
    res.status(200).json(newMenuItem);
  } catch (error) {
    console.error("Error creating menu item:", error);
=======
    console.log('newMenu:', menuController);
    const newMenuItem = await menu.create(menuController);
    res.status(200).json(newMenuItem);
  } catch (error) {
    console.error('Error creating menu item:', error);
>>>>>>> featureMenuBuilder
    res.status(500).send(error);
  }
};

export default menuController;
