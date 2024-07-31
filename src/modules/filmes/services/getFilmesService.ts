import Filme from '../typeorm/entities/filme';
import { FilmesRepository } from '../typeorm/repositories/filmesRepository';

class GetFilmesService {
  private filmesRepository = FilmesRepository;

  async excute(): Promise<Filme[]> {
    const filmes = this.filmesRepository.find({
      relations: ['generos', 'atores'],
    });
    return filmes;
  }

  async buscarFilmesPorGenero(genero: string): Promise<Filme[] | null> {
    const filmes = await this.filmesRepository.findByGenero(genero);

    return filmes;
  }

  async buscarFilmesPorAtor(ator: string): Promise<Filme[] | null> {
    const filmes = await this.filmesRepository.findByAtor(ator);

    return filmes;
  }
}

export default GetFilmesService;
