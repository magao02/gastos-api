import { Router } from 'express';
import uploadConfig from '@config/upload';
import { celebrate, Joi, Segments } from 'celebrate';
import multer from 'multer';
//import isAuthenticated from '@modules/users/middlewares/isAuthenticated';
import LancamentosController from '../controllers/lancamentosController';

const lancamentosRouter = Router();
const lancamentosController = new LancamentosController();
const upload = multer(uploadConfig);

lancamentosRouter.get(
  '/:empresaId',
  celebrate({
    [Segments.PARAMS]: {
      empresaId: Joi.string().uuid().required(),
    },
  }),
  lancamentosController.index,
);

lancamentosRouter.post(
  '/',
  upload.single('comprovante'),
  celebrate({
    [Segments.BODY]: {
      descricao: Joi.string().required(),
      valor: Joi.number().required(),
      data: Joi.date().required(),
      tipo: Joi.string().required(),
      empresaId: Joi.string().uuid().required(),
    },
  }),
  lancamentosController.create,
);

lancamentosRouter.patch(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  lancamentosController.update,
);

lancamentosRouter.delete(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  lancamentosController.delete,
);

export default lancamentosRouter;
