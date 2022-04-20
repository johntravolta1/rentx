import { Router } from "express";
import multer from "multer";
import { CreateCarController } from "../../../../modules/cars/useCases/createCar/CreateCarController";
import { CreateCarSpecificationController } from "../../../../modules/cars/useCases/createCarSpecification/CreateCarSpecificationController";
import { ListAvailableCarsController } from "../../../../modules/cars/useCases/listAvailableCars/ListAvailableCarsController";
import { UploadCarImageController } from "../../../../modules/cars/useCases/uploadCarImage/UploadCarImageController";
import { ensureAdmin } from "../middlewares/ensureAdmin";
import { ensureAuthenticated } from "../middlewares/ensureAuthentication";
import uploadConfig from '../../../../config/upload'

const carsRoutes = Router()

let createCarController = new CreateCarController()
let listAvailableCarsController = new ListAvailableCarsController()
let createCarSpecificationController = new CreateCarSpecificationController()
let uploadCarImagesController = new UploadCarImageController()

const upload = multer(uploadConfig.upload('./tmp/cars'))

carsRoutes.post('/',ensureAuthenticated, ensureAdmin, createCarController.handle)

carsRoutes.get('/available', listAvailableCarsController.handle)

carsRoutes.post('/specifications/:id', ensureAuthenticated, ensureAdmin, createCarSpecificationController.handle)

carsRoutes.post('/images/:id', ensureAuthenticated, ensureAdmin, upload.array('images'), uploadCarImagesController.handle )
export {carsRoutes}