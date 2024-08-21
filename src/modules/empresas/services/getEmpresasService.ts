import Empresa from '../typeorm/entities/empresa';
import EmpresasRepository from '../typeorm/repositories/empresasRepository';
import RedisCache from '@shared/cache/RedisCache';
class GetEmpresasService {
  private empresasRepository = EmpresasRepository;

  async execute(): Promise<Empresa[]> {
    const redisCache = new RedisCache();
    let empresas = await redisCache.recover<Empresa[]>('empresas');

    if (!empresas) {
      empresas = await this.empresasRepository.find({
        relations: ['usuario'],
      });

      await redisCache.save('empresas', empresas);
    }

    return empresas;
  }
}

export default GetEmpresasService;
