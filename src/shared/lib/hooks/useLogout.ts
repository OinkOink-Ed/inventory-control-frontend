import { useNavigate } from "react-router";
import { useCallback } from "react";
import { authControllerLogout } from "@api/gen";
import { useProfileStore } from "@features/auth/store/profile/useProfileStore";
import { queryClientInstans } from "@api/queryClientInstans";
import { ANSWER } from "@/lib/const/Answer";
import { handlerError } from "../helpers/handlerError";

export function useLogout(): () => Promise<void> {
  const refreshToken = useProfileStore((state) => state.refresh_token);
  const clearProfile = useProfileStore((state) => state.clearProfile);
  const navigate = useNavigate();

  const logout = useCallback(async () => {
    try {
      await authControllerLogout({ token: refreshToken });

      clearProfile();
      queryClientInstans.clear();
      void navigate("/auth");
    } catch (error) {
      const res = handlerError(error);
      if (res == ANSWER.LOGOUT) void navigate("/auth", { replace: true });
    }
  }, [clearProfile, navigate, refreshToken]);

  return logout;
}
