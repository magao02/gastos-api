import Empresa from '@modules/empresas/typeorm/entities/empresa';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import Descricao from './descricao';

@Entity('lancamentos')
class Lancamento {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'float',
  })
  valor: number;

  @Column()
  data: Date;

  @Column()
  tipo: 'recebimento' | 'despesa';

  @Column()
  banco: string;

  @Column({ nullable: true })
  comprovante: string;

  @ManyToOne(() => Empresa, empresa => empresa.lancamentos)
  empresa: Empresa;

  @ManyToOne(() => Descricao, descricao => descricao.lancamentos)
  descricao: Descricao;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Lancamento;
