import axios from "axios";
import { tokenStorage } from "../utils/token";

const instance = axios.create({
  baseURL: "/member",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // 쿠키등의 인증정보 포함
});

// 요청 인터셉트 추가
instance.interceptors.request.use(
  (config) => {
    const token = tokenStorage.getAccessToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// 응답 인터셉트
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

export const MemberAPI = {
  /**
   * 비밀번호 수정
   * @param {string} memberId
   * @returns {Promise <any>}
   */
  ChangePassword: async (memberId) => {
    try {
      const response = await instance.patch("/me/password", {
        params: { memberId },
      });
      return response.data;
    } catch (error) {
      return handleError(error);
    }
  },

  /**
   * 이메일 인증 번호 전송
   * @param {string} email
   * @returns {Promise <any>}
   */
  CheckEmail: async (email) => {
    try {
      const response = await instance.post("/check/email", { email });
      return response.data;
    } catch (error) {
      return handleError(error);
    }
  },

  /**
   * 이메일 인증 번호 확인
   * @param {string} email
   * @param {string} verificationCode
   * @returns {Promise <any>}
   */
  CheckEmailCode: async (email, verificationCode) => {
    try {
      const response = await instance.get("/check/email/code", {
        params: { email, verificationCode },
      });
      return response.data;
    } catch (error) {
      return handleError(error);
    }
  },

  /**
   * 회원정보 조회
   * @param {string} memberId
   * @returns {Promise <any>}
   */
  ViewProfile: async (memberId) => {
    try {
      const response = await instance.get("/me", memberId);
      return response.data;
    } catch (error) {
      return handleError(error);
    }
  },

  /**
   * 회원정보 수정
   * @param {string} email
   * @returns {Promise <any>}
   */
  ChangeProfile: async (email) => {
    try {
      const response = await instance.patch("/me", memberId);
      return response.data;
    } catch (error) {
      return handleError(error);
    }
  },
};
