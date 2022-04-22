import { inject, injectable } from "tsyringe";
import { IDateProvider } from "../../../../shared/container/providers/DayjsProvider/IDateProvider";
import { AppError } from "../../../../shared/errors/AppError";
import { Rental } from "../../infra/typeorm/entities/Rental";
import { IRentalsRepository } from "../../repositories/IRentalsRepository";

interface IRequest {
    user_id: string;
    car_id: string;
    expected_return_date: Date;
}

@injectable()
class CreateRentalUseCase {
    
    constructor(
        @inject('RentalsRepository')
        private rentalsRepository: IRentalsRepository,
        @inject('DayjsDateProvider')
        private dateProvider: IDateProvider
    ) {}
    
    async execute({user_id, car_id, expected_return_date}: IRequest) : Promise<Rental> {

        const carUnAvailale = await this.rentalsRepository.findOpenRentalByCar(car_id);

        if(carUnAvailale) {
            throw new AppError('Car is unavailable');
        }


        const rentalOpenToUser = await this.rentalsRepository.findOpenRentalByUser(user_id)

        if(rentalOpenToUser) {
            throw new AppError("There's a rental in progress for this user!")
        }

        const minimalRentalHours = 24;
        const dateNow = this.dateProvider.dateNow()
        const compare = this.dateProvider.compareInHours(dateNow, expected_return_date)

        if ( compare < minimalRentalHours) {
            throw new AppError(`The minimal rental time it's 24 hours. This rental time is ${compare}`)
        }

        const rental = await this.rentalsRepository.create({
            user_id,
            car_id,
            expected_return_date
        })

        return rental

    }
}

export { CreateRentalUseCase}