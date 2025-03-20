import React, { useState, useEffect } from "react";
import {
  Container,
  Card,
  Title,
  CalendarGrid,
  DayName,
  DateBox,
  ShiftTag,
  LeaveTag,
  NavButton,
  NavigationBar,
  MonthYearDisplay,
} from "../styles/pages/viewShift";
import { ShiftAPI } from "../api/user/shift";
import { LeaveAPI } from "../api/user/leave";

const ViewShift = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [shifts, setShifts] = useState([]);
  const [leaves, setLeaves] = useState([]);
  const [memberId, setMemberId] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showMonthSelector, setShowMonthSelector] = useState(false);

  useEffect(() => {
    const storedMemberId =
      localStorage.getItem("memberId") || sessionStorage.getItem("memberId");
    if (storedMemberId) {
      setMemberId(storedMemberId);
      setIsLoggedIn(true);
    }
  }, []);

  useEffect(() => {
    if (isLoggedIn && memberId) {
      fetchShiftsAndLeaves();
    }
  }, [memberId, currentDate, isLoggedIn]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showMonthSelector && !event.target.closest(".month-selector-area")) {
        setShowMonthSelector(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showMonthSelector]);

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

  const handlePrevYear = () => {
    setCurrentDate(new Date(year - 1, month));
  };

  const handleNextYear = () => {
    setCurrentDate(new Date(year + 1, month));
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

  const fetchShiftsAndLeaves = async () => {
    if (!memberId) return;

    try {
      const firstDay = new Date(year, month, 1);
      const lastDay = new Date(year, month + 1, 0);

      const startDate = firstDay.toISOString().split("T")[0];
      const endDate = lastDay.toISOString().split("T")[0];

      const shiftsResponse = await ShiftAPI.Shifts(
        memberId,
        startDate,
        endDate
      );
      setShifts(shiftsResponse.shifts || []);

      const leavesResponse = await LeaveAPI.leave(memberId, 0, 100);
      setLeaves(leavesResponse.content || []);
    } catch (error) {
      console.error("Failed to fetch data:", error);
    }
  };

  const getShiftForDay = (day) => {
    if (!isLoggedIn || !shifts || shifts.length === 0) return null;

    const date = new Date(year, month, day).toISOString().split("T")[0];
    return shifts.find((shift) => {
      const shiftDate = shift.checkinTime.split("T")[0];
      return shiftDate === date;
    });
  };

  const isLeaveDay = (day) => {
    if (!isLoggedIn || !leaves || leaves.length === 0) return false;

    const date = new Date(year, month, day).toISOString().split("T")[0];
    return leaves.some((leave) => {
      const leaveDate = leave.date?.split("T")[0];
      return leaveDate === date;
    });
  };

  const toggleMonthSelector = () => {
    setShowMonthSelector(!showMonthSelector);
  };

  const DateBoxWrapper = ({
    day,
    isInactive,
    isToday,
    shiftForDay,
    isLeave,
  }) => {
    return (
      <DateBox isInactive={isInactive} isToday={isToday}>
        {day}
        {isLeave && <LeaveTag>Annual Leave</LeaveTag>}
        {shiftForDay && !isLeave && (
          <ShiftTag color={shiftForDay.type === "late" ? "yellow" : "blue"}>
            {shiftForDay.checkinTime?.split("T")[1]?.slice(0, 5)} -{" "}
            {shiftForDay.checkoutTime?.split("T")[1]?.slice(0, 5)}
          </ShiftTag>
        )}
      </DateBox>
    );
  };

  return (
    <Container>
      <Card>
        <NavigationBar>
          <div className="month-selector-area">
            <Title onClick={toggleMonthSelector}>
              <MonthYearDisplay>
                {`${monthNames[month]}, ${year}`}
                <NavButton onClick={handlePrevMonth}>◀</NavButton>
                <NavButton onClick={handleNextMonth}>▶</NavButton>
              </MonthYearDisplay>
            </Title>
          </div>
        </NavigationBar>

        <CalendarGrid>
          {daysOfWeek.map((day) => (
            <DayName key={day}>{day}</DayName>
          ))}
          {Array.from({ length: 42 }, (_, index) => {
            const day = getDayOfMonth(index);
            const isInactive =
              index < previousMonthDays ||
              index >= previousMonthDays + totalDaysInMonth;
            const isToday =
              day === new Date().getDate() &&
              month === new Date().getMonth() &&
              year === new Date().getFullYear();

            const shiftForDay = !isInactive ? getShiftForDay(day) : null;
            const isLeave = !isInactive && isLeaveDay(day);

            return (
              <DateBoxWrapper
                key={index}
                day={day}
                isInactive={isInactive}
                isToday={isToday}
                shiftForDay={shiftForDay}
                isLeave={isLeave}
              />
            );
          })}
        </CalendarGrid>
      </Card>
    </Container>
  );
};

export default ViewShift;
