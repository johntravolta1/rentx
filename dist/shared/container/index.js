"use strict";

var _tsyringe = require("tsyringe");

var _UsersRepository = require("../../modules/accounts/infra/typeorm/repositories/UsersRepository");

var _CategoriesRepository = require("../../modules/cars/infra/typeorm/repositories/CategoriesRepository");

require("./providers/");

var _SpecificationsRepostory = require("../../modules/cars/infra/typeorm/repositories/SpecificationsRepostory");

var _CarsRepository = require("../../modules/cars/infra/typeorm/repositories/CarsRepository");

var _CarsImageRepository = require("../../modules/cars/infra/typeorm/repositories/CarsImageRepository");

var _RentalsRepository = require("../../modules/rentals/infra/typeorm/repositories/RentalsRepository");

var _UsersTokenRepository = require("../../modules/accounts/infra/typeorm/repositories/UsersTokenRepository");

_tsyringe.container.registerSingleton("CategoriesRepository", _CategoriesRepository.CategoriesRepository);

_tsyringe.container.registerSingleton("SpecificationsRepository", _SpecificationsRepostory.SpecificationsRepository);

_tsyringe.container.registerSingleton("UsersRepository", _UsersRepository.UsersRepository);

_tsyringe.container.registerSingleton('CarsRepository', _CarsRepository.CarsRepository);

_tsyringe.container.registerSingleton('CarsImageRepository', _CarsImageRepository.CarsImageRepository);

_tsyringe.container.registerSingleton('RentalsRepository', _RentalsRepository.RentalsRepository);

_tsyringe.container.registerSingleton('UsersTokenRepository', _UsersTokenRepository.UsersTokensRepository);