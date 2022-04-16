import "reflect-metadata"
import { createConnection } from "typeorm"

createConnection();
// import { DataSource } from "typeorm"

// export const AppDataSource = new DataSource({
//     type: "postgres",
//     host: "localhost",
//     port: 5432,
//     username: "postgres",
//     password: "admin",
//     database: "rentx",
//     synchronize: true,
//     logging: false,
//     migrations: ['./src/database/migrations/*.ts']
// })
