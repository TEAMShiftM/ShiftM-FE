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

export const AdminShiftAPI = {
  // 전체 근무 기록 조회
  ViewallShift: async (page = 1, size = 10, sort = "asc", name = "") => {
    try {
      const response = await instance.get(`/shift`, {
        params: {
          page,
          size,
          sort,
          name,
        },
      });
      return response.data;
    } catch (error) {
      return handleError(error);
    }
  },

  // 사후 출근 신청 조회
  ViewAfterCheckIn: async (page = 1, size = 10, sort = "asc", name = "") => {
    try {
      const response = await instance.get(`/shift/after-checkin`, {
        params: {
          page,
          size,
          sort,
          name,
        },
      });
      return response.data;
    } catch (error) {
      return handleError(error);
    }
  },
  // 출근 신청 상태 변경
  ViewStatus: async (shiftId) => {
    try {
      const response = await instance.patch(
        `/shift/${shiftId}/status`,
        updateData
      );
      return response.data;
    } catch (error) {
      return handleError(error);
    }
  },
  // 근무 기록 수정 (PATCH 요청)
  EditShift: async (shiftId, updateData) => {
    try {
      const response = await instance.patch(`/shift/${shiftId}`, updateData);
      return response.data;
    } catch (error) {
      return handleError(error);
    }
  },

  // 근무 기록 삭제 (DELETE 요청)
  DeleteShift: async (shiftId) => {
    try {
      const response = await instance.delete(`/shift/${shiftId}`);
      return response.data;
    } catch (error) {
      return handleError(error);
    }
  },

  // 근무 기록 엑셀 파일 변환
  Export: async () => {
    try {
      const response = await instance.get(`/shift/export`);
      return response.data;
    } catch (error) {
      return handleError(error);
    }
  },
};
