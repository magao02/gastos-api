import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateFilmesTable1720184633073 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');
    await queryRunner.createTable(
      new Table({
        name: 'Filmes',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'nome',
            type: 'varchar',
          },
          {
            name: 'diretor',
            type: 'varchar',
          },
          {
            name: 'sinopse',
            type: 'varchar',
          },
          {
            name: 'capa',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'anoLancamento',
            type: 'int',
          },
          {
            name: 'duracao',
            type: 'int',
          },
          {
            name: 'classificacao',
            type: 'int',
          },
          {
            name: 'mediaNotas',
            type: 'float',
            isNullable: true,
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('Filmes');
  }
}
