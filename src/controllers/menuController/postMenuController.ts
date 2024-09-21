import { Response } from "express";
import mongoose from "mongoose";
import Menu from "../../models/menuModel/menuModel";
import {
  Imenu,
  IaddOn,
  Iingredient,
  Isize,
} from "../../interfaces/inventoryInterface/interfaces";
import { ExtendedRequest } from "../../interfaces/extendedRequest";

const menuController = async (req: ExtendedRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "User not authenticated" });
    }

    const organizationId = req.user.organizationName;
    if (!mongoose.Types.ObjectId.isValid(organizationId.toString())) {
      return res.status(400).json({ message: "Invalid organization ID" });
    }
    const menuItem: Imenu = {
      name: req.body.name,
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
          addonPrice: addOn.addonPrice,
        })),
      })),
      organization: new mongoose.Types.ObjectId(organizationId.toString()),
      quantity: req.body.quantity || 0,
      totalPrice: req.body.totalPrice || 0,
    };

    const newMenuItem = await Menu.create(menuItem);
    res.status(200).json(newMenuItem);
  } catch (error) {
    console.error("Error creating menu item:", error);
    res.status(500).send(error);
  }
};

export default menuController;
