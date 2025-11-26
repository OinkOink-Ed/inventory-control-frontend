import { queryClientInstans } from "@/app/queryClientInstans";
import { useProfileStore } from "@/app/stores/profile/useProfileStore";
import { useCallback } from "react";
import { useNavigate } from "react-router";

export function useOnSubmit() {
  const setProfile = useProfileStore((state) => state.setProfile);

  const navigate = useNavigate();

  const onSubmit = useCallback(
    (data: PostAuthDto) => async (data: PostAuthDto) => {
      try {
        const res = await authControllerSignIn(data);

        setProfile(res);
        await queryClientInstans.invalidateQueries();
        void navigate("/");
      } catch (error: unknown) {
        const res = handlerError(error);
        if (res == Answer.LOGOUT) form.reset();
        if (res == Answer.RESET) form.reset();
      }
    },
    [navigate, setProfile],
  );

  return onSubmit;
}
