import Empresa from '@modules/empresas/typeorm/entities/empresa';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('lancamentos')
class Lancamento {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  descricao: string;

  @Column()
  valor: number;

  @Column()
  data: Date;

  @Column()
  tipo: 'receita' | 'despesa';

  @Column({ nullable: true })
  comprovante: string;

  @ManyToOne(() => Empresa, empresa => empresa.lancamentos)
  empresa: Empresa;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Lancamento;
