import axios from "axios";
import { tokenStorage } from "../../utils/token";

const instance = axios.create({
    baseURL: "http://10.10.9.52:30172/member",
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


  
export const SignAPI = {
/**
 * 회원가입
 * @param {Object} userData 
 * @param {string} userData.id 
 * @param {string} userData.password 
 * @param {string} userData.companyId 
 * @param {string} userData.email 
 * @param {string} userData.name 
 * @param {string} userData.birthDate 
 * @param {string} userData.gender 
 * @returns {Promise<any>} 
 */
 Signup: async (userData) => {
    try {
        const response = await instance.post("/signup", userData);
        return response.data;
    }   catch (error) {
        return handleError(error);
    }
 },

/**
 * ID 중복 확인
 * @param {string} id
 * @returns {Promise<boolean>}
 */
CheckId: async (id) => {
    try {
        const response = await instance.get('/check/id', {
            params: { id },
        });
        return response.data.isVerified;
    }   catch (error) {
        const handled = handleError(error);

        if (handled.code === 'DUPLICATE_ID') {
          handled.message = '이미 사용 중인 아이디입니다. 다른 아이디를 입력해주세요.';
        }
    
        return handled;
    }
},
};
