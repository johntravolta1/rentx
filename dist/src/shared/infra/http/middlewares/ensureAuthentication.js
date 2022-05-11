"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ensureAuthenticated = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const AppError_1 = require("../../../errors/AppError");
const auth_1 = __importDefault(require("../../../../config/auth"));
async function ensureAuthenticated(request, response, next) {
    const authHeader = request.headers.authorization;
    if (!authHeader) {
        throw new AppError_1.AppError('Token missing', 401);
    }
    //Bearer 23dfaoije3982
    // [0] = Bearer; [1] = 23dfaoije3982
    const [, token] = authHeader.split(' ');
    try {
        const { sub: user_id } = (0, jsonwebtoken_1.verify)(token, auth_1.default.secret_token);
        request.user = {
            id: user_id
        };
        next();
    }
    catch (error) {
        throw new AppError_1.AppError('Invalid token!' + error, 401);
    }
}
exports.ensureAuthenticated = ensureAuthenticated;
