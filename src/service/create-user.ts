import { CREATE_USER } from "../contant/api";
import { CommonResponse } from "../types/commonResponse";
import { CreateNewUserReqI,CreateNewUserResI } from "../types/users";
import httpsService from "./httpsService";

export const CreateNewUser = (body: CreateNewUserReqI) => {
  return httpsService.post<CreateNewUserReqI,CommonResponse<CreateNewUserResI>>(CREATE_USER, body);
};
