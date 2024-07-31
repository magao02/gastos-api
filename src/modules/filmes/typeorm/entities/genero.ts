/**
 * @swagger
 * components:
 *   schemas:
 *     Genero:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *           example: 123e4567-e89b-12d3-a456-426614174000
 *         nome:
 *           type: string
 *           example: Ação
 *         filmes:
 *           type: array
 *           items:
 *             $ref: './modules/filmes/typeorm/entities/filme.ts#'
 */
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import Filme from './filme';

@Entity('Generos')
class Genero {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  nome: string;

  @ManyToMany(() => Filme, filme => filme.generos)
  filmes: Filme[];
}

export default Genero;
