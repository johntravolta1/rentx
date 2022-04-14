import { Router} from 'express'
import { ensureAuthenticated } from '../middlewares/ensureAuthentication';
import { CreateSpecificationController } from '../modules/cars/useCases/createSpecification/createSpecificationController';

const specificationsRoutes = Router();

const createSpecificationController = new CreateSpecificationController()

specificationsRoutes.use(ensureAuthenticated);
specificationsRoutes.post("/",createSpecificationController.handle)

export {specificationsRoutes}