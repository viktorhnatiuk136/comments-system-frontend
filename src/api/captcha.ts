import { api } from "./api";

export const getCaptcha = async () => {
  const { data } = await api.get("/captcha");

  return data;
};
