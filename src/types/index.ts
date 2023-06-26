export interface IInputData {
  email: string;
  password: string;
}

export interface IErrorResponseReg {
  message: { email: string; password: string };
  status: boolean;
}

export interface IErrorResponseLogin {
  message: string;
  status: boolean;
}
