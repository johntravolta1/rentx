import { inject, injectable } from "tsyringe";
import { IDateProvider } from "../../../../shared/container/providers/DayjsProvider/IDateProvider";
import { AppError } from "../../../../shared/errors/AppError";
import { ICarsRepository } from "../../../cars/repositories/ICarsRepository";
import { Rental } from "../../infra/typeorm/entities/Rental";
import { IRentalsRepository } from "../../repositories/IRentalsRepository";

interface IRequest {
    id: string;
    user_id: string;
}

@injectable()
class DevolutionRentalUseCase {

    constructor(
        @inject('RentalsRepository')
        private rentalsRepository: IRentalsRepository,
        @inject('CarsRepository')
        private carsRepository: ICarsRepository,
        @inject('DayjsDateProvider')
        private dateProvider: IDateProvider,
    ) {}

    async execute({id, user_id}: IRequest) : Promise<Rental> {
        const minimalRentalTimeInDays = 1
        const rental = await this.rentalsRepository.findById(id)
        const  car = await this.carsRepository.findById(rental.car_id)

        if(!rental) {
            throw new AppError('Rental does not exists!')
        }

        let rentalTimeInDays = this.dateProvider.compareInDays(
            rental.start_date, this.dateProvider.dateNow()
        )

        if (rentalTimeInDays < minimalRentalTimeInDays) {
            rentalTimeInDays = 1;
        }

        const delay = this.dateProvider.compareInDays(
            this.dateProvider.dateNow(), rental.expected_return_date
        )

        let totalPrice = 0;
        let Fine = 0;
        if(delay > 0) {
            Fine = delay * car.fine_amount;
        }

        totalPrice = Fine + (rentalTimeInDays * car.daily_rate)

        rental.end_date = this.dateProvider.dateNow()
        rental.total = totalPrice;

        await this.rentalsRepository.create(rental)
        await this.carsRepository.updateAvailable(car.id, true)

        return rental
    }
}

export { DevolutionRentalUseCase}