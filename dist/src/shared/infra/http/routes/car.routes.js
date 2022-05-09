"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.carsRoutes = void 0;
const express_1 = require("express");
const multer_1 = __importDefault(require("multer"));
const CreateCarController_1 = require("../../../../modules/cars/useCases/createCar/CreateCarController");
const CreateCarSpecificationController_1 = require("../../../../modules/cars/useCases/createCarSpecification/CreateCarSpecificationController");
const ListAvailableCarsController_1 = require("../../../../modules/cars/useCases/listAvailableCars/ListAvailableCarsController");
const UploadCarImageController_1 = require("../../../../modules/cars/useCases/uploadCarImage/UploadCarImageController");
const ensureAdmin_1 = require("../middlewares/ensureAdmin");
const ensureAuthentication_1 = require("../middlewares/ensureAuthentication");
const upload_1 = __importDefault(require("../../../../config/upload"));
const carsRoutes = (0, express_1.Router)();
exports.carsRoutes = carsRoutes;
let createCarController = new CreateCarController_1.CreateCarController();
let listAvailableCarsController = new ListAvailableCarsController_1.ListAvailableCarsController();
let createCarSpecificationController = new CreateCarSpecificationController_1.CreateCarSpecificationController();
let uploadCarImagesController = new UploadCarImageController_1.UploadCarImageController();
const upload = (0, multer_1.default)(upload_1.default);
carsRoutes.post('/', ensureAuthentication_1.ensureAuthenticated, ensureAdmin_1.ensureAdmin, createCarController.handle);
carsRoutes.get('/available', listAvailableCarsController.handle);
carsRoutes.post('/specifications/:id', ensureAuthentication_1.ensureAuthenticated, ensureAdmin_1.ensureAdmin, createCarSpecificationController.handle);
carsRoutes.post('/images/:id', ensureAuthentication_1.ensureAuthenticated, ensureAdmin_1.ensureAdmin, upload.array('images'), uploadCarImagesController.handle);