// import apiClient from "../../../common/clients/apiClient";
// import { ENDPOINTS } from "../../../common/constants/endpoints";
// import type { LoginCredentials, TokenRefreshType } from "../types";


// export const loginService = async (cred: LoginCredentials): Promise<TokenRefreshType> => {
//   const { data } = await apiClient.post(ENDPOINTS.AUTH.TOKEN, cred);

//   return data;
// };



import apiClient from "../../../common/clients/apiClient";
import { ENDPOINTS } from "../../../common/constants/endpoints";
import type { LoginCredentials, TokenRefreshType, SignupData } from "../types";

// login
export const loginService = async (cred: LoginCredentials): Promise<TokenRefreshType> => {
  const { data } = await apiClient.post(ENDPOINTS.AUTH.TOKEN, cred);
  return data;
};

// signup ✨
export const signupService = async (payload: SignupData) => {
  const { data } = await apiClient.post(ENDPOINTS.AUTH.SIGNUP, payload);
  return data;
};
