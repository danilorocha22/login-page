import { UserLogin } from "./user-login";

export interface User {
  id: number;
  name: string;
  userLogin: UserLogin;
}
