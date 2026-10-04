import { Request } from "express"
import { TFCServiceDocument } from "../fcService/fcService.types"

export interface TRequestWithFCService<
    P = {},
    ResB = unknown,
    ReqB = unknown,
    Q = {}
> extends Request<P, ResB, ReqB, Q> {
    FCService: TFCServiceDocument
}
