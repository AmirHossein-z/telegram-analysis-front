import axios, { AxiosInstance } from "axios";
import {
  IAxiosPrivateGet,
  IAxiosPrivatePost,
  IChannelData,
  IInputData,
} from "../types";

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
export const axiosPrivate = axios.create(config);

export const authUser = (data: IInputData): IAxiosPrivatePost => {
  return { method: "post", url: "login", runOnMount: false, data };
};

export const createUser = (data: IInputData): IAxiosPrivatePost => {
  return { method: "post", url: "register", data, runOnMount: false };
};

export const getRefreshAccessToken = async () => {
  const response = await axiosPrivate.get("refresh", {
    // headers: {
    //   Authorization: `Bearer ${prevAccessToken}`,
    // },
  });
  return response?.data?.accessToken;
};

export const getLogOut = (): IAxiosPrivateGet => {
  return { url: "dashboard/logout", method: "get", runOnMount: false };
};

export const getProfile = (): IAxiosPrivateGet => {
  return { url: "dashboard/profile", method: "get" };
};

export const getChannels = (
  page = 1,
  user_id: number,
  filter: string,
  tagName = ""
): IAxiosPrivateGet => {
  return {
    method: "get",
    // url: `channels/${user_id}?page=${page}&filter=${filter}&tagName=${tagName}`,
    url: `channels/${user_id}`,
    params: {
      page: `${page}`,
      filter,
      tagName,
    },
  };
};

export const updateApiInfo = (data: IChannelData): IAxiosPrivatePost => {
  return {
    method: "post",
    url: "dashboard/add_api_info",
    data,
    runOnMount: false,
  };
};

export const PhoneValidation = (): IAxiosPrivateGet => {
  return { method: "get", url: "dashboard/login_telegram", timeout: 500000 };
};

export const postOtp = (otp: string): IAxiosPrivatePost => {
  return {
    method: "post",
    data: { otp },
    timeout: 500000,
    url: "dashboard/otp_validation",
    runOnMount: false,
  };
};

export const getAllUserChannelsHas = (): IAxiosPrivateGet => {
  return { method: "get", url: "dashboard/get_all_channels", timeout: 500000 };
};

export const setChannel = (data: { channelId: string }): IAxiosPrivatePost => {
  return {
    method: "post",
    url: "dashboard/set_channel",
    data,
    timeout: 500000,
    runOnMount: false,
  };
};

export const getChannel = (channelId: string): IAxiosPrivateGet => {
  return {
    method: "get",
    url: `dashboard/channel/${channelId}`,
    runOnMount: true,
  };
};

export const getPosts = (
  channelId: string,
  page: number,
  filter: string
): IAxiosPrivateGet => {
  return {
    method: "get",
    // url: `channels/${user_id}?page=${page}&filter=${filter}&tagName=${tagName}`,
    url: `dashboard/channel/${channelId}/posts`,
    params: {
      page: `${page}`,
      filter,
    },
  };
};

export const getPost = (postId: string): IAxiosPrivateGet => {
  return { method: "get", url: `dashboard/post/${postId}` };
};

export const getTop10 = (channelId: number): IAxiosPrivateGet => {
  return { method: "get", url: `dashboard/top10/${channelId}` };
};

export const getPostsStat = (channelId: number): IAxiosPrivateGet => {
  return { method: "get", url: `dashboard/post/stat/${channelId}` };
};

export const getTags = (userId: number): IAxiosPrivateGet => {
  return {
    method: "get",
    url: `dashboard/tags/all/${userId}`,
  };
};
