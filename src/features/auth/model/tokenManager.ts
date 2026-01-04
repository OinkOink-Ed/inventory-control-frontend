import type { TokenManager } from "@/shared/model";
import { authControllerRefreshToken } from "@gen-api"; // Kubb генерация
// import { type useProfileStore } from "@/features/auth"; // Импортируем ТОЛЬКО типы
import { profileStore } from "@/features/auth"; // Импортируем store

// Реализуем интерфейс TokenManager используя наш store
export class ProfileTokenManager implements TokenManager {
  // 1. Получить текущий access token
  getAccessToken(): string | null {
    return profileStore.getState().access_token || null;
  }

  // 2. Получить текущий refresh token
  getRefreshToken(): string | null {
    return profileStore.getState().refresh_token || null;
  }

  // 3. Установить новые токены
  setTokens(tokens: { access_token: string; refresh_token: string }): void {
    profileStore.getState().setProfile(tokens);
  }

  // 4. Очистить токены
  clearTokens(): void {
    profileStore.getState().clearProfile();
  }

  // 5. Выполнить запрос на обновление токена
  async refreshToken(): Promise<{ token: string }> {
    try {
      const refreshToken = this.getRefreshToken();

      if (!refreshToken) {
        this.clearTokens();
        throw new Error("Refresh token not found");
      }

      // Используем сгенерированный Kubb метод
      const response = await authControllerRefreshToken({
        token: refreshToken,
      });

      // Сохраняем новый access token (refresh token остается тот же)
      this.setTokens({
        access_token: response.token,
        refresh_token: refreshToken,
      });

      return response;
    } catch (error) {
      // При любой ошибке очищаем токены
      this.clearTokens();

      throw error instanceof Error
        ? error
        : new Error("Ошибка обновления токена авторизации");
    }
  }
}
