// import { authKey } from "@/constants/storageKey";
import { instant as axiosInstance } from "@/helper/axios/axiosInstant";
// import { getBaseUrl } from "@/helpers/config/envConfig";
// import { decodedToken } from "@/utils/jwt";
// import { getFromLocalStorage, setToLocalStorage } from "@/utils/local-storage";

import { authKey } from "@/constant/localStorage";
import { decodeToken } from "@/utilies/jwt";
import { getFromlocalStrorage, setTolocalStrorage } from "@/utilies/local.storage";
import { getBaseUrl } from "@/helper/config/envConfig";

export const storeUserInfo = ({ accessToken }: { accessToken: string }) => {
  return setTolocalStrorage(authKey, accessToken as string);
};

export const getUserInfo = () => {
  const authToken = getFromlocalStrorage(authKey);
  // console.log(authToken);
  if (authToken) {
    const decodedData = decodeToken(authToken);
    return decodedData;
  } else {
    return "";
  }
};

export const isLoggedIn = () => {
  const authToken = getFromlocalStrorage(authKey);
  return !!authToken;
};

export const removeUserInfo = (key: string) => {
  return localStorage.removeItem(key);
};

export const getNewAccessToken = async () => {
  return await axiosInstance({
    url: `${getBaseUrl()}/auth/refresh-token`,
    method: "POST",
    headers: { "Content-Type": "application/json" },
    withCredentials: true,
  });
};
