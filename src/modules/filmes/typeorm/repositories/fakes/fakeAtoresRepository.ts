import Ator from '../../entities/ator';
import { v4 as uuidv4 } from 'uuid';

interface IAtoresRepository {
  findByNome(nome: string): Promise<Ator | null>;
  create(nome: string): Promise<Ator>;
}

class AtoresRepository implements IAtoresRepository {
  private atores: Ator[] = [];

  public async findByNome(nome: string): Promise<Ator | null> {
    const ator = this.atores.find(ator => ator.nome === nome);
    return ator || null;
  }

  public async create(nome: string): Promise<Ator> {
    const ator = new Ator();
    ator.nome = nome;
    ator.id = uuidv4();
    this.atores.push(ator);
    return ator;
  }
}

export default AtoresRepository;
