import { inject, injectable } from "tsyringe";
import { ICarsImageRepository } from "../../repositories/ICarsImagesRepository";

interface IRequest {
    car_id: string;
    images_name: string[];
}


@injectable()
class UploadCarImageUseCase {
    
    constructor(
        @inject('CarsImageRepository')
        private carsImageRepository: ICarsImageRepository) {}

    async execute({car_id, images_name} : IRequest) : Promise<void> {
        images_name.map(async (i)=> {
            await this.carsImageRepository.create(car_id, i)
        })
    }
}

export {UploadCarImageUseCase}