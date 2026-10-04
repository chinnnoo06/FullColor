import { z } from "zod";
import { FCServicesResponseSchema } from "@/schemas/fcService/fcService.response.schemas";
import { originHeader } from "../api.headers";
import { getToken } from "../auth/auth.token";
import { FCServiceSchema } from "@/schemas/fcService/fcService.schemas";

export const getFCServicesService = async (page: number = 1) => {
  const url = `${process.env.API_URL}/fc-services?page=${page}`;

  const req = await fetch(url, {
    method: "GET",
    headers: {
      ...originHeader()
    },
    next: { revalidate: 3600, tags: ["fcServices"] },
  });

  if (!req.ok) {
    throw new Error("Request Failed");
  }

  const json = await req.json();

  const result = FCServicesResponseSchema.safeParse(json);

  if (!result.success) {
    throw new Error("Respuesta inesperada de GET /fc-services");
  }

  return {
    fcServices: result.data.fcServices,
    pagination: result.data.pagination,
  };
};

export const getFCServiceService = async (id: string) => {
  const token = await getToken();

  const url = `${process.env.API_URL}/fc-services/${id}`;

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

  const result = FCServiceSchema.safeParse(json.fcService);

  if (!result.success) {
    throw new Error("Respuesta inesperada de GET /fc-services/:id");
  }

  return result.data;
};