import axios, { AxiosInstance, AxiosRequestConfig } from "axios";

class Services {
  axios: AxiosInstance;
  constructor() {
    this.axios = axios.create({
      baseURL: "",
      timeout: 90000,
    });

    this.axios = axios;
    this.axios.defaults.withCredentials = false;

    // //! Interceptor request
    axios.interceptors.request.use(
      function (response) {
        return response;
      }
    );
    
    // ! Interceptor response
    axios.interceptors.response.use(
      function (response) {
        return response;
      },
      function (error) {
        return Promise.reject(error);
      }
    );
  }

  attachTokenToHeader(token: string) {
    this.axios.interceptors.request.use(
      function (config) {
        if (config.headers) {
          config.headers["Authorization"] = `Bearer ${token}`;
        }
        return config;
      },
      function (error) {
        return Promise.reject(error);
      }
    );
  }

  get<T = any, R = T>(url: string, config?: AxiosRequestConfig): Promise<R> {
    return this.axios.get<T, R>(url, { ...config });
  }

  post<T = any, R = T>(
    url: string,
    data?: T,
    config?: AxiosRequestConfig
  ): Promise<R> {
    return this.axios.post<T, R>(url, data, { ...config });
  }

  delete<T = any, R = T>(url: string, config?: AxiosRequestConfig): Promise<R> {
    return this.axios.delete<T, R>(url, { ...config });
  }

  put<T = any, R = T>(
    url: string,
    data: any,
    config?: AxiosRequestConfig
  ): Promise<R> {
    return this.axios.put<T, R>(url, data, { ...config });
  }
  patch<T = any, R = T>(
    url: string,
    data: any,
    config?: AxiosRequestConfig
  ): Promise<R> {
    return this.axios.patch<T, R>(url, data, { ...config });
  }
}

export default new Services();
