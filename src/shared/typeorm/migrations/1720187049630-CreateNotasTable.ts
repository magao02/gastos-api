import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CreateNotasTable1720187049630 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'Notas',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'valor',
            type: 'int',
          },
          {
            name: 'filme',
            type: 'uuid',
          },
          {
            name: 'usuario',
            type: 'uuid',
          },
        ],
      }),
    );

    // Adicionando chave estrangeira para Filme
    await queryRunner.createForeignKey(
      'Notas',
      new TableForeignKey({
        columnNames: ['filme'],
        referencedColumnNames: ['id'],
        referencedTableName: 'Filmes',
        onDelete: 'CASCADE',
      }),
    );

    // Adicionando chave estrangeira para User
    await queryRunner.createForeignKey(
      'Notas',
      new TableForeignKey({
        columnNames: ['usuario'],
        referencedColumnNames: ['id'],
        referencedTableName: 'users',
        onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('Notas');
  }
}
