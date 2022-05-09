

import { hash } from 'bcrypt'
import {v4 as uuidv4} from 'uuid'
import request from 'supertest'
import { Connection, createConnection } from 'typeorm'
import { app } from '../../../../shared/infra/http/app'

let connection: Connection

describe('Create Category Controller', () => {

    beforeAll(async ()=> {
        connection = await createConnection( {
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
        })
        await connection.runMigrations()

        const id = uuidv4();
        const password = await hash('admin', 8)
        
        await connection.query(
            `INSERT INTO users (
                id, name, password, email, driver_license, "isAdmin", created_at, avatar)
                VALUES ('${id}', 'admin', '${password}', 'admin@rentx.com.br', '', true, 'now()', '');`
                )
    })

    afterAll(async () => {
        await connection.dropDatabase()
        await connection.close()
    })

    it('should be able to create a new category', async () => {
        const responseToken = await request(app).post('/sessions').send({
            email: 'admin@rentx.com.br',
            password: 'admin'
        })

        const {refresh_token } = responseToken.body
        

        const response = await request(app).post('/categories').send({
            name: 'Categories Supertest',
            description: 'Supertest description'
        }).set({
            Authorization: `Bearer ${refresh_token}`
        })
        const response2 = await request(app).get('/categories')

        expect(response.status).toBe(201);
    })

    it('should not be able to create a new category with and existing name', async () => {
        const responseToken = await request(app).post('/sessions').send({
            email: 'admin@rentx.com.br',
            password: 'admin'
        })

        const {refresh_token } = responseToken.body
        

        const response2 = await request(app).get('/categories')

        const response = await request(app).post('/categories').send({
            name: 'Categories Supertest',
            description: 'Supertest description'
        }).set({
            Authorization: `Bearer ${refresh_token}`
        })

        expect(response.status).toBe(400);
    })
})