"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.passwordRoutes = void 0;

var _express = require("express");

var _ResetPasswordUserController = require("../../../../modules/accounts/useCases/resetPasswordUser/ResetPasswordUserController");

var _SendForgotPassordMailController = require("../../../../modules/accounts/useCases/sendForgotPasswordMail/SendForgotPassordMailController");

const passwordRoutes = (0, _express.Router)();
exports.passwordRoutes = passwordRoutes;
const sendForgotMailController = new _SendForgotPassordMailController.SendForgotPasswordMailController();
const resetPasswordController = new _ResetPasswordUserController.ResetPasswordController();
passwordRoutes.post('/forgot', sendForgotMailController.handle);
passwordRoutes.post('/reset', resetPasswordController.handle);