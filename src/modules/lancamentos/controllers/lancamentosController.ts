import { Request, Response } from 'express';
import GetLancamentosService from '../services/getLancamentosService';
import CreateLancamentoService from '../services/createLancamentoService';
import UpdateLancamentoService from '../services/updateLancamentoService';
import DeleteLancamentoService from '../services/deleteLancamentoService';

class LancamentosController {
  async index(req: Request, res: Response) {
    const getLancamentosService = new GetLancamentosService();
    const { empresaId } = req.params;
    const lancamentos = await getLancamentosService.execute(empresaId);

    return res.json(lancamentos);
  }

  async create(req: Request, res: Response) {
    const { descricao, valor, data, tipo, empresaId, banco } = req.body;
    const comprovante = req.file?.filename;
    const createLancamentoService = new CreateLancamentoService();
    const lancamento = await createLancamentoService.execute({
      descricao,
      valor,
      data,
      tipo,
      empresaId,
      comprovante,
      banco,
    });

    return res.status(201).json(lancamento);
  }

  async update(req: Request, res: Response) {
    const { id } = req.params;
    const { descricao, valor, data, tipo, comprovante } = req.body;
    const updateLancamentoService = new UpdateLancamentoService();
    const lancamento = await updateLancamentoService.execute(id, {
      descricao,
      valor,
      data,
      tipo,
      comprovante,
    });

    return res.json(lancamento);
  }

  async delete(req: Request, res: Response) {
    const { id } = req.params;
    const deleteLancamentoService = new DeleteLancamentoService();
    await deleteLancamentoService.execute(id);

    return res.json([]);
  }
}

export default LancamentosController;
