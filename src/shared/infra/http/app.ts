import 'reflect-metadata'
import express, { NextFunction, Request, Response } from "express";
import 'express-async-errors'
import { categoriesRoutes } from "./routes/categories.routes";
import { specificationsRoutes } from "./routes/specifications.routes";

import swaggerUi from 'swagger-ui-express'
import swaggerFile from '../../../swagger.json'

import '../typeorm'
import '../../container'
import { usersRoutes } from './routes/users.routes';
import { authenticateRoutes } from './routes/authenticate.routes';
import { AppError } from '../../errors/AppError';
import { carsRoutes } from './routes/car.routes';
import { rentalRoutes } from './routes/rental.routes';
import { passwordRoutes } from './routes/password.routes';
// import { AppDataSource } from "./database";

// AppDataSource.initialize().then(async () => {
//     console.log('ain jackson')
// })

const app = express();
app.use(express.json());

app.use("/categories", categoriesRoutes)
app.use("/specifications", specificationsRoutes)
app.use('/users', usersRoutes)
app.use(authenticateRoutes)
app.use('/cars', carsRoutes)
app.use('/rentals', rentalRoutes)
app.use('/password', passwordRoutes)


app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile))

app.post("/courses", (request, response) => {
    const { name} = request.body;
    return response.json({name})
})


app.use((err: Error, request: Request, response: Response, next: NextFunction) => {
    if(err instanceof AppError) {
        return response.status(err.statusCode).json({
            message: err.message
        })
    }

    return response.status(500).json({
        status: 'error',
        message: `Internal server error = ${err.message}`,
    })
})

export { app}