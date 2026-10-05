import { FCService } from "../models/FCService";
import { TFCService } from "../types/fcService/fcService.types";

export const fcServiceRepository = {

    async create(data: TFCService) {
        return FCService.create(data)
    },

    async findById(id: string) {
        return FCService.findById(id);
    },

    async findByIdPopulated(id: string) {
        return FCService.findById(id).populate('category');
    },

    async findPaginated(page: number, limit: number, filter: Record<string, unknown> = {}) {
        return FCService.paginate(filter, {
            page,
            limit,
            sort: { createdAt: 1 },
            populate: 'category'
        });
    },
}
