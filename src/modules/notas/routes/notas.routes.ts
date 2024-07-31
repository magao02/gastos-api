import { Router } from 'express';
import NotasController from '../controllers/notasController';
import isAuthenticated from '@modules/users/middlewares/isAuthenticated';
import isAuthorized from '@modules/users/middlewares/isAuthorized';
import { celebrate, Joi, Segments } from 'celebrate';

const notasRouter = Router();
const notasController = new NotasController();
/**
 * @swagger
 * tags:
 *   name: Notas
 *   description: Endpoints de notas
 */

/**
 * @swagger
 * /notas:
 *   post:
 *    summary: Cria uma nova nota
 *    tags: [Notas]
 *    security:
 *      - bearerAuth: []
 *    requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               filmeId:
 *                 type: string
 *                 format: uuid
 *                 example: "c56a4180-65aa-42ec-a945-5fd21dec0538"
 *               valor:
 *                 type: number
 *                 example: 5
 *    responses:
 *       201:
 *         description: Nota criada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: './modules/filmes/typeorm/entities/nota.ts#'
 *       400:
 *         description: Requisição inválida
 *       401:
 *         description: Não autorizado
 */
notasRouter.post(
  '/',
  isAuthenticated,
  isAuthorized('user'),
  celebrate({
    [Segments.BODY]: {
      filmeId: Joi.string().uuid().required(),
      valor: Joi.number().required(),
    },
  }),
  notasController.create,
);
export default notasRouter;
