export type TUser = {
    userId: string;
    email: string;
    role: string;
    password: string;
    iat: number;
    exp: number;
  };

 export type TAuthState = {
    user: null | TUser;
    token: null | string;
  };
