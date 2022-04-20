import { Timestamp } from "typeorm";
import { ICreateCarDTO } from "../../dtos/ICreateCarDTO";
import { Car } from "../../infra/typeorm/entities/Car";
import { ICarsRepository } from "../ICarsRepository";


class CarsRepositoryInMemory implements ICarsRepository {
  
    cars: Car[] =[];
    
    async create({brand, category_id, daily_rate, description, fine_amount, name, license_plate, id}: ICreateCarDTO): Promise<Car> {
        const car = new Car();
        
        Object.assign(car, {
            brand, category_id, daily_rate, description, fine_amount, name, license_plate, id
        })
        
        this.cars.push(car);

        return car;
    }
    
    async findByLicensePlate(license_plate: string): Promise<Car> {
        return this.cars.find(c => c.license_plate === license_plate);
    }

    async findAvailable(brand?: string, category_id?: string, name?: string): Promise<Car[]> {
        return this.cars.filter(c=> c.available === true ||
                                ((brand && c.brand === brand) || 
                                category_id && c.category_id===category_id || 
                                name && c.name === name))
    }

    async findById(id: string): Promise<Car> {
        return this.cars.find(c => c.id === id);
    }
}

export {CarsRepositoryInMemory}