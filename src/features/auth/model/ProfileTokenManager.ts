import { authControllerRefreshToken } from "@gen-api";
import { useProfileStore } from "@features/auth";
import type { TokenManager } from "@/shared/model";

interface RefreshTokenResponse {
  token: string;
}

export class ProfileTokenManager implements TokenManager {
  getRefreshToken(): string {
    return useProfileStore.getState().refresh_token;
  }

  setTokens(tokens: { access_token: string; refresh_token: string }): void {
    useProfileStore.getState().setProfile(tokens);
  }

  clearTokens(): void {
    useProfileStore.getState().clearProfile();
  }

  getAccessToken(): string {
    return useProfileStore.getState().access_token;
  }

  refreshAccessToken = async (): Promise<RefreshTokenResponse> => {
    try {
      const refreshToken = this.getRefreshToken();

      const response = await authControllerRefreshToken({
        token: refreshToken,
      });

      const accessToken = response.token;

      this.setTokens({
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
}
