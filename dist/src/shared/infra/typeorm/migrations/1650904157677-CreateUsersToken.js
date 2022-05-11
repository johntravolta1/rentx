"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateUsersToken1650904157677 = void 0;
const typeorm_1 = require("typeorm");
class CreateUsersToken1650904157677 {
    async up(queryRunner) {
        await queryRunner.createTable(new typeorm_1.Table({
            name: 'users_tokens',
            columns: [
                { name: 'id', type: 'uuid', isPrimary: true },
                { name: 'refresh_token', type: 'varchar' },
                { name: 'user_id', type: 'uuid' },
                { name: 'expires_date', type: 'timestamp' },
                { name: 'created_at', type: 'timestamp', default: 'now()' }
            ],
            foreignKeys: [
                {
                    name: 'FKUserToken',
                    referencedTableName: 'users',
                    referencedColumnNames: ['id'],
                    columnNames: ['user_id'],
                    onDelete: 'CASCADE',
                    onUpdate: 'CASCADE'
                }
            ]
        }));
    }
    async down(queryRunner) {
        await queryRunner.dropTable('users_tokens');
    }
}
exports.CreateUsersToken1650904157677 = CreateUsersToken1650904157677;
