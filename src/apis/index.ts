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
  const response = await axiosPrivate.get("refresh", {
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
export const getLogOut = (): IAxiosPrivateGet => {
  return { url: "dashboard/logout", method: "get", runOnMount: false };
};
// export const getLogOut = async (axiosPrivate: AxiosInstance) => {
//   return await axiosPrivate.get("dashboard/logout");
// };

/**
 * get user info
 * @param axiosPrivate
 * @param controller
 * @returns
 */
export const getProfile = (): IAxiosPrivateGet => {
  return { url: "dashboard/profile", method: "get" };
};

// export const getProfile = async (
//   axiosPrivate: AxiosInstance,
//   controller: AbortController
// ) => {
//   return await axiosPrivate.get("dashboard/profile", {
//     signal: controller.signal,
//   });
// };

/**
 * get all channels belonged to specific user
 * @param axiosPrivate
 * @param user_id
 * @param controller
 * @returns
 */
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

// export const getChannels = async (
//   axiosPrivate: AxiosInstance,
//   page = 1,
//   user_id: number,
//   filter: string,
//   tagName = "",
//   controller?: AbortController
// ) => {
//   return await axiosPrivate.get(
//     `channels/${user_id}?page=${page}&filter=${filter}&tagName=${tagName}`,
//     {
//       signal: controller?.signal,
//     }
//   );
// };

/**
 * add api_id and api_hash info for user
 * @param axiosPrivate
 * @param data
 * @param controller
 * @returns
 */

export const updateApiInfo = (data: IChannelData): IAxiosPrivatePost => {
  return {
    method: "post",
    url: "dashboard/add_api_info",
    data,
    runOnMount: false,
  };
};
// export const updateApiInfo = async (
//   axiosPrivate: AxiosInstance,
//   data: IChannelData,
//   controller: AbortController
// ) => {
//   return await axiosPrivate.post("dashboard/add_api_info", data, {
//     signal: controller.signal,
//   });
// };

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

export const getChannel = (channelId: string): IAxiosPrivateGet => {
  return {
    method: "get",
    url: `dashboard/channel/${channelId}`,
    runOnMount: true,
  };
};
// export const getChannel = async (
//   axiosPrivate: AxiosInstance,
//   channelId: string,
//   controller: AbortController
// ) => {
//   return await axiosPrivate.get(`dashboard/channel/${channelId}`, {
//     signal: controller.signal,
//   });
// };

export const getPosts = async (
  axiosPrivate: AxiosInstance,
  channelId: string,
  page = 1,
  filter: string,
  controller: AbortController
) => {
  return await axiosPrivate.get(
    `dashboard/channel/${channelId}/posts?page=${page}&filter=${filter}`,
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

export const getTags = async (
  axiosPrivate: AxiosInstance,
  userId: number,
  controller: AbortController
) => {
  return await axiosPrivate.get(`dashboard/tags/all/${userId}`, {
    signal: controller.signal,
  });
};
