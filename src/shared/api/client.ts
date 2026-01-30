import type { TokenManager } from "@/shared/model/types/TokenManager";
import axios, {
  AxiosError,
  type AxiosRequestConfig,
  type AxiosResponse,
} from "axios";

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

export class HttpClient {
  private instance;
  private tokenManager: TokenManager;
  private isRefreshing = false;
  private failedQueue: {
    resolve: (value: string) => void;
    reject: (reason?: Error | null) => void;
  }[] = [];

  constructor(tokenManager: TokenManager) {
    this.instance = axios.create({
      withCredentials: true,
    });
    this.tokenManager = tokenManager;

    this.setupInterceptors();
  }

  private setupInterceptors() {
    this.instance.interceptors.request.use((config) => {
      if (config.url == "/api/auth") {
        return config;
      }

      const accessToken = this.tokenManager.getAccessToken();

      config.headers.Authorization = `Bearer ${accessToken}`;
      return config;
    });

    this.instance.interceptors.response.use(
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
          this.processQueue(error, null);
          return Promise.reject(error);
        }

        if (error.response?.status === 401 && !originalRequest._retry) {
          if (this.isRefreshing) {
            return new Promise((resolve, reject) => {
              this.failedQueue.push({
                resolve: (token: string) => {
                  const headers: Record<string, string> = {};

                  if (originalRequest.headers) {
                    // Обработка разных типов headers
                    if (originalRequest.headers instanceof axios.AxiosHeaders) {
                      Object.assign(headers, originalRequest.headers.toJSON());
                    } else if (
                      typeof originalRequest.headers === "object" &&
                      !Array.isArray(originalRequest.headers)
                    ) {
                      Object.assign(headers, originalRequest.headers);
                    }
                  }

                  headers.Authorization = `Bearer ${token}`;
                  originalRequest.headers = headers;

                  resolve(this.instance(originalRequest));
                },
                reject,
              });
            });
          }

          originalRequest._retry = true;
          this.isRefreshing = true;

          try {
            const { token } = await this.tokenManager.refreshAccessToken();

            this.processQueue(null, token);

            // Тот же код для обновления headers
            const headers: Record<string, string> = {};

            if (originalRequest.headers) {
              if (originalRequest.headers instanceof axios.AxiosHeaders) {
                Object.assign(headers, originalRequest.headers.toJSON());
              } else if (
                typeof originalRequest.headers === "object" &&
                !Array.isArray(originalRequest.headers)
              ) {
                Object.assign(headers, originalRequest.headers);
              }
            }

            headers.Authorization = `Bearer ${token}`;
            originalRequest.headers = headers;

            return await this.instance(originalRequest);
          } catch (refreshError) {
            const errorToReject =
              refreshError instanceof Error
                ? refreshError
                : new Error("Ошибка обновления токена авторизации");
            this.processQueue(errorToReject, null);

            return await Promise.reject(errorToReject);
          } finally {
            this.isRefreshing = false;
          }
        }

        return Promise.reject(error);
      },
    );
  }

  private processQueue = (error: Error | null, token: string | null = null) => {
    this.failedQueue.forEach((prom) => {
      if (error) {
        prom.reject(
          error instanceof Error ? error : new Error("Queue processing failed"),
        );
      } else {
        if (token === null) {
          prom.reject(new Error("Queue processing failed"));
        } else prom.resolve(token);
      }
    });
    this.failedQueue = [];
  };

  request = async <TData = unknown, TError = unknown, TVariables = unknown>(
    config: RequestConfig<TVariables>,
  ): Promise<ResponseConfig<TData | TError>> => {
    const response = await this.instance
      .request<TData, ResponseConfig<TData | TError>>({ ...config })
      .catch((e: unknown) => {
        throw e as ResponseErrorConfig<TError>;
      });

    return response;
  };
}

let httpClientInstance: HttpClient | null = null;

export function initHttpClient(tokenManager: TokenManager): HttpClient {
  httpClientInstance ??= new HttpClient(tokenManager);
  return httpClientInstance;
}

export default async function request<
  TData = unknown,
  TError = unknown,
  TVariables = unknown,
>(config: RequestConfig<TVariables>): Promise<ResponseConfig<TData | TError>> {
  if (!httpClientInstance) {
    throw new Error(
      "HttpClient не инициализирован. Вызовите initHttpClient() перед использованием.",
    );
  }

  try {
    const response = await httpClientInstance.request<
      TData,
      TError,
      TVariables
    >(config);
    return response;
  } catch (error) {
    throw error as ResponseErrorConfig<TError>;
  }
}

// export function getHttpClient() {
//   if (!httpClientInstance) {
//     throw new Error("HttpClient not initialized. Call initHttpClient() first.");
//   }

