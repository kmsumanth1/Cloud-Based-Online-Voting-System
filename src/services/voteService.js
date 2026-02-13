import API from "./api";

export const fetchResults = async () => {
  const response = await API.get("/results");
  return response.data;
};
