import { FCServiceCategory } from "../models/FCServiceCategory";
import { TFCServiceCategory } from "../types/fcServiceCategory/fcServiceCategory.types";

export const fcServiceCategoryRepository = {

    async create(data: TFCServiceCategory) {
        return FCServiceCategory.create(data)
    },

    async findById(id: string) {
        return FCServiceCategory.findById(id)
    },

    async findAll() {
        return FCServiceCategory.find().sort({ name: 1 })
    },

}
