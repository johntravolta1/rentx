"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.rentalRoutes = void 0;

var _express = require("express");

var _CreateRentalController = require("../../../../modules/rentals/useCases/createRental/CreateRentalController");

var _ensureAuthentication = require("../middlewares/ensureAuthentication");

var _DevolutionRentalController = require("../../../../modules/rentals/useCases/devolutionRental/DevolutionRentalController");

var _ListRentalsByUserController = require("../../../../modules/rentals/useCases/listRentalsByUser/ListRentalsByUserController");

const rentalRoutes = (0, _express.Router)();
exports.rentalRoutes = rentalRoutes;
const createRentalController = new _CreateRentalController.CreateRentalController();
const devolutionRentalController = new _DevolutionRentalController.DevolutionRentalController();
const listRentalsByUserController = new _ListRentalsByUserController.ListRentalsByUserController();
rentalRoutes.post('/', _ensureAuthentication.ensureAuthenticated, createRentalController.handle);
rentalRoutes.post('/devolution/:id', _ensureAuthentication.ensureAuthenticated, devolutionRentalController.handle);
rentalRoutes.get('/user', _ensureAuthentication.ensureAuthenticated, listRentalsByUserController.handle);