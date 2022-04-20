import "reflect-metadata"
import { Connection, createConnection, getConnection, getConnectionOptions } from "typeorm"


// interface IOptions {
//     host: string;
// }

// getConnectionOptions().then((options) => {
//     const newOptions  = options as IOptions
//     newOptions.host = 'database';
//     createConnection({
//         ...options
//     })
// })


createConnection();

export default async() : Promise<Connection> => {
    return createConnection();
}


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
