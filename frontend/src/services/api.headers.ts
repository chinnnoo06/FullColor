import "server-only";

export const originHeader = (): Record<string, string> =>
  process.env.NODE_ENV === "production"
    ? { Origin: process.env.DOMAIN as string }
    : {};
