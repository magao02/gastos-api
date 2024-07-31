import { dataSource } from '@shared/typeorm';
import Filme from '../entities/filme';

export const FilmesRepository = dataSource.getRepository(Filme).extend({
  async findByNome(nome: string): Promise<Filme | null> {
    const filme = this.findOne({
      where: { nome },
      relations: ['generos', 'atores'],
    });
    return filme;
  },

  async findByDiretor(diretor: string): Promise<Filme | null> {
    const filme = this.findOne({ where: { diretor }, relations: ['generos'] });
    return filme;
  },

  async findByGenero(genero: string): Promise<Filme[] | null> {
    const filmes = this.createQueryBuilder('filme')
      .innerJoinAndSelect('filme.generos', 'genero')
      .innerJoinAndSelect('filme.atores', 'ator')
      .where('genero.nome = :genero', { genero })
      .getMany();

    return filmes;
  },

  async findByAtor(ator: string): Promise<Filme[] | null> {
    const filmes = this.createQueryBuilder('filme')
      .innerJoinAndSelect('filme.generos', 'genero')
      .innerJoinAndSelect('filme.atores', 'ator')
      .where('ator.nome = :ator', { ator })
      .getMany();
    return filmes;
  },

  async calcularMediaNotas(filme: string): Promise<number> {
    const query = `
      SELECT AVG(n.valor) AS media
      FROM "Filmes" f 
      LEFT JOIN "Notas" n  ON n.filme = f.id
      WHERE f.id = $1
    `;
    const result = await this.query(query, [filme]);

    // O resultado pode ser null se não houver notas para o filme
    return result.media || 0; // Retorna a média ou 0 se não houver notas
  },
});
