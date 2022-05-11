"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SpecificationsRepositoryInMemory = void 0;
const Specification_1 = require("../../infra/typeorm/entities/Specification");
class SpecificationsRepositoryInMemory {
    constructor() {
        this.specifications = [];
    }
    async create({ description, name }) {
        const specification = new Specification_1.Specification();
        Object.assign(specification, {
            description, name
        });
        this.specifications.push(specification);
        return specification;
    }
    async findByName(name) {
        return this.specifications.find(s => s.name === name);
    }
    async findByIds(ids) {
        return this.specifications.filter(s => ids.includes(s.id));
    }
}
exports.SpecificationsRepositoryInMemory = SpecificationsRepositoryInMemory;
