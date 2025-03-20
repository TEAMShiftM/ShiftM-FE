import axios from "axios";
import { tokenStorage } from "../../utils/token";

const instance = axios.create({
    baseURL: "http://10.10.9.52:30172/auth",
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true, // 쿠키 등의 인증정보 포함
  });

// 요청 인터셉터
instance.interceptors.request.use(
    async (config) => {
        const token = tokenStorage.getAccessToken();

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// 응답 인터셉터
instance.interceptors.response.use(
    (response) => response,
    (error) => {
      console.error("Response Error: ", error.response);
      return Promise.reject(error);
    } 
  );

/**
 * 공통 에러 처리 함수
 * @param {any} error
 * @returns {{ isSuccess: boolean, code: string, message: string }}
 */
const handleError = (error) => {
    if (axios.isAxiosError(error)) {
      return {
        ...(error.response?.data || {}),
        isSuccess: false,
        code: error.response?.data?.code || "UNKNOWN_ERROR",
        message:
          error.response?.data?.message || "알 수 없는 오류가 발생했습니다.",
      };
    }
    return {
      isSuccess: false,
      code: "UNKNOWN_ERROR",
      message: "알 수 없는 오류가 발생했습니다.",
    };
  };


  
export const AuthAPI = {
/**
 * 로그인
 * @param {string} id
 * @param {string} password
 * @returns {Promise<any>}
 */
 Login: async (id, password) => {
    try {
        const response = await instance.post("/login", { id, password });
  
        tokenStorage.setTokens(response.data.accessToken, response.data.refreshToken, id);

        return response.data;
      } catch (error) {
        return handleError(error);
      }
    },
  
/**
 * 로그아웃
 * @returns {Promise<void>}
 */
    Logout: async () => {
      try {
        await instance.post("/logout", {
          refreshToken: tokenStorage.getRefreshToken(),
        });
  
        tokenStorage.clearTokens();
        window.location.href = "/login";
      } catch (error) {
        return handleError(error);
      }
    },
  
/**
 * 토큰 재발급
 * @returns {Promise<any>}
 */
    ReissueToken: async () => {
      try {
        const response = await instance.post("/reissue", {
          refreshToken: tokenStorage.getRefreshToken(),
        });
  
        const { accessToken, refreshToken } = response.data;
  
        tokenStorage.setTokens(accessToken, refreshToken, tokenStorage.getUserId());
  
        return accessToken;
      } catch (error) {
        return handleError(error);
      }
    },
  };
