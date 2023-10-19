export const getBaseUrl = (): string => {
  return process.env.NEXT_PUBLIC_API_BASE_URL || "https://it-backed-prisma-service-mofassel100.vercel.app/api/v1";
};
