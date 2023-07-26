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
  name: string;
  channelTelegramId: string;
  view: number;
  share: number;
  tags: string;
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
