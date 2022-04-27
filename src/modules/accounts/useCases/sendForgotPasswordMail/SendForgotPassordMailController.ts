import { Request, Response } from "express";
import { container } from "tsyringe";
import { SendForgotMailUseCase } from "./SendForgotPassordMailUseCase";

class SendForgotPasswordMailController {

    async handle(request: Request, response: Response): Promise<Response> {
        const {email} = request.body
        
        const sendForgotMailUseCase = container.resolve(SendForgotMailUseCase);

        await sendForgotMailUseCase.execute(email)

        return response.send()
    }
}

export {SendForgotPasswordMailController}