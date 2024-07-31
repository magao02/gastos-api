import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import LoginController from '../controllers/loginController';

const loginRouter = Router();
const loginController = new LoginController();
/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Endpoints de autenticação
 */

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Realiza o login do usuário
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: "johndoe@example.com"
 *               password:
 *                 type: string
 *                 example: "password123"
 *     responses:
 *       200:
 *         description: Login realizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *       400:
 *         description: Requisição inválida
 *       401:
 *         description: Credenciais inválidas
 */
loginRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    },
  }),
  loginController.create,
);

export default loginRouter;
