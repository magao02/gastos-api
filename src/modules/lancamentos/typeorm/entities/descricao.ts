import Empresa from '@modules/empresas/typeorm/entities/empresa';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import Lancamento from './lancamento';

@Entity('descricoes')
class Descricao {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  descricao: string;

  @ManyToOne(() => Empresa, empresa => empresa.descricoes)
  empresa: Empresa;

  @OneToMany(() => Lancamento, lancamento => lancamento.empresa)
  lancamentos: Lancamento[];
}

export default Descricao;
