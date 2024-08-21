import Descricao from '../typeorm/entities/descricao';
import { DescricaoRepository } from '../typeorm/repositories/descricaoRepository';

class GetDescricaoService {
  private descricaoRepository = DescricaoRepository;

  async execute(empresaId: string): Promise<Descricao[]> {
    const descricoes = this.descricaoRepository.findByEmpresaId(empresaId);

    return descricoes;
  }
}

export default GetDescricaoService;
