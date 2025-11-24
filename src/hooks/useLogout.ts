import { authControllerLogout } from "../shared/api/generated";
import { queryClientInstans } from "../app/queryClientInstans";
import { handlerError } from "../app/helpers/handlerError";
import { Answer } from "../app/Errors/Answer";
import { useProfileStore } from "../app/stores/profile/useProfileStore";
import { useNavigate } from "react-router";
import { useCallback } from "react";

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
      if (res == Answer.LOGOUT) void navigate("/auth", { replace: true });
    }
  }, [clearProfile, navigate, refreshToken]);

  return logout;
}
