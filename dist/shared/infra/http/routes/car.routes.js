"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.carsRoutes = void 0;

var _express = require("express");

var _multer = _interopRequireDefault(require("multer"));

var _CreateCarController = require("../../../../modules/cars/useCases/createCar/CreateCarController");

var _CreateCarSpecificationController = require("../../../../modules/cars/useCases/createCarSpecification/CreateCarSpecificationController");

var _ListAvailableCarsController = require("../../../../modules/cars/useCases/listAvailableCars/ListAvailableCarsController");

var _UploadCarImageController = require("../../../../modules/cars/useCases/uploadCarImage/UploadCarImageController");

var _ensureAdmin = require("../middlewares/ensureAdmin");

var _ensureAuthentication = require("../middlewares/ensureAuthentication");

var _upload = _interopRequireDefault(require("../../../../config/upload"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const carsRoutes = (0, _express.Router)();
exports.carsRoutes = carsRoutes;
let createCarController = new _CreateCarController.CreateCarController();
let listAvailableCarsController = new _ListAvailableCarsController.ListAvailableCarsController();
let createCarSpecificationController = new _CreateCarSpecificationController.CreateCarSpecificationController();
let uploadCarImagesController = new _UploadCarImageController.UploadCarImageController();
const upload = (0, _multer.default)(_upload.default);
carsRoutes.post('/', _ensureAuthentication.ensureAuthenticated, _ensureAdmin.ensureAdmin, createCarController.handle);
carsRoutes.get('/available', listAvailableCarsController.handle);
carsRoutes.post('/specifications/:id', _ensureAuthentication.ensureAuthenticated, _ensureAdmin.ensureAdmin, createCarSpecificationController.handle);
carsRoutes.post('/images/:id', _ensureAuthentication.ensureAuthenticated, _ensureAdmin.ensureAdmin, upload.array('images'), uploadCarImagesController.handle);