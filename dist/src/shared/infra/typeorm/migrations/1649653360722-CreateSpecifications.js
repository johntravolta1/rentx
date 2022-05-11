"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateSpecifications1649653360722 = void 0;
const typeorm_1 = require("typeorm");
class CreateSpecifications1649653360722 {
    async up(queryRunner) {
        await queryRunner.createTable(new typeorm_1.Table({
            name: "specifications",
            columns: [
                {
                    name: "id",
                    type: "uuid",
                    isPrimary: true
                },
                {
                    name: "name",
                    type: "varchar"
                },
                {
                    name: "description",
                    type: "varchar"
                },
                {
                    name: "created_at",
                    type: "timestamp",
                    default: "now()",
                },
            ]
        }));
    }
    async down(queryRunner) {
        await queryRunner.dropTable("specifications");
    }
}
exports.CreateSpecifications1649653360722 = CreateSpecifications1649653360722;
