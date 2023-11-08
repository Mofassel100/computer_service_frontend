export const getBaseUrl = (): string => {
  return (
    "https://it-backed-prisma-service-mofassel100.vercel.app/api/v1" ||
    process.env.NEXT_PUBLIC_API_BASE_URL
  );
};
