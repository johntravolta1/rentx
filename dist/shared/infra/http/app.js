"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.app = void 0;

require("reflect-metadata");

require("dotenv/config");

var _express = _interopRequireDefault(require("express"));

require("express-async-errors");

var _categories = require("./routes/categories.routes");

var _specifications = require("./routes/specifications.routes");

var _swaggerUiExpress = _interopRequireDefault(require("swagger-ui-express"));

var _swagger = _interopRequireDefault(require("../../../swagger.json"));

require("../typeorm");

require("../../container");

var _users = require("./routes/users.routes");

var _authenticate = require("./routes/authenticate.routes");

var _AppError = require("../../errors/AppError");

var _car = require("./routes/car.routes");

var _rental = require("./routes/rental.routes");

var _password = require("./routes/password.routes");

var _upload = _interopRequireDefault(require("../../../config/upload"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import { AppDataSource } from "./database";
// AppDataSource.initialize().then(async () => {
//     console.log('ain jackson')
// })
const app = (0, _express.default)();
exports.app = app;
app.use(_express.default.json());
app.use("/categories", _categories.categoriesRoutes);
app.use("/specifications", _specifications.specificationsRoutes);
app.use('/users', _users.usersRoutes);
app.use(_authenticate.authenticateRoutes);
app.use('/cars', _car.carsRoutes);
app.use('/rentals', _rental.rentalRoutes);
app.use('/password', _password.passwordRoutes);
app.use('/avatar', _express.default.static(`${_upload.default.tmpFolder}/avatar`));
app.use('/cars', _express.default.static(`${_upload.default.tmpFolder}/cars`));
app.use("/api-docs", _swaggerUiExpress.default.serve, _swaggerUiExpress.default.setup(_swagger.default));
app.post("/courses", (request, response) => {
  const {
    name
  } = request.body;
  return response.json({
    name
  });
});
app.use((err, request, response, next) => {
  if (err instanceof _AppError.AppError) {
    return response.status(err.statusCode).json({
      message: err.message
    });
  }

  return response.status(500).json({
    status: 'error',
    message: `Internal server error = ${err.message}`
  });
});