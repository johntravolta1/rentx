import { Router} from 'express'
import { ensureAuthenticated } from '../middlewares/ensureAuthentication';
import { CreateSpecificationController } from '../../../../modules/cars/useCases/createSpecification/createSpecificationController';
import { ensureAdmin } from '../middlewares/ensureAdmin';

const specificationsRoutes = Router();

const createSpecificationController = new CreateSpecificationController()

specificationsRoutes.post("/",ensureAuthenticated, ensureAdmin,createSpecificationController.handle)

export {specificationsRoutes}