import { Request } from "express"
import { TFCDepotProductDocument } from "../fcDepotProduct/fcDepotProduct.types"

export interface TRequestWithFCDepotProduct<
    P = {},
    ResB = unknown,
    ReqB = unknown,
    Q = {}
> extends Request<P, ResB, ReqB, Q> {
    FCDepotProduct: TFCDepotProductDocument
}
