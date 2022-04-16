import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";
import { AppError } from "../../../errors/AppError";
import { UsersRepository } from "../../../../modules/accounts/infra/typeorm/repositories/UsersRepository";

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
        const {sub: user_id} = verify(token, 'd1bb70baa31f1df69628c00632b65eab') as IPayLoad
        
        const usersRepository = new UsersRepository();
        const user = usersRepository.findById(user_id)

        if(!user) {
            throw new AppError('User does not exists!', 401)
        }
        request.user = {
            id: user_id
        }
        next();
    } catch (error) {
        throw new AppError('Invalid token!', 401)
    }
}