import { Request } from "express"
import { TFCWebProjectDocument } from "../fcWebProject/fcWebProject.types"

export interface TRequestWithFCWebProject<
    P = {},
    ResB = unknown,
    ReqB = unknown,
    Q = {}
> extends Request<P, ResB, ReqB, Q> {
    FCWebProject: TFCWebProjectDocument
}
