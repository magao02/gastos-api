import GetUserService from '@modules/users/services/getUserService';
import Empresa from '../typeorm/entities/empresa';
import EmpresaRepository from '../typeorm/repositories/empresasRepository';
import AppError from '@shared/errors/appError';
import RedisCache from '@shared/cache/RedisCache';

interface createEmpresaDTO {
  nome: string;
  cnpj: string;
  estado: string;
  usuario: string;
}

class CreateEmpresaService {
  public async execute({
    nome,
    cnpj,
    estado,
    usuario,
  }: createEmpresaDTO): Promise<Empresa> {
    const empresasRepository = EmpresaRepository;
    const getUserService = new GetUserService();
    const redisCache = new RedisCache();

    const user = await getUserService.findById(usuario);
    if (!user) {
      throw new AppError('Usuário não encontrado');
    }
    const empresa = empresasRepository.create({
      nome,
      cnpj,
      estado,
      usuario: user,
    });

    await empresasRepository.save(empresa);

    redisCache.invalidate('empresas');

    return empresa;
  }
}
export default CreateEmpresaService;
