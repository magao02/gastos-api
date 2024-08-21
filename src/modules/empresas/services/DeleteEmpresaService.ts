import AppError from '@shared/errors/appError';
import EmpresasRepository from '../typeorm/repositories/empresasRepository';
import RedisCache from '@shared/cache/RedisCache';

class DeleteEmpresaService {
  private empresasRepository = EmpresasRepository;

  public async execute(id: string): Promise<void> {
    const empresa = await this.empresasRepository.findById(id);
    const redisCache = new RedisCache();
    if (!empresa) {
      throw new AppError('Empresa not found', 404);
    }

    await this.empresasRepository.softDelete(id);
    redisCache.invalidate('empresas');
  }
}

export default DeleteEmpresaService;
