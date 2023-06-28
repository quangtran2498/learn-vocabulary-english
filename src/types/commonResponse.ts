export interface CommonResponse<D = any> {
    data: D;
    status: number;
    message: string;
  }
  