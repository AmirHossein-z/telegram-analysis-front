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
  tags: string;
  path: string;
}
