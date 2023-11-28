export const setTolocalStrorage = (key: string, token: string) => {
  if (!key || typeof window === "undefined") {
    return "";
  }

  return localStorage.setItem(key, token);
};
export const setToLocalStorageCart = (e: any) => {
  setTolocalStrorage("service-cart", e);
};
export const getFromlocalStrorage = (key: string) => {
  if (!key || typeof window === "undefined") {
    return "";
  }
  return localStorage.getItem(key);
};
export const getCartDataFromlocalStrorage = (key: string) => {
  if (!key) {
    return "";
  }
  return localStorage.getItem(key);
};
type RemoveLocalStorage = {
  key: string;
};
export const RemoveFromlocalStrorage = (key: string) => {
  return localStorage.removeItem(key);
};
