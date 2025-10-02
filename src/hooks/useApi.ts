import axiosClient from "@/app/api/client";
import {
  useMutation,
  UseMutationOptions,
  useQuery,
  UseQueryOptions,
} from "@tanstack/react-query";

type ApiMutationFunction<TData, TVariables> = (
  data: TVariables,
  config?: { client?: typeof axiosClient },
) => Promise<TData>;

export function useApiMutation<TData, TVariables>(
  apiFunction: ApiMutationFunction<TData, TVariables>,
  options?: Omit<UseMutationOptions<TData, Error, TVariables>, "mutationFn">,
) {
  return useMutation({
    mutationFn: (data: TVariables) =>
      apiFunction(data, { client: axiosClient }),
    ...options,
  });
}

export function useApiQuery<TData>(
  options: Omit<UseQueryOptions<TData>, "queryFn"> & {
    queryFn: (config: {
      signal?: AbortSignal;
      client?: typeof axiosClient;
    }) => Promise<TData>;
  },
) {
  return useQuery({
    ...options,
    queryFn: (context) =>
      options.queryFn({
        signal: context.signal,
        client: axiosClient,
      }),
  });
}
