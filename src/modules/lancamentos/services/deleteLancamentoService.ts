import RedisCache from '@shared/cache/RedisCache';
import { LancamentoRepository } from '../typeorm/repositories/lancamentosRepository';

class DeleteLancamentoService {
  private lancamentosRepository = LancamentoRepository;

  async execute(id: string): Promise<void> {
    const lancamento = await this.lancamentosRepository.findById(id);
    const redisCache = new RedisCache();
    if (!lancamento) {
      throw new Error('Lancamento not found');
    }
    redisCache.invalidate(`lancamentos-${lancamento.empresa.id}`);
    await this.lancamentosRepository.remove(lancamento);
  }
}

export default DeleteLancamentoService;
