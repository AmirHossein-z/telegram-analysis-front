import { ReactNode, createContext, useState, JSX, Dispatch } from "react";

interface IAuth {
  accessToken: string;
  userId: string;
}

interface IAuthContextValue {
  auth: IAuth;
  setAuth: Dispatch<React.SetStateAction<IAuth>>;
}

interface IProps {
  children: ReactNode;
}
// const initialState: IAuth = {
//   accessToken: "",
//   setAuth: () => {},
// };

const AuthContext = createContext<IAuthContextValue>({
  auth: { accessToken: "", userId: "" },
  setAuth: () => {},
});

export const AuthProvider = ({ children }: IProps): JSX.Element => {
  const [auth, setAuth] = useState<IAuth>({ accessToken: "", userId: "" });

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
