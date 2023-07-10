import { GET_USER_VOCABULARYS } from "../contant/api";
import httpsService from "./httpsService";

export const getUserVocabularyApi = () => {
    return httpsService.get(GET_USER_VOCABULARYS)
}