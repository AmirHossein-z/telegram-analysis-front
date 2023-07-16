export interface IInputData {
  email: string;
  password: string;
  phone?: string;
}

export interface IErrorResponseReg {
  // message: { email: string; password: string; phone?: string };
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
