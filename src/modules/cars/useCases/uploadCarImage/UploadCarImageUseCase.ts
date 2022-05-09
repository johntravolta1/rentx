import { inject, injectable } from "tsyringe";
import { IStorageProvider } from "../../../../shared/container/providers/StorageProvider/IStorageProvider";
import { ICarsImageRepository } from "../../repositories/ICarsImagesRepository";

interface IRequest {
    car_id: string;
    images_name: string[];
}


@injectable()
class UploadCarImageUseCase {
    
    constructor(
        @inject('CarsImageRepository')
        private carsImageRepository: ICarsImageRepository,
        @inject('StorageProvider')
        private storageProvider: IStorageProvider) {}

    async execute({car_id, images_name} : IRequest) : Promise<void> {
        images_name.map(async (i)=> {
            await this.carsImageRepository.create(car_id, i)
            await this.storageProvider.save(i,'cars')
        })
    }
}

export {UploadCarImageUseCase}