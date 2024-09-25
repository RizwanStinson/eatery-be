import { Router } from 'express';
import { upload } from '../middlewares/uploadMiddleware';
import newIngredientRoute from './inventoryRoute/ingredientRoute';
import stockRoute from './inventoryRoute/stockRoute';
import routerMenu from './menuRoute/menuRoute';
import posRouter from './posRoute/posroute';
import getProfileRouter from './userRoute/getProfile';
import userRouter from './userRoute/userRoute';

const router = Router();
router.use('/', userRouter);
router.use('/', getProfileRouter);
router.use('/pos', posRouter);

//inventory
router.use('/ingredient', newIngredientRoute);
router.use('/stock', stockRoute);

//menu
router.use('/menu', routerMenu);

//Image Upload
router.post('/imageUpload', upload.single('image'), (req, res) => {
  res.send({ imageUrl: req.file?.filename });
});

export default router;
