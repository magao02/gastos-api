import Empresa from '../typeorm/entities/empresa';
import EmpresasRepository from '../typeorm/repositories/empresasRepository';
class GetEmpresasService {
  private empresasRepository = EmpresasRepository;

  async execute(): Promise<Empresa[]> {
    const empresas = await this.empresasRepository.find({
      relations: ['usuario'],
    });

    return empresas;
  }
}

export default GetEmpresasService;
