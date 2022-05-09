"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = require("bcrypt");
const uuid_1 = require("uuid");
const supertest_1 = __importDefault(require("supertest"));
const typeorm_1 = require("typeorm");
const app_1 = require("../../../../shared/infra/http/app");
let connection;
describe('List categories', () => {
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        connection = yield (0, typeorm_1.createConnection)({
            type: "postgres",
            port: 5432,
            host: "localhost",
            username: "postgres",
            database: "rentx_test",
            migrations: ["./src/shared/infra/typeorm/migrations/*.ts"],
            entities: ["./src/modules/**/entities/*.ts"],
            cli: {
                "migrationsDir": "./src/shared/infra/typeorm/migrations"
            }
        });
        yield connection.runMigrations();
        const id = (0, uuid_1.v4)();
        const password = yield (0, bcrypt_1.hash)('admin', 8);
        yield connection.query(`INSERT INTO users (
                id, name, password, email, driver_license, "isAdmin", created_at, avatar)
                VALUES ('${id}', 'admin', '${password}', 'admin@rentx.com.br', '', true, 'now()', '');`);
    }));
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield connection.dropDatabase();
        yield connection.close();
    }));
    it('should be able to list all categories', () => __awaiter(void 0, void 0, void 0, function* () {
        const responseToken = yield (0, supertest_1.default)(app_1.app).post('/sessions').send({
            email: 'admin@rentx.com.br',
            password: 'admin'
        });
        const { refresh_token } = responseToken.body;
        yield (0, supertest_1.default)(app_1.app).post('/categories').send({
            name: 'List Supertest',
            description: 'Supertest description'
        }).set({
            Authorization: `Bearer ${refresh_token}`
        });
        let response = yield (0, supertest_1.default)(app_1.app).get('/categories');
        while (response.body.length < 1) {
            response = yield (0, supertest_1.default)(app_1.app).get('/categories');
        }
        expect(response.status).toBe(200);
        expect(response.body.length).toBe(1);
        expect(response.body[0]).toHaveProperty('id');
        expect(response.body[0].name).toEqual('List Supertest');
    }));
});