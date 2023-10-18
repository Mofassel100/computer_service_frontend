export const setTolocalStrorage = (key: string, token: string) => {
  if (!key || typeof window === "undefined") {
    return "";
  }
  return localStorage.setItem(key, token);
};
export const getFromlocalStrorage = (key: string) => {
  if (!key || typeof window === "undefined") {
    return "";
  }
  return localStorage.getItem(key);
};
export const RemoveFromlocalStrorage = (key: string) => {
  return localStorage.removeItem(key);
};
