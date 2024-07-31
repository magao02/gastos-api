/**
 * @swagger
 * components:
 *   schemas:
 *     Ator:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *           example: 123e4567-e89b-12d3-a456-426614174000
 *         nome:
 *           type: string
 *           example: Keanu Reeves
 *         filmes:
 *           type: array
 *           items:
 *             $ref: './modules/filmes/typeorm/entities/filme.ts#/components/schemas/Filme'
 */
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import Filme from './filme';

@Entity('Atores')
class Ator {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  nome: string;

  @ManyToMany(() => Filme, filme => filme.atores)
  filmes: Filme[];
}

export default Ator;
