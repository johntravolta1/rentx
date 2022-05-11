"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoriesRepositoryInMemory = void 0;
const Category_1 = require("../../infra/typeorm/entities/Category");
class CategoriesRepositoryInMemory {
    constructor() {
        this.categories = [];
    }
    async findByName(name) {
        const category = this.categories.find((category) => category.name == name);
        return category;
    }
    async list() {
        const all = this.categories;
        return all;
    }
    async create({ name, description }) {
        const category = new Category_1.Category();
        Object.assign(category, {
            name, description
        });
        this.categories.push(category);
    }
}
exports.CategoriesRepositoryInMemory = CategoriesRepositoryInMemory;
