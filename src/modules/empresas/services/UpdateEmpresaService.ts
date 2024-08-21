import GetUserService from '@modules/users/services/getUserService';
import Empresa from '../typeorm/entities/empresa';
import EmpresaRepository from '../typeorm/repositories/empresasRepository';
import AppError from '@shared/errors/appError';
import RedisCache from '@shared/cache/RedisCache';

interface updateEmpresaDTO {
  id: string;
  nome: string;
  cnpj: string;
  estado: string;
  usuario: string;
}

class UpdateEmpresaService {
  public async execute({
    id,
    nome,
    cnpj,
    estado,
    usuario,
  }: updateEmpresaDTO): Promise<Empresa> {
    const empresasRepository = EmpresaRepository;
    const getUserService = new GetUserService();
    const redisCache = new RedisCache();

    const empresa = await empresasRepository.findById(id);
    if (!empresa) {
      throw new AppError('Empresa não encontrada');
    }

    const user = await getUserService.findById(usuario);
    if (!user) {
      throw new AppError('Usuário não encontrado');
    }

    empresa.nome = nome;
    empresa.cnpj = cnpj;
    empresa.estado = estado;
    empresa.usuario = user;

    await empresasRepository.save(empresa);

    redisCache.invalidate('empresas');

    return empresa;
  }
}

export default UpdateEmpresaService;
