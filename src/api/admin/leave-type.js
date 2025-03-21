import axios from "axios";
import { tokenStorage } from "../../utils/token";
import CreateLeaveType from "../../pages/admin/createLeaveType";

const instance = axios.create({
  baseURL: "http://10.10.9.52:30172/admin/leave-type",
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

export const LeaveTypeAPI = {
  /**
   * 연차 유형 조회
   * @returns {Promise <{typeList: {id: number, name: string}[]}>}
   */
  leaveTypes: async () => {
    try {
      const response = await instance.get("/");
      return response.data;
    } catch (error) {
      return handleError(error);
    }
  },

  /**
   * 연차 유형 생성
   * @param {string} name
   * @returns {Promise<{id: string, name: string}>}
   */
  createLeaveType: async (name) => {
    try {
      const response = await instance.post("/", { name });
      return response.data;
    } catch (error) {
      return handleError(error);
    }
},

  /**
   * 연차 유형 수정
   * @param {number} leaveTypeId
   * @param {string} name
   * @returns {Promise<{leaveTypeId: number, name: string}>}
   */
  editType: async (leaveTypeId, name) => {
    try {
      const response = await instance.patch(`/${leaveTypeId}`, { name });
      return response.data;
    } catch (error) {
      return handleError(error);
    }
},

  /**
   * 연차 유형 삭제
   * @param {string} name
   * @returns {Promise<{leaveTypeId: number, name: string}>}
   */
  deleteType: async (leaveTypeId) => {
    try {
      const response = await instance.delete(`/${leaveTypeId}`);
      return response.data;
    } catch (error) {
      return handleError(error);
    }
},
};