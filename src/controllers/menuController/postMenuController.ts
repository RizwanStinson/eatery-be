

import { Request, Response } from 'express';
import {
  IaddOn,
  Iingredient,
  ImealTime,
  Imenu,
  Isize,
} from '../../interfaces/inventoryInterface/interfaces';
import menu from '../../models/menuModel/menuModel';
import { DefaultValues } from '../../consts';
import { ExtendedRequest } from '../../interfaces/extendedRequest';

const menuController = async (req: ExtendedRequest, res: Response) => {
  const { organizationName } = req.user!;
  
  try {
    console.log('file', req.file);
    const menuController: Imenu = {
      itemName: req.body.name,
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
    console.log('newMenu:', menuController);
    const newMenuItem = await menu.create(menuController);
    res.status(200).json(newMenuItem);
  } catch (error) {
    console.error('Error creating menu item:', error);
    res.status(500).send(error);
  }
};

export default menuController;
