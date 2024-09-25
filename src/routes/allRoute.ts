import { Router } from 'express';
import { upload } from '../middlewares/uploadMiddleware';
import newIngredientRoute from './inventoryRoute/ingredientRoute';
import stockRoute from './inventoryRoute/stockRoute';
import routerMenu from './menuRoute/menuRoute';
import posRouter from './posRoute/posroute';
import getProfileRouter from './userRoute/getProfile';
import userRouter from './userRoute/userRoute';
import routerEmployee from './allEmployeeRoute/allEmployeeRoute';
import { authMiddleware } from '../middlewares/auth';

const router = Router();
router.use('/', userRouter);
router.use('/', getProfileRouter);
router.use('/pos',authMiddleware(["Admin", "PosManager"]), posRouter);

//inventory
router.use('/ingredient',authMiddleware(["Admin", "InventoryManager"]), newIngredientRoute);
router.use('/stock',authMiddleware(["Admin", "InventoryManager"]), stockRoute);

//menu
router.use('/menu',authMiddleware(["Admin", "MenuManager"]), routerMenu);

//Image Upload
router.post('/imageUpload', upload.single('image'), (req, res) => {
  res.send({ imageUrl: req.file?.filename });
});

//hr
router.use("/hr", routerEmployee);

export default router;
