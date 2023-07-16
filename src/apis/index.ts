import axios, { AxiosInstance } from "axios";
import { IChannelData, IInputData } from "../types";

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

export const getChannels = async (
  axiosPrivate: AxiosInstance,
  user_id: number
) => {
  return await axiosPrivate.get(`channels/${user_id}`);
};

export const updateApiInfo = async (
  axiosPrivate: AxiosInstance,
  data: IChannelData
) => {
  return await axiosPrivate.post("dashboard/add_api_info", data);
};

export const PhoneValidation = async (axiosPrivate: AxiosInstance) => {
  return await axiosPrivate.get("dashboard/login_telegram", {
    // increase timeout because of filtering of telegram in Iran
    timeout: 10000,
  });
};

export const postOtp = async (
  axiosPrivate: AxiosInstance,
  data: { otp: string }
) => {
  return await axiosPrivate.post("dashboard/otp_validation", data, {
    // increase timeout because of filtering of telegram in Iran
    timeout: 10000,
  });
};

export const getAllUserChannelsHas = async (axiosPrivate: AxiosInstance) => {
  return await axiosPrivate.get("dashboard/get_all_channels", {
    // increase timeout because of filtering of telegram in Iran
    // 10 seconds
    timeout: 10000,
  });
};

export const setChannel = async (
  axiosPrivate: AxiosInstance,
  data: { channelId: string }
) => {
  return await axiosPrivate.post("dashboard/set_channel", data);
};
