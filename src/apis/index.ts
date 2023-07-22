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

/**
 * used for requests to public routes
 */
export const axiosPublic = axios.create(config);

/**
 * used for requests to protected routes
 */
export const apiPrivate = axios.create(config);

/**
 * authenticate user for logging to system
 * @param data
 * @returns axios response
 */
export const authUser = async (data: IInputData) => {
  return await axiosPublic.post("login", data);
};

/**
 * register user in system
 * @param data
 * @returns
 */
export const createUser = async (data: IInputData) => {
  return await axiosPublic.post("register", data);
};

/**
 * get new refresh token for auth
 * @returns refresh access token
 */
export const getRefreshAccessToken = async () => {
  const response = await axiosPublic.get("refresh");
  return response?.data?.accessToken;
};

/**
 * log out from site
 * @param axiosPrivate
 * @returns
 */
export const getLogOut = async (axiosPrivate: AxiosInstance) => {
  return await axiosPrivate.get("dashboard/logout");
};

export const getProfile = async (
  axiosPrivate: AxiosInstance,
  controller: AbortController
) => {
  return await axiosPrivate.get("dashboard/profile", {
    signal: controller.signal,
  });
};

export const getChannels = async (
  axiosPrivate: AxiosInstance,
  user_id: number,
  controller: AbortController
) => {
  return await axiosPrivate.get(`channels/${user_id}`, {
    signal: controller.signal,
  });
};

export const updateApiInfo = async (
  axiosPrivate: AxiosInstance,
  data: IChannelData,
  controller: AbortController
) => {
  return await axiosPrivate.post("dashboard/add_api_info", data, {
    signal: controller.signal,
  });
};

export const PhoneValidation = async (
  axiosPrivate: AxiosInstance,
  controller: AbortController
) => {
  return await axiosPrivate.get("dashboard/login_telegram", {
    // increase timeout because of filtering of telegram in Iran
    timeout: 500000,
    signal: controller.signal,
  });
};

export const postOtp = async (
  axiosPrivate: AxiosInstance,
  data: { otp: string },
  controller: AbortController
) => {
  return await axiosPrivate.post("dashboard/otp_validation", data, {
    // increase timeout because of filtering of telegram in Iran
    timeout: 500000,
    signal: controller.signal,
  });
};

export const getAllUserChannelsHas = async (
  axiosPrivate: AxiosInstance,
  controller: AbortController
) => {
  return await axiosPrivate.get("dashboard/get_all_channels", {
    // increase timeout because of filtering of telegram in Iran
    timeout: 500000,
    signal: controller.signal,
  });
};

export const setChannel = async (
  axiosPrivate: AxiosInstance,
  data: { channelId: string },
  controller: AbortController
) => {
  return await axiosPrivate.post("dashboard/set_channel", data, {
    timeout: 500000,
    signal: controller.signal,
  });
};
