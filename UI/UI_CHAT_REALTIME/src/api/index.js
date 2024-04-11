import axios from "axios";
const url = "http://localhost:5000/users";

export const login = async (data) => {
  try {
    const response = await axios.post(`${url}/login`, data);
    return response.data;
  } catch (err) {
    return err;
  }
};

export const register = async (data) => {
  try {
    const response = await axios.post(`${url}/add-user`, data);
    return response.data;
  } catch (err) {
    return err;
  }
};
