import "reflect-metadata"
import { Connection, createConnection, createConnections, getConnection, getConnectionOptions } from "typeorm"


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




if (process.env.NODE_ENV === 'test') {
    console.log('Process env de teste')
    createConnection(
        {
            type: "postgres",
            port: 5432,
            host: "localhost",
            username: "postgres",
            database: "rentx_test",
        }
    )
}
else {
    console.log('Process env de prod')
    createConnection()
}







// createConnections([
//     {
//         name:"def1",
//         type: "postgres",
//         port: 5432,
//         host: "localhost",
//         username: "postgres",
//         database: "rentx",
//     },
//     {
//         name:"def2",
//         type: "postgres",
//         port: 5432,
//         host: "localhost",
//         username: "postgres",
//         database: "rentx_test",
//     }
// ])


// createConnection();

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
