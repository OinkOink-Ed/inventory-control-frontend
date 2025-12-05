import { queryClientInstans } from "@api/queryClientInstans";
import { useProfileStore } from "@/app/stores/profile/useProfileStore";
import { authControllerSignIn, type PostAuthDto } from "@api/gen";
import { useCallback } from "react";
import type { UseFormReset } from "react-hook-form";
import { useNavigate } from "react-router";
import { handlerError } from "@/shared/helpers/handlerError";
import { ANSWER } from "@/lib/const/Answer";

interface useOnSubmitProps {
  reset: UseFormReset<PostAuthDto>;
}

export function useOnSubmit({ reset }: useOnSubmitProps) {
  const setProfile = useProfileStore((state) => state.setProfile);

  const navigate = useNavigate();

  const onSubmit = useCallback(
    async (data: PostAuthDto) => {
      try {
        const res = await authControllerSignIn(data);

        setProfile(res);
        await queryClientInstans.invalidateQueries();
        void navigate("/");
      } catch (error: unknown) {
        const res = handlerError(error);
        if (res == ANSWER.LOGOUT) reset();
        if (res == ANSWER.RESET) reset();
      }
    },
    [navigate, reset, setProfile],
  );
  return onSubmit;
}
