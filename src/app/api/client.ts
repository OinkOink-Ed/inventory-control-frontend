//Спасибо нейронке, я сам бы с типами не разобрался бы ни в коем случае

import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import { authControllerRefreshToken } from "./generated";

// Типы
interface Token {
  state: {
    access_token: string;
    refresh_token?: string;
  };
}

interface RefreshTokenResponse {
  access_token: string;
  refresh_token?: string;
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

// Создаем экземпляр axios
export const axiosInstance = axios.create({
  baseURL: "http://localhost:3000",
});

// Функция для обновления токена
export const refreshAccessToken = async (): Promise<RefreshTokenResponse> => {
  try {
    const profileStorage = localStorage.getItem("profileStorage");
    if (!profileStorage) {
      throw new Error("No profile storage found");
    }

    const {
      state: { refresh_token },
    } = JSON.parse(profileStorage) as Token;
    if (!refresh_token) {
      throw new Error("No refresh token found");
    }

    const response = await authControllerRefreshToken(refresh_token);

    const newProfile = {
      state: {
        access_token: response.data.access_token,
        refresh_token: response.data.refresh_token ?? refresh_token,
      },
    };
    localStorage.setItem("profileStorage", JSON.stringify(newProfile));

    return response.data;
  } catch (error) {
    localStorage.removeItem("profileStorage");
    throw error instanceof Error ? error : new Error("Failed to refresh token");
  }
};

// Перехватчик запросов
axiosInstance.interceptors.request.use((config) => {
  if (config.url == "/api/auth") {
    return config;
  }

  const profileStorage = localStorage.getItem("profileStorage");
  if (profileStorage) {
    const {
      state: { access_token },
    } = JSON.parse(profileStorage) as Token;
    if (access_token) {
      config.headers.Authorization = `Bearer ${access_token}`;
    }
  }
  return config;
});

// Перехватчик ответов
let isRefreshing = false;
let failedQueue: {
  resolve: (value: string) => void;
  reject: (reason?: Error | null) => void;
}[] = [];

const processQueue = (error: Error | null, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(
        error instanceof Error ? error : new Error("Queue processing failed"),
      );
    } else {
      prom.resolve(token!);
    }
  });
  failedQueue = [];
};

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as AxiosRequestConfig & {
      _retry?: boolean;
    };

    if (error.config?.url == "/api/auth") {
      return Promise.reject(error);
    }

    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({
            resolve: (token: string) => {
              originalRequest.headers!.Authorization = `Bearer ${token}`;
              resolve(axiosInstance(originalRequest));
            },
            reject,
          });
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const { access_token } = await refreshAccessToken();
        processQueue(null, access_token);
        originalRequest.headers!.Authorization = `Bearer ${access_token}`;
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        const errorToReject =
          refreshError instanceof Error
            ? refreshError
            : new Error("Failed to refresh token");
        processQueue(errorToReject, null);
        localStorage.removeItem("profileStorage");
        return Promise.reject(errorToReject);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  },
);

// Основной клиент
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
