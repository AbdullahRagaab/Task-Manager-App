/* eslint-disable @typescript-eslint/no-explicit-any */
import apiClient from "../../../common/clients/apiClient";
import type { LoginCredentials, TokenRefreshType, SignupData } from "../types";



export const loginService = async (cred: LoginCredentials): Promise<TokenRefreshType> => {
  try {
    const response = await apiClient.get("/users");

    const users = Array.isArray(response.data) ? response.data : response.data?.data;

    if (!users) throw new Error("Users list not found");

    const user = users.find((u: any) => {
      return String(u.username).trim().toLowerCase() === cred.username.trim().toLowerCase()
          && String(u.password).trim() === cred.password.trim();
    });

    if (!user) {
      throw new Error("Invalid credentials");
    }

    return {
      access: `mock_access_${user.id}_${Date.now()}`,
      refresh: `mock_refresh_${user.id}_${Date.now()}`,
    };

  } catch (err) {
    console.log("ERROR LOGIN:", err);
    throw err;
  }
};


export const signupService = async (payload: SignupData) => {
  try {
    const { data: existingUsers } = await apiClient.get("/users");
    const userExists = existingUsers.some(
      (u: any) => u.username === payload.username || u.email === payload.email
    );

    if (userExists) {
      throw new Error("Username or email already exists");
    }

    const newUser = {
      username: payload.username,
      email: payload.email,
      full_name: payload.name,
      password: payload.password,
      role: "user",
      profile_picture: `https://i.pravatar.cc/150?u=${payload.username}`,
    };

    const { data } = await apiClient.post("/users", newUser);
    return data;
  } catch (error: any) {
    throw new Error(error.message || "Signup failed");
  }
};