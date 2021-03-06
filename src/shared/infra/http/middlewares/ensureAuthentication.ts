import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";
import { AppError } from "../../../errors/AppError";
import auth from "../../../../config/auth";

interface IPayLoad {
    sub: string;
}

export async function ensureAuthenticated(request:Request, response: Response, next: NextFunction) {
    const authHeader = request.headers.authorization;

    if(!authHeader) {
        throw new AppError('Token missing', 401)
    }

    //Bearer 23dfaoije3982
    // [0] = Bearer; [1] = 23dfaoije3982
    const [, token] = authHeader.split(' ');


    try {
        const {sub: user_id} = verify(token, auth.secret_token) as IPayLoad

        request.user = {
            id: user_id
        }
        
        next();
    } catch (error) {
        throw new AppError('Invalid token!' + error, 401)
    }
}