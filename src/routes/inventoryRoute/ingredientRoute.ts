import { Router } from 'express';
import { deleteIngredient } from '../../controllers/inventoryController/deleteIngredient';
import { getAllDummyVendorItems } from '../../controllers/inventoryController/getAllDummyVendorItems';
import getIngredientController from '../../controllers/inventoryController/getIngredientController';
import { orderIngredient } from '../../controllers/inventoryController/orderController';
import postIngredientController from '../../controllers/inventoryController/postIngredientController';
import { wastageItems } from '../../controllers/inventoryController/wastageController';

const newIngredientRoute = Router();

newIngredientRoute.post('/addingredient', postIngredientController);
newIngredientRoute.get('/allingredient', getIngredientController);
newIngredientRoute.post('/order-ingredient', orderIngredient);
newIngredientRoute.get('/vendor-items', getAllDummyVendorItems);
newIngredientRoute.delete('/delete-ingredient', deleteIngredient);
newIngredientRoute.get('/expired-items', wastageItems);

export default newIngredientRoute;
