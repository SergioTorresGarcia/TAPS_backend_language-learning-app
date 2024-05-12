import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class Words1714393188539 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "words",
                columns: [
                    {
                        name: "id",
                        type: "int",
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: "increment",
                    },
                    {
                        name: "EN",
                        type: "varchar",
                        length: "100",
                        isNullable: false
                    },
                    {
                        name: "JP",
                        type: "varchar",
                        length: "100",
                        isNullable: false,
                        isUnique: true
                    },
                    {
                        name: "romanji",
                        type: "varchar",
                        length: "100",
                        isNullable: false
                    },
                    {
                        name: "image",
                        type: "varchar",
                        length: "100",
                        isNullable: false
                    },
                    {
                        name: "level_id",
                        type: "int"
                    },
                    {
                        name: "created_at",
                        type: "timestamp",
                        default: "now()",
                    },
                    {
                        name: "updated_at",
                        type: "timestamp",
                        default: "now()",
                        onUpdate: "now()"
                    }
                ],
                foreignKeys: [
                    {
                        columnNames: ["level_id"],
                        referencedTableName: "levels",
                        referencedColumnNames: ["id"],
                        onDelete: "CASCADE"
                    }
                ]
            }),
            true
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('words');
    }

}
