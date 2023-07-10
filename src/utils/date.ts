import moment from "moment";

export const convertDateYYYYMMDD = (date: string) => {
  return date ? date?.split("-").reverse().join("-") : "";
};

export const convertDatemMoment = {
  format: (date: string, patternDate?: string, patternConvert?: string) =>
    moment(date, patternDate ?? "DD-MM-YYYY").format(
      patternConvert ?? "YYYY-MM-DD"
    ),
};
