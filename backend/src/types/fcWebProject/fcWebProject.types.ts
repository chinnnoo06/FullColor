import { HydratedDocument } from "mongoose";
import { TSEO } from "../common/common.types";

export enum FCWebTechnology {
    JAVASCRIPT = "javascript",
    TYPESCRIPT = "typescript",
    TAILWIND = "tailwind",
    REACT = "react",
    NEXTJS = "nextjs",
    EXPRESSJS = "expressjs",
    NESTJS = "nestjs",
    MONGODB = "mongodb",
    POSTGRESQL = "postgresql"
}

export type TFCWebProject = {
    slug: string,
    name: string,
    images: string[],
    excerpt: string,
    content: string,
    technologies: FCWebTechnology[],
    seo: TSEO
};

export type TFCWebProjectDocument = HydratedDocument<TFCWebProject>
