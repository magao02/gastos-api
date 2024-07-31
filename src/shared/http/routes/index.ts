import { Router } from 'express';
import usersRouter from '@modules/users/routes/users.routes';
import loginRouter from '@modules/users/routes/logins.routes';
import empresasRoutes from '@modules/empresas/routes/empresas.routes';
import lancamentosRouter from '@modules/lancamentos/routes/lancamentos.routes';

const routes = Router();

routes.use('/users', usersRouter);
routes.use('/login', loginRouter);
routes.use('/empresas', empresasRoutes);
routes.use('/lancamentos', lancamentosRouter);
routes.get('/', (req, res) => {
  return res.json({ message: 'Hello World' });
});

export default routes;