//   return httpClientInstance.request;
// }

// export default getHttpClient;

// export const axiosInstance = axios.create({
//   withCredentials: true,
// });

// const refreshAccessToken = async (): Promise<RefreshTokenResponse> => {
//   const profile = useProfileStore;

//   try {
//     const refreshToken = profile.getState().refresh_token;

//     const response = await authControllerRefreshToken({
//       token: refreshToken,
//     });

//     const accessToken = response.token;

//     profile.getState().setProfile({
//       access_token: accessToken,
//       refresh_token: refreshToken,
//     });

//     return response;
//   } catch (error) {
//     throw error instanceof Error
//       ? error
//       : new Error("Ошибка обновления токена авторизации");
//   }
// };

// axiosInstance.interceptors.request.use((config) => {
//   const { access_token } = useProfileStore.getState();
//   if (config.url == "/api/auth") {
//     return config;
//   }

//   const accessToken = access_token;

//   config.headers.Authorization = `Bearer ${accessToken}`;
//   return config;
// });

// let isRefreshing = false;
// let failedQueue: {
//   resolve: (value: string) => void;
//   reject: (reason?: Error | null) => void;
// }[] = [];

// const processQueue = (error: Error | null, token: string | null = null) => {
//   failedQueue.forEach((prom) => {
//     if (error) {
//       prom.reject(
//         error instanceof Error ? error : new Error("Queue processing failed"),
//       );
//     } else {
//       if (token === null) {
//         prom.reject(new Error("Queue processing failed"));
//       } else prom.resolve(token);
//     }
//   });
//   failedQueue = [];
// };

// axiosInstance.interceptors.response.use(
//   (response) => response,
//   async (error: AxiosError) => {
//     if (error.code === "ERR_CANCELED" || error.message === "canceled") {
//       return Promise.reject(error);
//     }

//     const originalRequest = error.config as AxiosRequestConfig & {
//       _retry?: boolean;
//     };

//     if (
//       error.config?.url == "/api/auth" ||
//       error.config?.url == "/api/auth/logout" ||
//       error.config?.url == "/api/auth/refresh"
//     ) {
//       processQueue(error, null);
//       return Promise.reject(error);
//     }

//     if (error.response?.status === 401 && !originalRequest._retry) {
//       if (isRefreshing) {
//         return new Promise((resolve, reject) => {
//           failedQueue.push({
//             resolve: (token: string) => {
//               // Безопасное обновление headers
//               const headers: Record<string, string> = {};

//               if (originalRequest.headers) {
//                 // Обработка разных типов headers
//                 if (originalRequest.headers instanceof axios.AxiosHeaders) {
//                   Object.assign(headers, originalRequest.headers.toJSON());
//                 } else if (
//                   typeof originalRequest.headers === "object" &&
//                   !Array.isArray(originalRequest.headers)
//                 ) {
//                   Object.assign(headers, originalRequest.headers);
//                 }
//               }

//               headers.Authorization = `Bearer ${token}`;
//               originalRequest.headers = headers;

//               resolve(axiosInstance(originalRequest));
//             },
//             reject,
//           });
//         });
//       }

//       originalRequest._retry = true;
//       isRefreshing = true;

//       try {
//         const { token } = await refreshAccessToken();

//         processQueue(null, token);

//         // Тот же код для обновления headers
//         const headers: Record<string, string> = {};

//         if (originalRequest.headers) {
//           if (originalRequest.headers instanceof axios.AxiosHeaders) {
//             Object.assign(headers, originalRequest.headers.toJSON());
//           } else if (
//             typeof originalRequest.headers === "object" &&
//             !Array.isArray(originalRequest.headers)
//           ) {
//             Object.assign(headers, originalRequest.headers);
//           }
//         }

//         headers.Authorization = `Bearer ${token}`;
//         originalRequest.headers = headers;

//         return await axiosInstance(originalRequest);
//       } catch (refreshError) {
//         const errorToReject =
//           refreshError instanceof Error
//             ? refreshError
//             : new Error("Ошибка обновления токена авторизации");
//         processQueue(errorToReject, null);

//         return await Promise.reject(errorToReject);
//       } finally {
//         isRefreshing = false;
//       }
//     }

//     return Promise.reject(error);
//   },
// );

// const axiosClient = async <
//   TData = unknown,
//   TError = unknown,
//   TVariables = unknown,
// >(
//   config: RequestConfig<TVariables>,
// ): Promise<ResponseConfig<TData | TError>> => {
//   const response = await axiosInstance
//     .request<TData, ResponseConfig<TData | TError>>({ ...config })
//     .catch((e: unknown) => {
//       throw e as ResponseErrorConfig<TError>;
//     });

//   return response;
// };
// export default request;
