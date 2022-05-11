"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateCars1650136475472 = void 0;
const typeorm_1 = require("typeorm");
class CreateCars1650136475472 {
    async up(queryRunner) {
        await queryRunner.createTable(new typeorm_1.Table({
            name: 'cars',
            columns: [
                {
                    name: 'id',
                    type: 'uuid',
                    isPrimary: true
                },
                {
                    name: 'name',
                    type: 'varchar'
                },
                {
                    name: 'description',
                    type: 'varchar'
                },
                {
                    name: 'daily_rate',
                    type: 'numeric'
                },
                {
                    name: 'available',
                    type: 'boolean',
                    default: true,
                },
                {
                    name: 'license_plate',
                    type: 'varchar'
                },
                {
                    name: 'fine_amount',
                    type: 'varchar'
                },
                {
                    name: 'brand',
                    type: 'varchar'
                },
                {
                    name: 'category_id',
                    type: 'uuid',
                    isNullable: true
                },
                {
                    name: 'created_at',
                    type: 'timestamp',
                    default: 'now()'
                },
            ],
            foreignKeys: [
                {
                    name: 'FKCategoryCar',
                    referencedTableName: 'categories',
                    referencedColumnNames: ['id'],
                    columnNames: ['category_id'],
                    onDelete: 'SET NULL',
                    onUpdate: 'SET NULL'
                }
            ]
        }));
    }
    async down(queryRunner) {
        await queryRunner.dropTable('cars');
    }
}
exports.CreateCars1650136475472 = CreateCars1650136475472;
