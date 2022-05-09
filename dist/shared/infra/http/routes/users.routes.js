"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.usersRoutes = void 0;

var _express = require("express");

var _multer = _interopRequireDefault(require("multer"));

var _CreateUserController = require("../../../../modules/accounts/useCases/createUser/CreateUserController");

var _UpdataUserAvatarController = require("../../../../modules/accounts/useCases/updateUserAvatar/UpdataUserAvatarController");

var _upload = _interopRequireDefault(require("../../../../config/upload"));

var _ensureAuthentication = require("../middlewares/ensureAuthentication");

var _ProfileUserController = require("../../../../modules/accounts/useCases/profileUserUseCase/ProfileUserController");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const usersRoutes = (0, _express.Router)();
exports.usersRoutes = usersRoutes;
const uploadAvatar = (0, _multer.default)(_upload.default);
const createUserController = new _CreateUserController.CreateUserController();
const updateUserAvatarController = new _UpdataUserAvatarController.UpdateUserAvatarController();
const profileUserController = new _ProfileUserController.ProfileUserController();
usersRoutes.post("/", createUserController.handle);
usersRoutes.patch('/avatar', _ensureAuthentication.ensureAuthenticated, uploadAvatar.single('avatar'), updateUserAvatarController.handle);
usersRoutes.get('/profile', _ensureAuthentication.ensureAuthenticated, profileUserController.handle);