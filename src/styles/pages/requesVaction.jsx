import styled from "styled-components";
export const Container = styled.div`
  background-color: #f7faff;
  width: 100%;
  height: 100vh;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
export const Title = styled.h1`
  font-size: 32px;
  margin-bottom: 40px;
  margin-top: 100px;
`;
export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  width: 494px;
  margin-bottom: 20px;
`;
export const Label = styled.label`
  font-size: 16px;
  margin-bottom: 8px;
  margin-left: -35px;
`;
export const Input = styled.input`
  width: 494px;
  height: 60px;
  font-size: 20px;
  border: 1px solid #0075ff;
  border-radius: 12px;
  color: #0075ff;
  text-align: flex-start;
`;
export const PeriodContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  align-items: center;
  width: 100%;
`;
export const SmallInput = styled.input`
  width: 180px;
  height: 60px;
  border: 1px solid #0075ff;
  border-radius: 12px;
  font-size: 20px;
  text-align: left;
  color: #0075ff;
  margin-bottom: 25px;
  display: flex;
  align-items: center; /* 세로 중앙 정렬 */
  padding-left: 10px; /* 왼쪽 정렬 */
  box-sizing: border-box;
`;
export const Box1 = styled.div`
  width: 180px;
  height: 60px;
  border: 1px solid #0075ff;
  background-color: #f2f2f7;
  border-radius: 12px;
  font-size: 20px;
  text-align: left;
  color: #0075ff;
  margin-bottom: 25px;
  margin-right: 10px;
  text-align: left;
  align-items: center;
  padding-left: 10px;
  display: flex;
  align-items: center; /* 세로 중앙 정렬 */
  padding-left: 10px; /* 왼쪽 여백 추가 */
  box-sizing: border-box;
`;
export const Box2 = styled.div`
  width: 102px;
  height: 60px;
  border: 1px solid #0075ff;
  background-color: #f2f2f7;
  border-radius: 12px;
  font-size: 20px;
  text-align: left;
  color: #0075ff;
  margin-bottom: 25px;
  display: flex;
  align-items: center; /* 세로 중앙 정렬 */
  padding-left: 10px; /* 왼쪽 여백 추가 */
  box-sizing: border-box;
`;
export const SmallInput2 = styled.input`
  width: 102px;
  height: 60px;
  border: 1px solid #0075ff;
  border-radius: 12px;
  font-size: 20px;
  text-align: left;
  color: #0075ff;
  margin-bottom: 25px;
  display: flex;
  align-items: center; /* 세로 중앙 정렬 */
  padding-left: 10px; /* 왼쪽 정렬 */
  box-sizing: border-box;
`;
export const Add = styled.div`
  margin-right: 10px;
`;
export const AddButton = styled.button`
  display: flex;
  align-items: center;
  color: #0075ff;
  font-size: 40px;
  background: none;
  border: none;
  cursor: pointer;
  margin-left: -40px;
`;
export const SubmitButton = styled.button`
  width: 500px;
  height: 50px;
  background: #0075ff;
  color: white;
  font-size: 18px;
  border-radius: 12px;
  border: none;
  cursor: pointer;
  margin-top: 30px;
`;

export const TotalDays = styled.div`
  font-size: 18px;
  margin-top: 20px;
  margin-left: -430px;
`;

export const Select = styled.select`
  width: 494px;
  height: 60px;
  font-size: 20px;
  border: 1px solid #0075ff;
  border-radius: 12px;
  color: #0075ff;
  background-color: white;
  padding-left: 10px;
`;
