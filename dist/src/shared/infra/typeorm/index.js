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
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const typeorm_1 = require("typeorm");
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
    console.log('Process env de teste');
    (0, typeorm_1.createConnection)({
        type: "postgres",
        port: 5432,
        host: "localhost",
        username: "postgres",
        database: "rentx_test",
    });
}
else {
    console.log('Process env de prod');
    (0, typeorm_1.createConnection)();
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
exports.default = () => __awaiter(void 0, void 0, void 0, function* () {
    return (0, typeorm_1.createConnection)();
});
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
