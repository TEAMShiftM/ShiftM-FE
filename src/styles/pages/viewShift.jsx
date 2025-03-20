import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #eff6ff;
  padding-top: 100px;
  margin-left: 0px;
`;

export const Card = styled.div`
  width: 1295px;
  height: 1067px;
  justify-content: center;
  align-items: center;
  margin-bottom: 50px;
`;

export const Title = styled.div`
  font-size: 24px;
  font-weight: 600;
  text-align: left;
  margin-bottom: 32px;
  margin-top: 45px;
  cursor: pointer;
  display: flex;
  align-items: center;
  position: relative;
`;

export const CalendarGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  margin-top: 20px;
`;

export const DayName = styled.div`
  text-align: flex-start;
  font-size: 16px;
  color: #969696;
  background-color: white;
  height: 43px;
  width: 185px;
  border: 1px solid rgba(232, 232, 232, 0.74);
  display: flex;
  align-items: center;
`;

export const DateBox = styled.div`
  width: 185px;
  height: 192.6px;
  font-size: 21px;
  background-color: ${(props) =>
    props.isInactive ? "#e8e8e8" : props.isToday ? "white" : "white"};
  color: ${(props) =>
    props.isInactive ? "#7f7f7f" : props.isToday ? "black" : "black"};
  cursor: pointer;
  border: 1px solid rgba(232, 232, 232, 0.74);
  position: relative;
`;

export const ShiftTag = styled.div`
  background-color: ${(props) => {
    if (props.color === "green") return "#e6f7e6";
    if (props.color === "yellow") return "#fff9e6";
    return "#e6f0ff";
  }};
  color: ${(props) => {
    if (props.color === "green") return "#2e8b57";
    if (props.color === "yellow") return "#b8860b";
    return "#0066cc";
  }};
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 14px;
  margin-top: 8px;
  display: inline-block;
`;

export const LeaveTag = styled.div`
  background-color: #e6f7e6;
  color: #2e8b57;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 14px;
  margin-top: 8px;
  display: inline-block;
`;

export const NavButton = styled.button`
  background: white;
  border: 1px solid #e8e8e8;
  padding: 8px 16px;
  margin: 0 8px;
  cursor: pointer;
  border-radius: 4px;
`;

export const NavigationBar = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

export const MonthYearDisplay = styled.div`
  display: flex;
  align-items: center;
`;
