import { Request, Response } from "express";
import menu from "../../models/menuModel/menuModel";
import {
  Imenu,
  IaddOn,
  Iingredient,
  Isize,
} from "../../interfaces/inventoryInterface/interfaces";

const menuController = async (req: Request, res: Response) => {
  try {
    const menuController: Imenu = {
      itemName: req.body.name,
      category: req.body.category,
      tastyTag: req.body.tastyTag,
      mealTime: req.body.mealTime,
      description: req.body.description,
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
        })),
      })),
    };
    console.log("newMenu:", menuController);
    const newMenuItem = await menu.create(menuController);
    res.status(200).json(newMenuItem);
  } catch (error) {
    res.status(500);
    res.send(error);
  }
};
export default menuController;
