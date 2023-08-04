import { ReactNode } from "react";

export interface IInputData {
  email: string;
  password: string;
  phone?: string;
  name?: string;
}

export interface IErrorResponseReg {
  // message: { email: string; password: string; phone?: string ,name:string};
  message: { [key: string]: string }[];
  status: boolean;
}

export interface IErrorResponseLogin {
  message: string;
  status: boolean;
}

export interface IChannelData {
  apiId: string;
  apiHash: string;
}

export interface ICardProps {
  id: number;
  name?: string;
  channelTelegramId?: string;
  view: number;
  share: number;
  // tags: string;
  path: string;
  tags: ReactNode;
}

export interface IChannel {
  id: number;
  name: string;
  description: string;
  channel_telegram_id: string;
  members_count: number;
  view: number;
  share: number;
  tags: string;
  user_id: number;
  channel_date_created: string;
  channel_date_updated: string;
  type?: string;
}

export interface IPost {
  id: number;
  details: string;
  view: number;
  share: number;
  type: number;
  tags: string;
  channel_id: number;
  created_at: string;
  updated_at?: string;
}

interface IAxiosPrivateBase {
  url: string;
  runOnMount?: boolean;
}

export interface IAxiosPrivateGet extends IAxiosPrivateBase {
  method: "get";
  params?: { [key: string]: string };
}

export interface IAxiosPrivatePost extends IAxiosPrivateBase {
  method: "post";
  data: any;
}

export type IAxiosPrivate = IAxiosPrivateGet | IAxiosPrivatePost;
