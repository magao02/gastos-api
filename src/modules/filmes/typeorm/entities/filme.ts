/**
 * @swagger
 * components:
 *   schemas:
 *     Filme:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *           example: 123e4567-e89b-12d3-a456-426614174000
 *         nome:
 *           type: string
 *           example: Matrix
 *         diretor:
 *           type: string
 *           example: Wachowski Brothers
 *         sinopse:
 *           type: string
 *           example: Em um futuro distópico, Neo descobre a verdade sobre a realidade.
 *         capa:
 *           type: string
 *           nullable: true
 *           example: https://exemplo.com/capa.png
 *         anoLancamento:
 *           type: integer
 *           example: 1999
 *         duracao:
 *           type: integer
 *           example: 136
 *         classificacao:
 *           type: integer
 *           example: 14
 *         generos:
 *           type: array
 *           items:
 *             $ref: './modules/filmes/typeorm/entities/genero.ts#'
 *         atores:
 *           type: array
 *           items:
 *             $ref: './modules/filmes/typeorm/entities/ator.ts#'
 *         notas:
 *           type: array
 *           items:
 *             $ref: './modules/notas/typeorm/entities/nota.ts#'
 */
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import Genero from './genero';
import Ator from './ator';
import Nota from '@modules/notas/typeorm/entities/nota';

@Entity('Filmes')
class Filme {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  nome: string;

  @Column()
  diretor: string;

  @Column()
  sinopse: string;

  @Column({ nullable: true })
  capa: string;

  @Column({ nullable: true })
  anoLancamento: number;

  @Column()
  duracao: number;

  @Column()
  classificacao: number;

  @JoinTable({
    name: 'filmes_generos',
  })
  @ManyToMany(() => Genero, genero => genero.filmes, {
    cascade: true,
  })
  generos: Genero[];

  @JoinTable({ name: 'filmes_atores' })
  @ManyToMany(() => Ator, ator => ator.filmes, {
    cascade: true,
  })
  atores: Ator[];

  @OneToMany(() => Nota, nota => nota.filme, { nullable: true })
  notas: Nota[];

  @Column({ nullable: true })
  mediaNotas: number;
}

export default Filme;
