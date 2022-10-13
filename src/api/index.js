import axios from "axios";

const headers = {
  Authorization: `Token ${window.localStorage.getItem("token")}`,
  "content-Type": "application/json",
};
const BASE_URL = import.meta.env.VITE_BASE_URL;

export const authenticateUser = async (data) => {
  return await axios.post(`${BASE_URL}/api-token-auth/`, data);
};

export const createUser = async (data) => {
  return await axios.post(`${BASE_URL}/register/`, data);
};

export const fetchBucketlists = async (page) => {
  return await axios.get(`${BASE_URL}/bucketlists/?page=${page}`, {
    headers,
  });
};

export const createBucketlist = async (data) => {
  return await axios.post(`${BASE_URL}/bucketlists/`, data, {
    headers,
  });
};

export const postItem = async (url, data) => {
  return await axios.post(url, data, {
    headers,
  });
};

export const deleteItem = async (url) => {
  return await axios.delete(url, { headers });
};

export const patchItem = async (url, data) => {
  return await axios.patch(url, data, { headers });
};

export const getItem = async (url) => {
  return await axios.get(url, { headers });
};
