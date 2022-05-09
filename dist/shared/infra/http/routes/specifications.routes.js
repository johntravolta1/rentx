"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.specificationsRoutes = void 0;

var _express = require("express");

var _ensureAuthentication = require("../middlewares/ensureAuthentication");

var _createSpecificationController = require("../../../../modules/cars/useCases/createSpecification/createSpecificationController");

var _ensureAdmin = require("../middlewares/ensureAdmin");

const specificationsRoutes = (0, _express.Router)();
exports.specificationsRoutes = specificationsRoutes;
const createSpecificationController = new _createSpecificationController.CreateSpecificationController();
specificationsRoutes.post("/", _ensureAuthentication.ensureAuthenticated, _ensureAdmin.ensureAdmin, createSpecificationController.handle);