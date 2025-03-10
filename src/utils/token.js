export const tokenStorage = {
  /**
   * 토큰 저장
   * @param {string} accessToken
   * @param {string} refreshToken
   * @param {string} userId
   */
  setTokens: (accessToken, refreshToken, userId) => {
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);
    localStorage.setItem("userId", userId);
  },

  /**
   * 액세스 토큰 가져오기
   * @returns {string | null}
   */
  getAccessToken: () => localStorage.getItem("accessToken"),

  /**
   * 리프레시 토큰 가져오기
   * @returns {string | null}
   */
  getRefreshToken: () => localStorage.getItem("refreshToken"),

  /**
   * 유저 ID 가져오기
   * @returns {string | null}
   */
  getUserId: () => {
    const userId = localStorage.getItem("userId");
    return userId && userId !== "undefined" ? userId : null;
  },

  /**
   * 저장된 토큰 삭제
   */
  clearTokens: () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("userId");
  },
};
