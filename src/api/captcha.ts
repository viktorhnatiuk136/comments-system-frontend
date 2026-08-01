import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000",
});

export const getCaptcha = async () => {
  const { data } = await api.get("/captcha");

  return data;
};
