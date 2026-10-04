import { FCWebProjectsResponseSchema } from "@/schemas/fcWebProject/fcWebProject.response.schemas";
import { originHeader } from "../api.headers";
import { getToken } from "../auth/auth.token";
import { FCWebProjectSchema } from "@/schemas/fcWebProject/fcWebProject.schemas";

export const getFCWebProjectsService = async (page: number = 1) => {
  const url = `${process.env.API_URL}/fc-web-projects?page=${page}`;

  const req = await fetch(url, {
    method: "GET",
    headers: {
      ...originHeader()
    },
    next: { revalidate: 3600, tags: ["fcWebProjects"] },
  });

  if (!req.ok) {
    throw new Error("Request Failed");
  }

  const json = await req.json();

  const result = FCWebProjectsResponseSchema.safeParse(json);

  if (!result.success) {
    throw new Error("Respuesta inesperada de GET /fc-web-projects");
  }

  return {
    fcWebProjects: result.data.fcWebProjects,
    pagination: result.data.pagination,
  };
};


export const getFCWebProjectByIdService = async (id: string) => {
  const token = await getToken();

  const url = `${process.env.API_URL}/fc-web-projects/id/${id}`;

  const req = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      ...originHeader()
    },
    cache: "no-store",
  });

  if (req.status === 404 || req.status === 400) {
    return null;
  }

  if (!req.ok) {
    throw new Error("Request Failed");
  }

  const json = await req.json();

  const result = FCWebProjectSchema.safeParse(json.fcWebProject);

  if (!result.success) {
    throw new Error("Respuesta inesperada de GET /fc-web-projects/id/:id");
  }

  return result.data;
};

export const getFCWebProjectBySlugService = async (slug: string) => {
  const url = `${process.env.API_URL}/fc-web-projects/${slug}`;

  const req = await fetch(url, {
    method: "GET",
    headers: {
      ...originHeader()
    },
    next: { revalidate: 3600, tags: ["fcWebProjects"] },
  });

  if (req.status === 404 || req.status === 400) {
    return null;
  }

  if (!req.ok) {
    throw new Error("Request Failed");
  }

  const json = await req.json();

  const result = FCWebProjectSchema.safeParse(json.fcWebProject);

  if (!result.success) {
    throw new Error("Respuesta inesperada de GET /fc-web-projects/slug");
  }

  return result.data;
};