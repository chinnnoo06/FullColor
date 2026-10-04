import { z } from "zod";
import { FCServiceCategorySchema } from "@/schemas/fcServiceCategory/fcServiceCategory.schemas";
import { originHeader } from "../api.headers";
import { getToken } from "../auth/auth.token";

export const getFCServiceCategoriesService = async () => {
  const url = `${process.env.API_URL}/fc-category-services`;

  const req = await fetch(url, {
    method: "GET",
    headers: {
      ...originHeader()
    },
    next: { revalidate: 3600, tags: ["fcServiceCategories"] },
  });

  if (!req.ok) {
    throw new Error("Request Failed");
  }

  const json = await req.json();

  const result = z.array(FCServiceCategorySchema).safeParse(json.fcServiceCategories);

  if (!result.success) {
    throw new Error("Respuesta inesperada de GET /fc-category-services");
  }

  return result.data;
};

export const getFCServiceCategoryService = async (id: string) => {
  const token = await getToken();

  const url = `${process.env.API_URL}/fc-category-services/${id}`;

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

  const result = FCServiceCategorySchema.safeParse(json.fcServiceCategory);

  if (!result.success) {
    throw new Error("Respuesta inesperada de GET /fc-category-services/:id");
  }

  return result.data;
};
