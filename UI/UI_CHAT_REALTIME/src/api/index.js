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

export const setOnline = async (id) => {
  try {
    const response = await axios.put(`${url}/set-online`, { id });
    return response.data;
  } catch (err) {
    return err;
  }
};

export const setOffline = async (id) => {
  try {
    const response = await axios.put(`${url}/set-offline`, { id });
    return response.data;
  } catch (err) {
    return err;
  }
};

export const getDataChat = async (id, idFriend) => {
  try {
    const response = await axios.get(
      `${url}/data-chat?id=${id}&idFriend=${idFriend}`
    );
    return response.data;
  } catch (err) {
    return err;
  }
};

export const createChat = async (data) => {
  try {
    const response = await axios.post(`${url}/create-chat`, data);
    return response.data;
  } catch (err) {
    return err;
  }
};
