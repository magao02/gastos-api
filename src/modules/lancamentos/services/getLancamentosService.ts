import RedisCache from '@shared/cache/RedisCache';
import Lancamento from '../typeorm/entities/lancamento';
import { LancamentoRepository } from '../typeorm/repositories/lancamentosRepository';

class GetLancamentosService {
  private lancamentosRepository = LancamentoRepository;

  async execute(empresaId: string): Promise<Lancamento[]> {
    const redisCache = new RedisCache();

    let lancamentos = await redisCache.recover<Lancamento[]>(
      `lancamentos-${empresaId}`,
    );
    if (!lancamentos) {
      lancamentos = await this.lancamentosRepository.findByEmpresaId(empresaId);

      await redisCache.save(`lancamentos-${empresaId}`, lancamentos);
    }

    return lancamentos;
  }
}

export default GetLancamentosService;
