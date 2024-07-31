import AppError from '@shared/errors/appError';
import EmpresasRepository from '../typeorm/repositories/empresasRepository';

class DeleteEmpresaService {
  private empresasRepository = EmpresasRepository;

  public async execute(id: string): Promise<void> {
    const empresa = await this.empresasRepository.findById(id);

    if (!empresa) {
      throw new AppError('Empresa not found', 404);
    }

    await this.empresasRepository.softDelete(id);
  }
}

export default DeleteEmpresaService;
