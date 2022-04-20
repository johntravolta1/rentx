import { Specification } from "../../infra/typeorm/entities/Specification";
import { ICreateSpecificationDTO, ISpecificationRepository } from "../ISpecificationRepository";


class SpecificationsRepositoryInMemory implements ISpecificationRepository {
    
    private specifications: Specification[] = [];

    async create({ description, name }: ICreateSpecificationDTO): Promise<Specification> {
        const specification = new Specification();

        Object.assign(specification, {
            description, name
        })

        this.specifications.push(specification)

        return specification
    }

    async findByName(name: string): Promise<Specification> {
        return this.specifications.find( s=> s.name === name);
    }
    
    async findByIds(ids: string[]): Promise<Specification[]> {
        return this.specifications.filter(s => ids.includes(s.id))
    }
}

export { SpecificationsRepositoryInMemory }