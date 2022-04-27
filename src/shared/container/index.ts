import {container} from 'tsyringe'
import { UsersRepository } from '../../modules/accounts/infra/typeorm/repositories/UsersRepository'
import { IUsersRepository } from '../../modules/accounts/repositories/IUsersRepository'
import { ICategoriesRepository } from '../../modules/cars/repositories/ICategoriesRepository'
import { CategoriesRepository } from '../../modules/cars/infra/typeorm/repositories/CategoriesRepository'
import './providers/'
import { ISpecificationRepository } from '../../modules/cars/repositories/ISpecificationRepository'
import { SpecificationsRepository } from '../../modules/cars/infra/typeorm/repositories/SpecificationsRepostory'
import { ICarsRepository } from '../../modules/cars/repositories/ICarsRepository'
import { CarsRepository } from '../../modules/cars/infra/typeorm/repositories/CarsRepository'
import { ICarsImageRepository } from '../../modules/cars/repositories/ICarsImagesRepository'
import { CarsImageRepository } from '../../modules/cars/infra/typeorm/repositories/CarsImageRepository'
import { IRentalsRepository } from '../../modules/rentals/repositories/IRentalsRepository'
import { RentalsRepository } from '../../modules/rentals/infra/typeorm/repositories/RentalsRepository'
import { IUsersTokenRepository } from '../../modules/accounts/repositories/IUsersTokenRepository'
import { UsersTokensRepository } from '../../modules/accounts/infra/typeorm/repositories/UsersTokenRepository'


container.registerSingleton<ICategoriesRepository>(
    "CategoriesRepository", CategoriesRepository
)

container.registerSingleton<ISpecificationRepository>(
    "SpecificationsRepository", SpecificationsRepository
)

container.registerSingleton<IUsersRepository>(
    "UsersRepository", UsersRepository
)

container.registerSingleton<ICarsRepository>('CarsRepository', CarsRepository)

container.registerSingleton<ICarsImageRepository>('CarsImageRepository', CarsImageRepository )

container.registerSingleton<IRentalsRepository>('RentalsRepository', RentalsRepository)

container.registerSingleton<IUsersTokenRepository>('UsersTokenRepository', UsersTokensRepository)