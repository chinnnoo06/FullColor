import { FCDepotProduct } from "../models/FCDepotProduct";
import { TCreateFCDepotProduct } from "../types/fcDepotProduct/fcDepotProduct.types";

export const fcDepotProductRepository = {

    async create(data: TCreateFCDepotProduct) {
        return FCDepotProduct.create(data)
    },

    async findById(id: string) {
        return FCDepotProduct.findById(id);
    },

    async findBySlug(slug: string) {
        return FCDepotProduct.findOne({ slug });
    },

    async findPaginated(page: number, limit: number) {
        return FCDepotProduct.paginate({}, {
            page,
            limit,
            sort: { _id: -1 }
        });
    },

}
