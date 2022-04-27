import { Router } from "express";
import { ResetPasswordController } from "../../../../modules/accounts/useCases/resetPasswordUser/ResetPasswordUserController";
import { SendForgotPasswordMailController } from "../../../../modules/accounts/useCases/sendForgotPasswordMail/SendForgotPassordMailController";


const passwordRoutes = Router()

const sendForgotMailController = new SendForgotPasswordMailController()
const resetPasswordController = new ResetPasswordController()


passwordRoutes.post('/forgot', sendForgotMailController.handle)
passwordRoutes.post('/reset', resetPasswordController.handle)


export { passwordRoutes}