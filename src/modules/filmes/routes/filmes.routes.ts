/**
 * @swagger
 * tags:
 *   name: Filmes
 *   description: Operações relacionadas aos filmes
 *
 * paths:
 *   /filmes/nome/{nome}:
 *     get:
 *       summary: Retorna filmes pelo nome
 *       tags: [Filmes]
 *       parameters:
 *         - in: path
 *           name: nome
 *           required: true
 *           schema:
 *             type: string
 *           description: Nome do filme a ser buscado
 *       responses:
 *         200:
 *           description: Lista de filmes que correspondem ao nome fornecido
 *           content:
 *             application/json:
 *               schema:
 *                 type: array
 *                 items:
 *                    $ref: './modules/filmes/typeorm/entities/filme.ts#'
 *         404:
 *           description: Nenhum filme encontrado com o nome fornecido
 *
 *   /filmes/genero/{genero}:
 *     get:
 *       summary: Retorna filmes por gênero
 *       tags: [Filmes]
 *       parameters:
 *         - in: path
 *           name: genero
 *           required: true
 *           schema:
 *             type: string
 *           description: Gênero do filme a ser buscado
 *       responses:
 *         200:
 *           description: Lista de filmes que correspondem ao gênero fornecido
 *           content:
 *             application/json:
 *               schema:
 *                 type: array
 *                 items:
 *                   $ref: '#/components/schemas/Filme'
 *         404:
 *           description: Nenhum filme encontrado com o gênero fornecido
 *
 *   /filmes:
 *     get:
 *       summary: Retorna todos os filmes
 *       tags: [Filmes]
 *       responses:
 *         200:
 *           description: Lista de todos os filmes
 *           content:
 *             application/json:
 *               schema:
 *                 type: array
 *                 items:
 *                   $ref: './modules/filmes/typeorm/entities/filme.ts#'
 *
 *     post:
 *       summary: Cria um novo filme
 *       tags: [Filmes]
 *       security:
 *         - bearerAuth: []
 *       requestBody:
 *         required: true
 *         content:
 *           multipart/form-data:
 *             schema:
 *               type: object
 *               properties:
 *                 capa:
 *                   type: string
 *                   format: binary
 *                 nome:
 *                   type: string
 *                 diretor:
 *                   type: string
 *                 generos:
 *                   type: array
 *                   items:
 *                     type: string
 *                 atores:
 *                   type: array
 *                   items:
 *                     type: string
 *                 anoLancamento:
 *                   type: integer
 *                 duracao:
 *                   type: integer
 *                 classificacao:
 *                   type: integer
 *                 sinopse:
 *                   type: string
 *       responses:
 *         201:
 *           description: Filme criado com sucesso
 *           content:
 *             application/json:
 *               schema:
 *                  $ref: './modules/filmes/typeorm/entities/filme.ts#'
 *         400:
 *           description: Erro na requisição, verifique os dados enviados
 *
 *   /filmes/{id}:
 *     get:
 *       summary: Retorna um filme pelo ID
 *       tags: [Filmes]
 *       parameters:
 *         - in: path
 *           name: id
 *           required: true
 *           schema:
 *             type: string
 *             format: uuid
 *           description: ID do filme a ser retornado
 *       responses:
 *         200:
 *           description: Filme encontrado
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/Filme'
 *         404:
 *           description: Filme não encontrado
 *
 *     delete:
 *       summary: Deleta um filme pelo ID
 *       tags: [Filmes]
 *       parameters:
 *         - in: path
 *           name: id
 *           required: true
 *           schema:
 *             type: string
 *             format: uuid
 *           description: ID do filme a ser deletado
 *       responses:
 *         204:
 *           description: Filme deletado com sucesso
 *         404:
 *           description: Filme não encontrado
 */
import { Router } from 'express';
import FilmesController from '../controllers/filmesController';
import uploadConfig from '@config/upload';
import { celebrate, Joi, Segments } from 'celebrate';
import multer from 'multer';
import isAuthenticated from '@modules/users/middlewares/isAuthenticated';
import isAuthorized from '@modules/users/middlewares/isAuthorized';

const filmesRouter = Router();
const filmesController = new FilmesController();
const upload = multer(uploadConfig);

filmesRouter.get('/', isAuthenticated, filmesController.index);
filmesRouter.get(
  '/genero/:genero',
  isAuthenticated,
  celebrate({
    [Segments.PARAMS]: {
      genero: Joi.string().required(),
    },
  }),
  filmesController.showByGenero,
);

filmesRouter.get(
  '/:id',
  isAuthenticated,
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  filmesController.show,
);

filmesRouter.get(
  '/nome/:nome',
  isAuthenticated,
  celebrate({
    [Segments.PARAMS]: {
      nome: Joi.string().required(),
    },
  }),
  filmesController.showByname,
);

filmesRouter.post(
  '/',
  isAuthenticated,
  isAuthorized('admin'),
  upload.single('capa'),
  celebrate({
    [Segments.BODY]: {
      nome: Joi.string().required(),
      diretor: Joi.string().required(),
      generos: Joi.array().items(Joi.string()).required(),
      atores: Joi.array().items(Joi.string()).required(),
      anoLancamento: Joi.number().required(),
      duracao: Joi.number().required(),
      classificacao: Joi.number().required(),
      sinopse: Joi.string().required(),
    },
  }),
  filmesController.create,
);

filmesRouter.delete(
  '/:id',
  isAuthenticated,
  isAuthorized('admin'),
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  filmesController.delete,
);

export default filmesRouter;
