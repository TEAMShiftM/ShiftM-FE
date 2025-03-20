import styled from "styled-components";
export const Container = styled.div`
  background-color: #f7faff;
  width: 100%;
  height: 100%;
  padding: 20px;
  align-items: center;
  justify-content: center;
  padding-top: 100px;
`;
export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 18px;
  margin-left: 160px;
  margin-right: 130px;
  width: 1116px;
  font-weight: 500;
`;
export const DateContainer = styled.div`
  color: black;
  font-size: 24px;
`;
export const Name = styled.div`
  color: black;
  font-size: 30px;
  margin-top: 40px;
  margin-left: 71px;
  font-weight: 700;
`;
export const Bar = styled.div`
  color: black;
  font-size: 30px;
  margin-left: 71px;
  margin-right: 24px;
`;
export const TimeBox = styled.div`
  color: black;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-top: 15px;
  font-weight: 500;
  font-size: 20px;
`;
export const Button = styled.button`
  background-color: ${(props) => (props.primary ? "#4c91ff" : "#ffffff")};
  color: ${(props) => (props.primary ? "#ffffff" : "#000000")};
  border: 1px solid #4c91ff;
  padding: 10px 15px;
  border-radius: 8px;
  cursor: pointer;
  width: 166px;
  height: 50px;
  margin-right: 25px;
  font-size: 20px;
  font-weight: 500;
`;
export const Card = styled.div`
  background: white;
  border-radius: 10px;
  padding: 20px;
  margin: 20px 0;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  width: 1120px;
  height: 300px;
  margin-left: 162px;
`;
export const WorkingTime = styled.div`
  width: 66px;
  align-items: center;
  justify-content: center;
  display: flex;
  color: black;
`;
export const WorkButton = styled.button`
  width: 974px;
  height: 73px;
  background-color: rgba(0, 117, 255, 0.7);
  color: white;
  font-size: 24px;
  border-radius: 20px;
  border: none;
  cursor: pointer;
  align-items: center;
  margin-top: 66px;
  margin-left: 71px;
  font-weight: 500;
`;
export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 70px;
`;
export const ModalContent = styled.div`
  width: 784px;
  height: 600px;
  background: #f3f9ff;
  border-radius: 20px;
  position: relative;
  display: flex;
  flex-direction: column;
  align-itmes: center;
`;
export const ModalButton = styled.button`
  position: relative;
  background: rgba(0, 117, 255, 0.7);
  width: 166px;
  height: 50px;
  color: white;
  cursor: pointer;
  border: none;
  border-radius: 20px;
  margin-top: 30px;
  margin-left: 309px;
  font-size: 20px;
`;
export const Map = styled.div`
  width: 735px;
  height: 445px;
  border-radius: 20px;
  margin-top: 45px;
  margin-left: 23px;
`;
export const ScheduleContainer = styled.div`
  display: flex;
  flex-direction: column; /* 세로 정렬 */
  align-items: center;
  height: auto;
`;
export const Weekend = styled.div`
  margin-top: 10px;
  margin-bottom: 20px;
`;
export const DayCard = styled.div`
  flex: 1;
  width: 130px;
  height: 130px;
  background: ${(props) =>
    props.active ? "rgba(0, 117, 255, 0.3)" : "rgba(0, 117, 255, 0.1)"};
  border-radius: 20px;
  font-size: 24px;
  font-weight: 500;
  text-align: center;
  margin-top: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-right: 9px;
  padding: 0px;
  color: ${(props) => props.isWeekend && "red"};
  &:nth-child(1) {
    color: red; /* Sunday */
  }
  &:nth-child(7) {
    color: blue; /* Saturday */
  }
`;
export const ProgressContainer = styled.div`
  width: 924px;
  height: 24px;
  background: rgba(0, 117, 255, 0.1);
  border-radius: 12px;
  margin-top: 10px;
  position: relative;
  overflow: hidden;
`;
export const ProgressBar = styled.div`
  height: 100%;
  width: ${(props) => props.progress}%;
  background: #0075ff;
  transition: width 1s linear;
  border-radius: 12px;
`;
export const DayCardContainer = styled.div`
  display: flex;
  width: 964px;
  margin-bottom: 65px;
`;
export const Card2 = styled.div`
  background: white;
  border-radius: 10px;
  padding: 20px;
  margin: 20px 0;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  width: 1120px;
  height: 400px;
  margin-left: 162px;
`;
export const StatusBadge = styled.div`
  background-color: #4c91ff;
  color: white;
  font-size: 16px;
  font-weight: 600;
  padding: 5px 10px;
  border-radius: 10px;
  margin-left: 10px;
`;
