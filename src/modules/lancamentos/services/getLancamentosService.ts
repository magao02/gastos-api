import Lancamento from '../typeorm/entities/lancamento';
import { LancamentoRepository } from '../typeorm/repositories/lancamentosRepository';

class GetLancamentosService {
  private lancamentosRepository = LancamentoRepository;

  async execute(empresaId: string): Promise<Lancamento[]> {
    const lancamentos = this.lancamentosRepository.findByEmpresaId(empresaId);

    return lancamentos;
  }
}

export default GetLancamentosService;
