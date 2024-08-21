import { Request, Response } from 'express';
import GetDescricaoService from '../services/getDescricoesService';

class DescricaoController {
  async index(req: Request, res: Response) {
    const descricaoService = new GetDescricaoService();
    const { empresaId } = req.params;
    const descricoes = await descricaoService.execute(empresaId);
    return res.json(descricoes);
  }
}

export default DescricaoController;
