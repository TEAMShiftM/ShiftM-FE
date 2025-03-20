import axios from "axios";
import { tokenStorage } from "../../utils/token";

const instance = axios.create({
  baseURL: "http://10.10.9.52:30172/admin",
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

export const AdminLeaveAPI = {
  // 연차 생성
  CreateLeave: async () => {
    try {
      const response = await instance.post(`/leave`);
      return response.data;
    } catch (error) {
      return handleError(error);
    }
  },
  // 연차 수정
  EditLeave: async (leaveId) => {
    try {
      const response = await instance.patch(`/leave/${leaveId}`);
      return response.data;
    } catch (error) {
      return handleError(error);
    }
  },
  // 전체 연차 현황 조회
  ViewAllLeave: async (page, size) => {
    try {
      const response = await instance.get(`/leave`, {
        params: {
          page,
          size,
        },
      });
      return response.data;
    } catch (error) {
      return handleError(error);
    }
  },
  // 직원별 연차 현황 조회
  ViewEmployeeLeave: async (page, size, memberId) => {
    try {
      const response = await instance.patch(`/leave/${memberId}`, {
        params: {
          page,
          size,
          memberId,
        },
      });
      return response.data;
    } catch (error) {
      return handleError(error);
    }
  },
};
