import RedisCache from '@shared/cache/RedisCache';
import Lancamento from '../typeorm/entities/lancamento';
import { LancamentoRepository } from '../typeorm/repositories/lancamentosRepository';

interface IupdateLancamentoDTO {
  descricao?: string;
  valor?: number;
  data?: Date;
  tipo?: 'receita' | 'despesa';
  comprovante?: string;
}

class UpdateLancamentoService {
  async execute(id: string, data: IupdateLancamentoDTO): Promise<Lancamento> {
    const lancamentoRepository = LancamentoRepository;
    const lancamento = await lancamentoRepository.findById(id);
    const redisCache = new RedisCache();
    if (!lancamento) {
      throw new Error('Lancamento not found');
    }

    Object.assign(lancamento, data);

    await lancamentoRepository.save(lancamento);
    redisCache.invalidate(`lançamentos-${lancamento.empresa.id}`);

    return lancamento;
  }
}

export default UpdateLancamentoService;
