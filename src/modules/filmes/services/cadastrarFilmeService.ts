import AppError from '@shared/errors/appError';
import Filme from '../typeorm/entities/filme';
import { FilmesRepository } from '../typeorm/repositories/filmesRepository';
import { GenerosRepository } from '../typeorm/repositories/generosRepository';
import Genero from '../typeorm/entities/genero';
interface FilmeDTO {
  nome: string;
  diretor: string;
  capa?: string;
  generos: string[];
  atores: string[];
  anoLancamento: number;
  sinopse: string;
  duracao: number;
  classificacao: number;
}

class CadastrarFilmeService {
  private filmesRepository = FilmesRepository;
  private generosRepository = GenerosRepository;
  private atoresRepository = GenerosRepository;

  async execute({
    nome,
    diretor,
    capa,
    generos,
    anoLancamento,
    atores,
    sinopse,
    duracao,
    classificacao,
  }: FilmeDTO): Promise<Filme> {
    const FilmeJaExiste = await this.filmesRepository.findByNome(nome);
    if (FilmeJaExiste) {
      throw new AppError('Filme já cadastrado');
    }
    const generosExistentes = await Promise.all(
      generos.map(nome => this.persiteGeneros(nome)),
    );

    const atoresExistentes = await Promise.all(
      atores.map(nome => this.persiteAtores(nome)),
    );
    const FilmeDTO = {
      nome,
      diretor,
      capa,
      anoLancamento,
      sinopse,
      duracao,
      classificacao,
    };
    const filme = this.filmesRepository.create({
      ...FilmeDTO,
      generos: generosExistentes,
      atores: atoresExistentes,
    });
    await this.filmesRepository.save(filme);
    return filme;
  }

  private async persiteGeneros(genero: string): Promise<Genero> {
    const generoExiste = await this.generosRepository.findByNome(genero);
    if (generoExiste) {
      return generoExiste;
    }
    return this.generosRepository.create({ nome: genero });
  }

  private async persiteAtores(ator: string): Promise<Genero> {
    const atorExiste = await this.atoresRepository.findByNome(ator);
    if (atorExiste) {
      return atorExiste;
    }
    return this.atoresRepository.create({ nome: ator });
  }
}
export default CadastrarFilmeService;
