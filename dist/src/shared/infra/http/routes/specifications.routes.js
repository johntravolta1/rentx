"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.specificationsRoutes = void 0;
const express_1 = require("express");
const ensureAuthentication_1 = require("../middlewares/ensureAuthentication");
const createSpecificationController_1 = require("../../../../modules/cars/useCases/createSpecification/createSpecificationController");
const ensureAdmin_1 = require("../middlewares/ensureAdmin");
const specificationsRoutes = (0, express_1.Router)();
exports.specificationsRoutes = specificationsRoutes;
const createSpecificationController = new createSpecificationController_1.CreateSpecificationController();
specificationsRoutes.post("/", ensureAuthentication_1.ensureAuthenticated, ensureAdmin_1.ensureAdmin, createSpecificationController.handle);
