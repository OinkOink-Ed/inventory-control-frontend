import { AxiosError } from "axios";
import {
  ErrorResponseDto400,
  ErrorResponseDto401,
  ErrorResponseDto403,
  ErrorResponseDto404,
  ErrorResponseDto408,
  ErrorResponseDto500,
} from "../api/generated";

export function handlerError(dataError: unknown): string | null {
  if (dataError instanceof AxiosError && dataError.isAxiosError) {
    const data = dataError as AxiosError<
      | ErrorResponseDto400
      | ErrorResponseDto401
      | ErrorResponseDto403
      | ErrorResponseDto404
      | ErrorResponseDto408
      | ErrorResponseDto500
    >;

    if (data.response) {
      return data.response.data.message;
    } else return null;
  } else return null;
}
