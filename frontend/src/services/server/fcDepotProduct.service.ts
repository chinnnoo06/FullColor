import { FCDepotProductsResponseSchema } from "@/schemas/fcDepotProduct/fcDepotProduct.response.schemas";
import { originHeader } from "../api.headers";
import { getToken } from "../auth/auth.token";
import { FCDepotProductSchema } from "@/schemas/fcDepotProduct/fcDepotProduct.schemas";

export const getFCDepotProductsService = async (page: number = 1) => {
  const url = `${process.env.API_URL}/fc-depot-products?page=${page}`;

  const req = await fetch(url, {
    method: "GET",
    headers: {
      ...originHeader()
    },
    next: { revalidate: 3600, tags: ["fcDepotProducts"] },
  });

  if (!req.ok) {
    throw new Error("Request Failed");
  }

  const json = await req.json();

  const result = FCDepotProductsResponseSchema.safeParse(json);

  if (!result.success) {
    throw new Error("Respuesta inesperada de GET /fc-depot-products");
  }

  return {
    fcDepotProducts: result.data.fcDepotProducts,
    pagination: result.data.pagination,
  };
};


export const getFCDepotProductByIdService = async (id: string) => {
  const token = await getToken();

  const url = `${process.env.API_URL}/fc-depot-products/id/${id}`;

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

  const result = FCDepotProductSchema.safeParse(json.fcDepotProduct);

  if (!result.success) {
    throw new Error("Respuesta inesperada de GET /fc-depot-products/id/:id");
  }

  return result.data;
};

export const getFCDepotProductBySlugService = async (slug: string) => {
  const url = `${process.env.API_URL}/fc-depot-products/${slug}`;

  const req = await fetch(url, {
    method: "GET",
    headers: {
      ...originHeader()
    },
    next: { revalidate: 3600, tags: ["fcDepotProducts"] },
  });

  if (req.status === 404 || req.status === 400) {
    return null;
  }

  if (!req.ok) {
    throw new Error("Request Failed");
  }

  const json = await req.json();

  const result = FCDepotProductSchema.safeParse(json.fcDepotProduct);

  if (!result.success) {
    throw new Error("Respuesta inesperada de GET /fc-depot-products/slug");
  }

  return result.data;
};