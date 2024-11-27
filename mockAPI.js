import axios from "axios";

const BASE_URL = "http://localhost:5000";

export const fetchUsers = async () => {
  const response = await axios.get(`${BASE_URL}/users`);
  return response.data;
};

export const fetchRoles = async () => {
  const response = await axios.get(`${BASE_URL}/roles`);
  return response.data;
};
