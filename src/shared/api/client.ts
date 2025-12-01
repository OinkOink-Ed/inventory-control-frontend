import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import { authControllerRefreshTokenClient } from "@gen/clients/AuthService/authControllerRefreshTokenClient";

interface RefreshTokenResponse {
  token: string;
}

export interface RequestConfig<TData = unknown> {
  url?: string;
  method: "GET" | "PUT" | "PATCH" | "POST" | "DELETE" | "OPTIONS";
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

export type ResponseErrorConfig<TError = unknown> = AxiosError<TError>;

export const axiosInstance = axios.create({
  withCredentials: true,
});

export const refreshAccessToken = async (): Promise<RefreshTokenResponse> => {
  const profile = useProfileStore;

  try {
    const refreshToken = profile.getState().refresh_token;

    const response = await authControllerRefreshTokenClient({
      token: refreshToken,
    });

    const accessToken = response.token;

    profile.getState().setProfile({
      access_token: accessToken,
      refresh_token: refreshToken,
    });

    return response;
  } catch (error) {
    throw error instanceof Error
      ? error
      : new Error("Ошибка обновления токена авторизации");
  }
};

axiosInstance.interceptors.request.use((config) => {
  const { access_token } = useProfileStore.getState();
  if (config.url == "/api/auth") {
    return config;
  }

  const accessToken = access_token;

  config.headers.Authorization = `Bearer ${accessToken}`;
  return config;
});

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
    if (error.code === "ERR_CANCELED" || error.message === "canceled") {
      return Promise.reject(error);
    }

    const originalRequest = error.config as AxiosRequestConfig & {
      _retry?: boolean;
    };

    if (
      error.config?.url == "/api/auth" ||
      error.config?.url == "/api/auth/logout" ||
      error.config?.url == "/api/auth/refresh"
    ) {
      processQueue(error, null);
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
        const { token } = await refreshAccessToken();

        processQueue(null, token);

        originalRequest.headers!.Authorization = `Bearer ${token}`;
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        const errorToReject =
          refreshError instanceof Error
            ? refreshError
            : new Error("Ошибка обновления токена авторизации");
        processQueue(errorToReject, null);

        return Promise.reject(errorToReject);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  },
);

const axiosClient = async <TData, TError = unknown, TVariables = unknown>(
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
