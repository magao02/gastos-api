import { Router } from 'express';
import EmpresasController from '../controllers/empresasController';
import isAuthenticated from '@modules/users/middlewares/isAuthenticated';
import isAuthorized from '@modules/users/middlewares/isAuthorized';
const empresasRoutes = Router();
const empresasController = new EmpresasController();

empresasRoutes.get(
  '/',
  isAuthenticated,
  isAuthorized('admin'),
  empresasController.index,
);
empresasRoutes.get('/:id', isAuthenticated, empresasController.show);
empresasRoutes.post(
  '/',
  isAuthenticated,
  isAuthorized('admin'),
  empresasController.create,
);
empresasRoutes.put(
  '/:id',
  isAuthenticated,
  isAuthorized('admin'),
  empresasController.update,
);

export default empresasRoutes;
