"use strict";

var _bcrypt = require("bcrypt");

var _uuid = require("uuid");

var _supertest = _interopRequireDefault(require("supertest"));

var _typeorm = require("typeorm");

var _app = require("../../../../shared/infra/http/app");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let connection;
describe('List categories', () => {
  beforeAll(async () => {
    connection = await (0, _typeorm.createConnection)({
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
    await connection.runMigrations();
    const id = (0, _uuid.v4)();
    const password = await (0, _bcrypt.hash)('admin', 8);
    await connection.query(`INSERT INTO users (
                id, name, password, email, driver_license, "isAdmin", created_at, avatar)
                VALUES ('${id}', 'admin', '${password}', 'admin@rentx.com.br', '', true, 'now()', '');`);
  });
  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });
  it('should be able to list all categories', async () => {
    const responseToken = await (0, _supertest.default)(_app.app).post('/sessions').send({
      email: 'admin@rentx.com.br',
      password: 'admin'
    });
    const {
      refresh_token
    } = responseToken.body;
    await (0, _supertest.default)(_app.app).post('/categories').send({
      name: 'List Supertest',
      description: 'Supertest description'
    }).set({
      Authorization: `Bearer ${refresh_token}`
    });
    let response = await (0, _supertest.default)(_app.app).get('/categories');

    while (response.body.length < 1) {
      response = await (0, _supertest.default)(_app.app).get('/categories');
    }

    expect(response.status).toBe(200);
    expect(response.body.length).toBe(1);
    expect(response.body[0]).toHaveProperty('id');
    expect(response.body[0].name).toEqual('List Supertest');
  });
});