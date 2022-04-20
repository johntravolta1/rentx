import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../shared/errors/AppError";
import { Car } from "../../infra/typeorm/entities/Car";
import { ICarsRepository } from "../../repositories/ICarsRepository";
import { ISpecificationRepository } from "../../repositories/ISpecificationRepository";

interface IRequest {
    car_id: string;
    specifications_id: string[];
}

@injectable()
class CreateCarSpecificationUseCase {
    
    constructor(
        @inject('CarsRepository')
        private carRepository: ICarsRepository,
        @inject('SpecificationsRepository')
        private specificationsRepository: ISpecificationRepository
    ) {

    }
    
    async execute({car_id, specifications_id}: IRequest) : Promise<Car> {
        const carExists = await this.carRepository.findById(car_id)

        if(!carExists) {
            throw new AppError('Car does not exists!')
        }

        const specifications = await this.specificationsRepository.findByIds(specifications_id)

        carExists.specifications = specifications

        await this.carRepository.create(carExists)

        return carExists
    }

}

export { CreateCarSpecificationUseCase}