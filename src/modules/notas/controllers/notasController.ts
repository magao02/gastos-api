import { Request, Response } from 'express';
import CreateNotasService from '../services/createNotaService';

class NotasController {
  async create(request: Request, response: Response) {
    const { filmeId, valor } = request.body;
    const usuario = request.user.id;

    const createNotaService = new CreateNotasService();

    const nota = await createNotaService.execute({
      filmeId,
      usuario,
      nota: valor,
    });

    return response.json(nota);
  }
}

export default NotasController;
