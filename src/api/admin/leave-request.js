import axios from "axios";
import { tokenStorage } from "../../utils/token";

const instance = axios.create({
  baseURL: "http://10.10.9.52:30172/admin/leave-request",
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

export const AdmLeaveAPI = {
  /**
   * 연차 신청 기록 조회
   * @param {number} page
   * @param {string} size
   * @returns {Promise{
   *   content: {leaveRequestId: number, memberName: string, startDate: string, endDate: string, count: number, status: string}[],
   *   page: number,
   *   size: number,
   *   totalPages: number,
   *   totalElements: number
   * }>}
   */
  requestList: async (page = 0, size = 10) => {
    try {
      const response = await instance.get("/", {
        params: { page, size },
      }
      );
      return response.data;
    } catch (error) {
      return handleError(error);
    }
  },
  
  /**
   * 연차 신청 승인 및 거절
   * @param {number} leaveRequestId
   * @param { APPROVED | REJECTED } status
   * @returns {Promise<{message: string}>}
   */
  statusChange: async (leaveRequestId, status) => {
    try {
      const response = await instance.patch(`/${leaveRequestId}`, null, {
        params: { status },
      });
      return response.data;
    } catch (error) {
      return handleError(error);
    }
  },
  /**
   * 직원별 연차 신청 기록 조회
   * @param {string} memberId
   * @param {number} page
   * @param {number} size
   * @returns {Promise<{
   *  content: {leaveRequestId: number, memberName: string, startDate: string, endDate: string, count: number, status: string}[],
   *  page: number,
   *  size: number,
   *  totalPages: number,
   *  totalElements: number
   * }>}
   */
  memberLeave: async (memberId, page = 0, size = 10) => {
    try {
        const response = await instance.get(`/${memberId}`, {
            params: { page, size },
        });
        return response.data;
    }   catch (error) {
        return handleError(error);
    }
    },
};