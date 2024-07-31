import AppError from '@shared/errors/appError';
import Empresa from '../typeorm/entities/empresa';
import EmpresasRepository from '../typeorm/repositories/empresasRepository';
class GetEmpresaService {
  private empresasRepository = EmpresasRepository;

  async execute(id: string, usuario: string, role: string): Promise<Empresa> {
    const empresa = await this.empresasRepository.findById(id);

    if (!empresa) {
      throw new AppError('Empresa not found', 404);
    }

    if (role != 'admin' && empresa.usuario.id !== usuario) {
      throw new AppError('User not authorized', 401);
    }

    return empresa;
  }
  async executeExists(id: string): Promise<Empresa> {
    const empresa = await this.empresasRepository.findById(id);

    if (!empresa) {
      throw new AppError('Empresa not found', 404);
    }

    return empresa;
  }
}

export default GetEmpresaService;
