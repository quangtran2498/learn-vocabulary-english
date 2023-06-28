export interface CreateNewUserReqI {
  name: string;
  password: string;
  email: string;
}
export interface CreateNewUserResI {
  email: string;
  isActive: boolean;
  name: string;
  password: string;
  userId: number;
}
