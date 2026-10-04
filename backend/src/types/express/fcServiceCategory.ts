import { Request } from "express"
import { TFCServiceCategoryDocument } from "../fcServiceCategory/fcServiceCategory.types"

export interface TRequestWithFCServiceCategory<
    P = {},
    ResB = unknown,
    ReqB = unknown,
    Q = {}
> extends Request<P, ResB, ReqB, Q> {
    FCServiceCategory: TFCServiceCategoryDocument
}
