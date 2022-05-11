"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SpecificationsRepository = void 0;
const typeorm_1 = require("typeorm");
const Specification_1 = require("../entities/Specification");
class SpecificationsRepository {
    constructor() {
        this.repository = (0, typeorm_1.getRepository)(Specification_1.Specification);
    }
    async create({ description, name }) {
        const specification = this.repository.create({
            description,
            name
        });
        await this.repository.save(specification);
        return specification;
    }
    async findByName(name) {
        const specification = await this.repository.findOne({ name });
        return specification;
    }
    async findByIds(ids) {
        return await this.repository.findByIds(ids);
    }
}
exports.SpecificationsRepository = SpecificationsRepository;
