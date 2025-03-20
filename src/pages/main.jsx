import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import {
  Container,
  Header,
  DateContainer,
  Name,
  Bar,
  TimeBox,
  Button,
  Card,
  WorkingTime,
  WorkButton,
  ModalOverlay,
  ModalContent,
  ModalButton,
  Map,
  ScheduleContainer,
  Weekend,
  DayCard,
  ProgressBar,
  ProgressContainer,
  Card2,
  StatusBadge,
  DayCardContainer,
} from "../styles/pages/main";
import { ShiftAPI } from "../api/user/shift";

const getTodayDate = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth() + 1;
  const date = today.getDate();
  const dayNames = ["일", "월", "화", "수", "목", "금", "토"];
  const day = dayNames[today.getDay()];
  return `${year}년 ${month}월 ${date}일 ${day}요일`;
};

const todayIndex = new Date().getDay();

const NAVER_MAP_CLIENT_ID = import.meta.env.VITE_NAVER_MAP_API_CLIENT_ID;

const loadNaverMap = () => {
  return new Promise((resolve) => {
    if (!window.naver) {
      const script = document.createElement("script");
      script.type = "text/javascript";
      script.src = `https://oapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${NAVER_MAP_CLIENT_ID}`;
      script.async = true;
      script.onload = () => resolve();
      document.body.appendChild(script);
    } else {
      resolve();
    }
  });
};

const getWeekDates = () => {
  const today = new Date();
  const dayOfWeek = today.getDay(); // 현재 요일 (0: 일요일, 1: 월요일, ..., 6: 토요일)

  const startDate = new Date(today);
  startDate.setDate(today.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1)); // 이번 주 월요일

  const endDate = new Date(startDate);
  endDate.setDate(startDate.getDate() + 6); // 이번 주 일요일

  const formatDate = (date) => {
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
      2,
      "0"
    )}-${String(date.getDate()).padStart(2, "0")}`;
  };

  return {
    startDate: formatDate(startDate),
    endDate: formatDate(endDate),
  };
};

const Main = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [todayShift, setTodayShift] = useState(null);
  const [weekShifts, setWeekShifts] = useState([]);
  const [isWorking, setIsWorking] = useState(false);
  const [memberId, setMemberId] = useState(null);

  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!todayShift || !todayShift.checkinTime || !todayShift.checkoutTime) {
      return;
    }

    const updateProgress = () => {
      const now = new Date();
      const [checkinHour, checkinMin] = todayShift.checkinTime
        .split(":")
        .map(Number);
      const [checkoutHour, checkoutMin] = todayShift.checkoutTime
        .split(":")
        .map(Number);

      const checkinTime = new Date();
      checkinTime.setHours(checkinHour, checkinMin, 0);

      const checkoutTime = new Date();
      checkoutTime.setHours(checkoutHour, checkoutMin, 0);

      const totalDuration = checkoutTime - checkinTime;
      const elapsedTime = now - checkinTime;

      const progressPercent = Math.max(
        0,
        Math.min(100, (elapsedTime / totalDuration) * 100)
      );
      setProgress(progressPercent);
    };

    updateProgress();
    const interval = setInterval(updateProgress, 1000); // 1초마다 업데이트

    return () => clearInterval(interval);
  }, [todayShift]);

  const handleMapClick = async () => {
    await loadNaverMap();
    setIsModalOpen(true);

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        const mapOptions = {
          center: new window.naver.maps.LatLng(latitude, longitude),
          zoom: 15,
        };
        const map = new window.naver.maps.Map("map", mapOptions);
        new window.naver.maps.Marker({
          position: new window.naver.maps.LatLng(latitude, longitude),
          map: map,
        });
      });
    }
  };

  const handleWorkButtonClick = async () => {
    try {
      if (isWorking) {
        await ShiftAPI.CheckOut();
        setIsWorking(false);
      } else {
        if (latitude && longitude) {
          await ShiftAPI.CheckIn(latitude, longitude);
          setIsWorking(true);
        } else {
          alert("위치 정보를 가져올 수 없습니다. 다시 시도해주세요.");
        }
      }
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error updating shift:", error);
    }
  };

  useEffect(() => {
    if (isModalOpen && window.naver) {
      const mapOptions = {
        center: new window.naver.maps.LatLng(37.5665, 126.978), // 서울 좌표
        zoom: 15,
      };
      new window.naver.maps.Map("map", mapOptions);
    }
  }, [isModalOpen]);

  useEffect(() => {
    const fetchShifts = async () => {
      try {
        const todayDate = getTodayDate();
        const { startDate, endDate } = getWeekDates();

        // 오늘 근무 일정 가져오기
        const todayData = await ShiftAPI.Shifts(memberId, todayDate, todayDate);
        setTodayShift(todayData.shifts[0]); // 오늘의 근무 정보가 첫 번째로 있다고 가정

        // 이번 주 근무 일정 가져오기
        const weekData = await ShiftAPI.Shifts(memberId, startDate, endDate);
        setWeekShifts(weekData.shifts);
      } catch (error) {
        console.error("근무 일정 불러오기 실패:", error);
      }
    };

    fetchShifts();
  }, []);

  return (
    <Container>
      <Header>
        <DateContainer>{getTodayDate()}</DateContainer>
        <div>
          <Button onClick={() => navigate("/check-vaction")}>
            휴가 내역 확인
          </Button>
          <Button primary onClick={() => navigate("/request-vaction")}>
            휴가 신청
          </Button>
        </div>
      </Header>

      <Card>
        <Name>오늘 근무 {isWorking && <StatusBadge>근무중</StatusBadge>}</Name>

        <TimeBox>
          <Bar>|</Bar>
          {todayShift ? (
            <div>
              {todayShift.checkinTime} - {todayShift.checkoutTime} |{" "}
              {todayShift.location}
            </div>
          ) : (
            <div>근무 일정 없음</div>
          )}
        </TimeBox>
        <WorkButton onClick={handleMapClick}>
          {isWorking ? "퇴근" : "출근"}
        </WorkButton>
      </Card>

      {isModalOpen && (
        <ModalOverlay>
          <ModalContent>
            <Map id="map"></Map>
            <ModalButton onClick={handleWorkButtonClick}>
              {isWorking ? "퇴근" : "출근"}
            </ModalButton>
          </ModalContent>
        </ModalOverlay>
      )}

      <Card2>
        <Name>이번주 근무</Name>
        <ScheduleContainer>
          <DayCardContainer>
            {["일", "월", "화", "수", "목", "금", "토"].map((day, index) => (
              <DayCard
                key={day}
                active={todayIndex === index}
                isWeekend={index === 0 || index === 6}
              >
                <Weekend>{day}</Weekend>
                <WorkingTime>
                  {index === 0 || index === 6
                    ? "일정 없음"
                    : todayShift &&
                      todayShift.checkinTime &&
                      todayShift.checkoutTime
                    ? `${todayShift.checkinTime} - ${todayShift.checkoutTime}`
                    : "일정 없음"}{" "}
                </WorkingTime>
              </DayCard>
            ))}
          </DayCardContainer>

          {todayShift && todayShift.checkinTime && todayShift.checkoutTime && (
            <ProgressContainer>
              <ProgressBar progress={progress} />
            </ProgressContainer>
          )}
        </ScheduleContainer>
      </Card2>
    </Container>
  );
};

export default Main;
