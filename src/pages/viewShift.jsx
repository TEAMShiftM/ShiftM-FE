import React, { useState } from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #eff6ff;
  padding-top: 100px;
`;

const Card = styled.div`
  width: 1295px;
  height: 1067px;
  justify-content: center;
  align-items: center;
  margin-bottom: 50px;
`;

const Title = styled.div`
  font-size: 24px;
  font-weight: 600;
  text-align: left;
  margin-bottom: 32px;
  margin-top: 45px;
`;

const CalendarGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  margin-top: 20px;
`;

const DayName = styled.div`
  text-align: flex-start;
  font-size: 16px;
  color: #969696;
  background-color: white;
  height: 42px;
  width: 185px;
  border: 1px solid rgba(232, 232, 232, 0.74);
`;

const DateBox = styled.div`
  text-align: flex-start;
  width: 185px;
  height: 192.6px;
  font-size: 21px;
  background-color: ${(props) =>
    props.isInactive ? "#e8e8e8" : props.isToday ? "white" : "white"};
  color: ${(props) =>
    props.isInactive ? "#7f7f7f" : props.isToday ? "black" : "black"};
  cursor: pointer;
  border: 1px solid rgba(232, 232, 232, 0.74);
`;

const ViewShift = () => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const getMonthDetails = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();

    const firstDay = new Date(year, month, 1);
    const firstDayIndex = firstDay.getDay(); // 0 = Sunday, 1 = Monday

    const lastDay = new Date(year, month + 1, 0);
    const totalDaysInMonth = lastDay.getDate();

    const previousMonth = new Date(year, month, 0);
    const previousMonthLastDay = previousMonth.getDate();
    const previousMonthDays = firstDayIndex === 0 ? 6 : firstDayIndex - 1;

    const nextMonthDays = 7 - ((totalDaysInMonth + previousMonthDays) % 7);

    return {
      firstDayIndex,
      totalDaysInMonth,
      previousMonthDays,
      nextMonthDays,
      year,
      month,
      previousMonthLastDay,
    };
  };

  const {
    year,
    month,
    totalDaysInMonth,
    firstDayIndex,
    previousMonthDays,
    nextMonthDays,
    previousMonthLastDay,
  } = getMonthDetails(currentDate);

  const getDayOfMonth = (index) => {
    if (index < previousMonthDays) {
      return previousMonthLastDay - previousMonthDays + index + 1;
    }
    if (index >= previousMonthDays + totalDaysInMonth) {
      return index - (previousMonthDays + totalDaysInMonth) + 1;
    }
    return index - previousMonthDays + 1;
  };

  const handlePrevMonth = () => {
    setCurrentDate(new Date(year, month - 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(year, month + 1));
  };

  const daysOfWeek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  return (
    <Container>
      <Card>
        <Title>{`${monthNames[month]}, ${year}`}</Title>
        <CalendarGrid>
          {daysOfWeek.map((day) => (
            <DayName key={day}>{day}</DayName>
          ))}
          {Array.from({ length: 42 }, (_, index) => (
            <DateBox
              key={index}
              isInactive={
                index < previousMonthDays ||
                index >= previousMonthDays + totalDaysInMonth
              }
              isToday={getDayOfMonth(index) === currentDate.getDate()}
            >
              {getDayOfMonth(index)}
            </DateBox>
          ))}
        </CalendarGrid>
      </Card>
    </Container>
  );
};

export default ViewShift;
