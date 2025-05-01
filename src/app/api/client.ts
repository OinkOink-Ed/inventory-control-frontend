// Написано с божъей помощью и примером от kubb.dev

import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";

interface Token {
  state: {
    token: string;
  };
}

export interface RequestConfig<TData = unknown> {
  url?: string;
  method: "GET" | "PUT" | "PATCH" | "POST" | "DELETE";
  params?: object;
  data?: TData | FormData;
  responseType?:
    | "arraybuffer"
    | "blob"
    | "document"
    | "json"
    | "text"
    | "stream";
  signal?: AbortSignal;
  headers?: AxiosRequestConfig["headers"];
}

export interface ResponseConfig<TData = unknown> {
  data: TData;
  status: number;
  statusText: string;
  headers?: AxiosResponse["headers"];
}

export const axiosInstance = axios.create({
  baseURL: "http://localhost:3000",
});

axiosInstance.interceptors.request.use((config) => {
  const profileStorage = localStorage.getItem("profileStorage");
  if (profileStorage) {
    const token = (JSON.parse(profileStorage) as Token).state.token;
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export const axiosClient = async <
  TData,
  TError = unknown,
  TVariables = unknown,
>(
  config: RequestConfig<TVariables>,
): Promise<ResponseConfig<TData>> => {
  const response = await axiosInstance
    .request({ ...config })
    .catch((e: AxiosError<TError>) => {
      throw e;
    });

  return response;
};

export default axiosClient;
