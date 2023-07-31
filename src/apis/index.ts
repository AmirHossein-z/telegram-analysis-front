import axios, { AxiosInstance } from "axios";
import { IChannelData, IInputData } from "../types";

const API_URL = `http://localhost:8000/api/`;

interface IParams {
  baseURL: string;
  // withCredentials: boolean;
}

const config: IParams = {
  baseURL: API_URL,
  // withCredentials: true,
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
  const response = await apiPrivate.get("refresh", {
    // headers: {
    //   Authorization: `Bearer ${prevAccessToken}`,
    // },
  });
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

/**
 * get user info
 * @param axiosPrivate
 * @param controller
 * @returns
 */
export const getProfile = async (
  axiosPrivate: AxiosInstance,
  controller: AbortController
) => {
  return await axiosPrivate.get("dashboard/profile", {
    signal: controller.signal,
  });
};

/**
 * get all channels belonged to specific user
 * @param axiosPrivate
 * @param user_id
 * @param controller
 * @returns
 */
export const getChannels = async (
  axiosPrivate: AxiosInstance,
  page = 1,
  user_id: number,
  controller?: AbortController
) => {
  return await axiosPrivate.get(`channels/${user_id}?page=${page}`, {
    signal: controller?.signal,
  });
};

/**
 * add api_id and api_hash info for user
 * @param axiosPrivate
 * @param data
 * @param controller
 * @returns
 */
export const updateApiInfo = async (
  axiosPrivate: AxiosInstance,
  data: IChannelData,
  controller: AbortController
) => {
  return await axiosPrivate.post("dashboard/add_api_info", data, {
    signal: controller.signal,
  });
};

/**
 * login to telegram to get phone validation from telegram
 * @param axiosPrivate
 * @param controller
 * @returns
 */
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

/**
 * send otp code to telegram for validation
 * @param axiosPrivate
 * @param data
 * @param controller
 * @returns
 */
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

/**
 * get all channels & groups & super_groups user has
 * @param axiosPrivate
 * @param controller
 * @returns
 */
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

/**
 * send desired channel id to for saving its posts
 * @param axiosPrivate
 * @param data
 * @param controller
 * @returns
 */
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

export const getChannel = async (
  axiosPrivate: AxiosInstance,
  channelId: string,
  controller: AbortController
) => {
  return await axiosPrivate.get(`dashboard/channel/${channelId}`, {
    signal: controller.signal,
  });
};

export const getPosts = async (
  axiosPrivate: AxiosInstance,
  channelId: string,
  page = 1,
  controller: AbortController
) => {
  return await axiosPrivate.get(
    `dashboard/channel/${channelId}/posts?page=${page}`,
    {
      signal: controller.signal,
    }
  );
};

export const getPost = async (
  axiosPrivate: AxiosInstance,
  postId: string,
  controller: AbortController
) => {
  return await axiosPrivate.get(`dashboard/post/${postId}`, {
    signal: controller.signal,
  });
};

export const getTop10 = async (
  axiosPrivate: AxiosInstance,
  channelId: number,
  controller: AbortController
) => {
  return await axiosPrivate.get(`dashboard/top10/${channelId}`, {
    signal: controller.signal,
  });
};

export const getPostsStat = async (
  axiosPrivate: AxiosInstance,
  channelId: number,
  controller: AbortController
) => {
  return await axiosPrivate.get(`dashboard/post/stat/${channelId}`, {
    signal: controller.signal,
  });
};
