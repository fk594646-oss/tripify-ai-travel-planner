import api from "./axios";

export const signupUser = async (signupData) => {
  const response = await api.post("/auth/signup", signupData);
  return response.data;
};
