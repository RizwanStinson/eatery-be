import { Router } from 'express';
import { getAllDummyVendorItems } from '../../controllers/inventoryController/getAllDummyVendorItems';
import getIngredientController from '../../controllers/inventoryController/getIngredientController';
import { orderIngredient } from '../../controllers/inventoryController/orderController';
import postIngredientController from '../../controllers/inventoryController/postIngredientController';

const newIngredientRoute = Router();

newIngredientRoute.post('/addingredient', postIngredientController);
newIngredientRoute.get('/allingredient', getIngredientController);
newIngredientRoute.post('/order-ingredient', orderIngredient);
newIngredientRoute.get('/vendor-items', getAllDummyVendorItems);

export default newIngredientRoute;
