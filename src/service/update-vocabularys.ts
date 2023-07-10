import { UPDATE_VOCABULARYS } from "../contant/api";
import { UpdateVocabularysReqI } from "../types/updateVocabulary";
import httpsService from "./httpsService";

export const  updateVocabularysApi = (body:UpdateVocabularysReqI[]) => {
    return httpsService.post(UPDATE_VOCABULARYS,body)
}