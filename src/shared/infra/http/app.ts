import 'reflect-metadata'
import 'dotenv/config'
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
import upload from '../../../config/upload';
import cors from 'cors'
import rateLimiter from './middlewares/rateLimiter';

import * as Sentry from "@sentry/node";
import * as Tracing from "@sentry/tracing";
// import { AppDataSource } from "./database";

// AppDataSource.initialize().then(async () => {
//     console.log('ain jackson')
// })

const app = express();

app.use(cors())
// app.use(rateLimiter) //é preciso rodar o docker para ligar o serviço do redis (rate limiter) - docker-compose up


Sentry.init({
    dsn: "https://293e27b795244c2486440d0dd9b98bc8@o1249513.ingest.sentry.io/6410319",
    integrations: [
      new Sentry.Integrations.Http({ tracing: true }),
      new Tracing.Integrations.Express({ app }),
    ],
    tracesSampleRate: 1.0,
  });

  app.use(Sentry.Handlers.requestHandler());
  app.use(Sentry.Handlers.tracingHandler());
  
  
  app.use(express.json());
  
app.use(Sentry.Handlers.errorHandler())

app.use("/categories", categoriesRoutes)
app.use("/specifications", specificationsRoutes)
app.use('/users', usersRoutes)
app.use(authenticateRoutes)
app.use('/cars', carsRoutes)
app.use('/rentals', rentalRoutes)
app.use('/password', passwordRoutes)
app.use('/avatar', express.static(`${upload.tmpFolder}/avatar`))
app.use('/cars', express.static(`${upload.tmpFolder}/cars`))


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