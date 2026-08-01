import axios from "axios";
import type { CreateCommentDto } from "../types/createComment";

const api = axios.create({
  baseURL: "http://localhost:3000",
});

export const getComments = async (
  page = 1,
  limit = 25,
  sortBy = "createdAt",
  order = "desc",
) => {
  const { data } = await api.get(
    `/comments?page=${page}&limit=${limit}&sortBy=${sortBy}&order=${order}`,
  );
  return data;
};

export const createComment = async (comment: CreateCommentDto) => {
  const { data } = await api.post("/comments", comment);

  return data;
};
