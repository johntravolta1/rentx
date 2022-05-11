"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateCarImages1650465548201 = void 0;
const typeorm_1 = require("typeorm");
class CreateCarImages1650465548201 {
    async up(queryRunner) {
        await queryRunner.createTable(new typeorm_1.Table({
            name: 'cars_image',
            columns: [
                { name: 'id', type: 'uuid', isPrimary: true },
                { name: 'car_id', type: 'uuid' },
                { name: 'image_name', type: 'varchar' },
                { name: 'created_at', type: 'timestamp', default: 'now()' }
            ],
            foreignKeys: [
                { name: 'FKCarImage', referencedTableName: 'cars', referencedColumnNames: ['id'],
                    columnNames: ['car_id'], onDelete: 'SET NULL', onUpdate: 'SET NULL' }
            ]
        }));
    }
    async down(queryRunner) {
        await queryRunner.dropTable('cars_image');
    }
}
exports.CreateCarImages1650465548201 = CreateCarImages1650465548201;
