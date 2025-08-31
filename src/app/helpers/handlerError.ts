import { AxiosError } from "axios";
import {
  ErrorResponseDto400,
  ErrorResponseDto401,
  ErrorResponseDto403,
  ErrorResponseDto404,
  ErrorResponseDto408,
  ErrorResponseDto500,
} from "../api/generated";
import { useProfileStore } from "../stores/profile/useProfileStore";
import { toast } from "sonner";
import { Answer } from "../Errors/Answer";
import { queryClientInstans } from "../queryClientInstans";

export function handlerError(dataError: unknown): Answer {
  const profile = useProfileStore;

  if (
    !(dataError instanceof AxiosError) &&
    (typeof dataError !== "object" ||
      dataError === null ||
      !("isAxiosError" in dataError) ||
      !dataError.isAxiosError)
  ) {
    profile.getState().clearProfile();
    void queryClientInstans.invalidateQueries();
    return Answer.LOGOUT;
  }

  const data = dataError as AxiosError<
    | ErrorResponseDto400
    | ErrorResponseDto401
    | ErrorResponseDto403
    | ErrorResponseDto404
    | ErrorResponseDto408
    | ErrorResponseDto500
  >;

  if (data.response?.status == 401) {
    toast.error(data.response?.data.message, {
      position: "top-center",
    });
    profile.getState().clearProfile();
    void queryClientInstans.invalidateQueries();
    return Answer.LOGOUT;
  }

  if (data.response?.data.message) {
    toast.error(data.response?.data.message, {
      position: "top-center",
    });
    return Answer.RESET;
  } else {
    toast.error("Неизвестная ошибка!", {
      position: "top-center",
    });
    return Answer.RESET;
  }
}
