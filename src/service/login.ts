import { LOGIN } from "../contant/api";
import { LoginReqI, LoginResI } from "../types/auth";
import { CommonResponse } from "../types/commonResponse";
import httpsService from "./httpsService";

export const LoginApi = (body: LoginReqI) => {
  return httpsService.post<LoginReqI,CommonResponse<LoginResI>>(LOGIN, body);
};