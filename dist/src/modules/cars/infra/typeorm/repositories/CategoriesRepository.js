"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoriesRepository = void 0;
const typeorm_1 = require("typeorm");
const Category_1 = require("../entities/Category");
class CategoriesRepository {
    constructor() {
        this.repository = (0, typeorm_1.getRepository)(Category_1.Category);
    }
    async create({ description, name }) {
        const category = this.repository.create({
            description,
            name,
        });
        await this.repository.save(category);
    }
    async list() {
        const categories = await this.repository.find();
        return categories;
    }
    async findByName(name) {
        const category = await this.repository.findOne({ name });
        return category;
    }
}
exports.CategoriesRepository = CategoriesRepository;
