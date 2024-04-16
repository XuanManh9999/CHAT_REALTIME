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

export const forgotPass = async (data) => {
  try {
    const response = await axios.post(`${url}/forgot-password`, data);
    return response.data;
  } catch (err) {
    return err;
  }
};

export const allUsers = async (id) => {
  try {
    const response = await axios.get(`${url}/all-user?id=${id}`);
    return response.data;
  } catch (err) {
    return err;
  }
};
