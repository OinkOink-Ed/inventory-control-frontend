interface RefreshTokenResponse {
  token: string;
}

export interface TokenManager {
  refreshAccessToken(): Promise<RefreshTokenResponse>;
  getRefreshToken(): string;
  getAccessToken(): string;
  setTokens(tokens: { access_token: string; refresh_token: string }): void;
  clearTokens(): void;
}
