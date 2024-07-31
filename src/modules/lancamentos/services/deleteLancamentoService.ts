import { LancamentoRepository } from '../typeorm/repositories/lancamentosRepository';

class DeleteLancamentoService {
  private lancamentosRepository = LancamentoRepository;

  async execute(id: string): Promise<void> {
    const lancamento = await this.lancamentosRepository.findById(id);

    if (!lancamento) {
      throw new Error('Lancamento not found');
    }

    await this.lancamentosRepository.remove(lancamento);
  }
}

export default DeleteLancamentoService;
