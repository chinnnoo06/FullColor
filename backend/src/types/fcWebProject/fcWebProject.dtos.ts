import { FCWebTechnology } from "./fcWebProject.types";
import { TSEO } from "../common/common.types";

export type TFCWebProjectDto = {
    name: string,
    excerpt: string,
    content: string,
    technologies: FCWebTechnology[],
    seo: TSEO
}
