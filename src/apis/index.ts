import axios, { AxiosInstance } from "axios";
import { IInputData } from "../types";

const API_URL = `http://localhost:8000/api/`;

interface IParams {
  baseURL: string;
}

// interface IUserRequest {
//   email: string;
//   password: string;
//   phone?: string;
// }

const config: IParams = {
  baseURL: API_URL,
};

export const axiosPublic = axios.create(config);

export const apiPrivate = axios.create(config);

export const authUser = async (data: IInputData) => {
  return await axiosPublic.post("login", data);
};

export const createUser = async (data: IInputData) => {
  return await axiosPublic.post("register", data);
};

export const getRefreshAccessToken = async () => {
  const response = await axiosPublic.get("refresh");
  return response?.data?.accessToken;
};

export const getLogOut = async (axiosPrivate: AxiosInstance) => {
  return await axiosPrivate.get("dashboard/logout");
};

export const getProfile = async (axiosPrivate: AxiosInstance) => {
  return await axiosPrivate.get("dashboard/profile");
};
