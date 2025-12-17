import API from "./api";

/**
 * CREATE
 */
export const createWord = (payload) =>
  API.post("/words", payload);

/**
 * READ ALL (user only)
 */
export const getWords = () =>
  API.get("/words");

/**
 * UPDATE
 */
export const updateWord = (id, payload) =>
  API.put(`/words/${id}`, payload);

/**
 * DELETE
 */
export const deleteWord = (id) =>
  API.delete(`/words/${id}`);
