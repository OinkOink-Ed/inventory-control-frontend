import { AxiosError } from "axios";
import { toast } from "sonner";
import { queryClientInstans } from "../../shared/api/queryClientInstans";
import type {
  ErrorResponseDto400,
  ErrorResponseDto401,
  ErrorResponseDto403,
  ErrorResponseDto404,
  ErrorResponseDto408,
  ErrorResponseDto500,
} from "@api/gen";
import { useProfileStore } from "@app-stores/profile/useProfileStore";
import { ANSWER, type Answer } from "@/lib/const/Answer";

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
    return ANSWER.LOGOUT;
  }

  const data = dataError as AxiosError<
    | ErrorResponseDto400
    | ErrorResponseDto401
    | ErrorResponseDto403
    | ErrorResponseDto404
    | ErrorResponseDto408
    | ErrorResponseDto500
  >;

  if (data.code === "ERR_NETWORK") {
    toast.error("Сервер недоступен", {
      position: "top-center",
    });
    return ANSWER.RESET;
  }

  if (data.response?.status == 401) {
    toast.error(data.response.data.message, {
      position: "top-center",
    });
    profile.getState().clearProfile();
    void queryClientInstans.invalidateQueries();
    return ANSWER.LOGOUT;
  }

  if (data.response?.data.message) {
    toast.error(data.response.data.message, {
      position: "top-center",
    });
    return ANSWER.RESET;
  } else {
    toast.error("Неизвестная ошибка!", {
      position: "top-center",
    });
    return ANSWER.RESET;
  }
}
