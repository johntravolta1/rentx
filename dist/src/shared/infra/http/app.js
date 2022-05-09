"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
require("reflect-metadata");
require("dotenv/config");
const express_1 = __importDefault(require("express"));
require("express-async-errors");
const categories_routes_1 = require("./routes/categories.routes");
const specifications_routes_1 = require("./routes/specifications.routes");
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swagger_json_1 = __importDefault(require("../../../swagger.json"));
require("../typeorm");
require("../../container");
const users_routes_1 = require("./routes/users.routes");
const authenticate_routes_1 = require("./routes/authenticate.routes");
const AppError_1 = require("../../errors/AppError");
const car_routes_1 = require("./routes/car.routes");
const rental_routes_1 = require("./routes/rental.routes");
const password_routes_1 = require("./routes/password.routes");
const upload_1 = __importDefault(require("../../../config/upload"));
// import { AppDataSource } from "./database";
// AppDataSource.initialize().then(async () => {
//     console.log('ain jackson')
// })
const app = (0, express_1.default)();
exports.app = app;
app.use(express_1.default.json());
app.use("/categories", categories_routes_1.categoriesRoutes);
app.use("/specifications", specifications_routes_1.specificationsRoutes);
app.use('/users', users_routes_1.usersRoutes);
app.use(authenticate_routes_1.authenticateRoutes);
app.use('/cars', car_routes_1.carsRoutes);
app.use('/rentals', rental_routes_1.rentalRoutes);
app.use('/password', password_routes_1.passwordRoutes);
app.use('/avatar', express_1.default.static(`${upload_1.default.tmpFolder}/avatar`));
app.use('/cars', express_1.default.static(`${upload_1.default.tmpFolder}/cars`));
app.use("/api-docs", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swagger_json_1.default));
app.post("/courses", (request, response) => {
    const { name } = request.body;
    return response.json({ name });
});
app.use((err, request, response, next) => {
    if (err instanceof AppError_1.AppError) {
        return response.status(err.statusCode).json({
            message: err.message
        });
    }
    return response.status(500).json({
        status: 'error',
        message: `Internal server error = ${err.message}`,
    });
});
