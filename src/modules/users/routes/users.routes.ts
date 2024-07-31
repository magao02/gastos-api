import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import UsersController from '../controllers/usersController';
import isAuthenticated from '../middlewares/isAuthenticated';
import isAuthorized from '../middlewares/isAuthorized';

const usersRouter = Router();
const usersController = new UsersController();
/**
 * @swagger
 * tags:
 *   name: Users
 *   description: Endpoints de usuários
 */

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Lista todos os usuários
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de usuários
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *       401:
 *         description: Não autorizado
 */
usersRouter.get(
  '/',
  isAuthenticated,
  isAuthorized('admin'),
  usersController.index,
);

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Exibe um usuário pelo ID
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *           format: uuid
 *         required: true
 *         description: ID do usuário
 *     responses:
 *       200:
 *         description: Usuário encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       401:
 *         description: Não autorizado
 *       404:
 *         description: Usuário não encontrado
 */
usersRouter.get(
  '/:id',
  isAuthenticated,
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  usersController.show,
);
/**
 * @swagger
 * /users/email/{email}:
 *   get:
 *     summary: Exibe um usuário pelo email
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: email
 *         schema:
 *           type: string
 *         required: true
 *         description: Email do usuário
 *     responses:
 *       200:
 *         description: Usuário encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       401:
 *         description: Não autorizado
 *       404:
 *         description: Usuário não encontrado
 */
usersRouter.get(
  '/email/:email',
  isAuthenticated,
  celebrate({
    [Segments.PARAMS]: {
      email: Joi.string().required(),
    },
  }),
  usersController.showByEmail,
);
/**
 * @swagger
 * /users/nome/{nome}:
 *   get:
 *     summary: Exibe um usuário pelo nome
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: nome
 *         schema:
 *           type: string
 *         required: true
 *         description: Nome do usuário
 *     responses:
 *       200:
 *         description: Usuário encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       401:
 *         description: Não autorizado
 *       404:
 *         description: Usuário não encontrado
 */
usersRouter.get(
  '/nome/:nome',
  isAuthenticated,
  celebrate({
    [Segments.PARAMS]: {
      nome: Joi.string().required(),
    },
  }),
  usersController.showByNome,
);

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Cria um novo usuário
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *               role:
 *                 type: string
 *     responses:
 *       201:
 *         description: Usuário criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: Requisição inválida
 *       401:
 *         description: Não autorizado
 */
usersRouter.post(
  '/',
  //isAuthenticated,
  //isAuthorized('admin'),
  celebrate({
    [Segments.BODY]: {
      nome: Joi.string().required(),
      email: Joi.string().required(),
      password: Joi.string().required(),
      role: Joi.string().required(),
    },
  }),
  usersController.create,
);

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Deleta um usuário pelo ID
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *           format: uuid
 *         required: true
 *         description: ID do usuário
 *     responses:
 *       204:
 *         description: Usuário deletado com sucesso
 *       401:
 *         description: Não autorizado
 *       404:
 *         description: Usuário não encontrado
 */
usersRouter.delete(
  '/:id',
  isAuthenticated,
  isAuthorized('admin'),
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  usersController.delete,
);

/**
 * @swagger
 * /users:
 *   put:
 *     summary: Atualiza um usuário
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *               old_password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Usuário atualizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: Requisição inválida
 *       401:
 *         description: Não autorizado
 */
usersRouter.put(
  '/',
  isAuthenticated,
  celebrate({
    [Segments.BODY]: {
      nome: Joi.string(),
      email: Joi.string(),
      password: Joi.string(),
      old_password: Joi.string(),
    },
  }),
  usersController.update,
);

export default usersRouter;
