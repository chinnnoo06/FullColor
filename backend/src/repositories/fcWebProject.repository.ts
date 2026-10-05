import { FCWebProject } from "../models/FCWebProject";
import { TFCWebProject } from "../types/fcWebProject/fcWebProject.types";

export const fcWebProjectRepository = {

    async create(data: TFCWebProject) {
        return FCWebProject.create(data)
    },

    async findById(id: string) {
        return FCWebProject.findById(id);
    },

    async findBySlug(slug: string) {
        return FCWebProject.findOne({ slug });
    },

    async findPaginated(page: number, limit: number) {
        return FCWebProject.paginate({}, {
            page,
            limit,
            sort: { createdAt: 1 }
        });
    },

}
