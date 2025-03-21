import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { AdminShiftAPI } from "../../api/admin/shift";
import {
  Container,
  Header,
  DateContainer,
  Name,
  Button,
  Card,
  WorkingTime,
  ScheduleContainer,
  Weekend,
  DayCard,
  ProgressBar,
  ProgressContainer,
  Card2,
  StatusBadge,
  DayCardContainer,
} from "../../styles/pages/main";

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

const NAVER_MAP_CLIENT_ID = "YOUR_CLIENT_ID"; // import.meta.env.VITE_NAVER_MAP_API_CLIENT_ID;

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

const AdminMain = () => {
  const navigate = useNavigate();
  const [todayShift, setTodayShift] = useState(null);
  const [weekShifts, setWeekShifts] = useState(Array(7).fill(null));
  const [isWorking, setIsWorking] = useState(false);
  const [memberId, setMemberId] = useState(1); // 임시 사용자 ID
  const [progress, setProgress] = useState(0);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [totalWorkHours, setTotalWorkHours] = useState(0);
  const [totalOvertimeHours, setTotalOvertimeHours] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Add new state variables for attendance counts
  const [checkinCount, setCheckinCount] = useState(0);
  const [checkoutCount, setCheckoutCount] = useState(0);
  const [lateCount, setLateCount] = useState(0);
  const [earlyLeaveCount, setEarlyLeaveCount] = useState(0);
  const [absentCount, setAbsentCount] = useState(0);

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
        setLatitude(latitude);
        setLongitude(longitude);

        if (window.naver && window.naver.maps) {
          const mapOptions = {
            center: new window.naver.maps.LatLng(latitude, longitude),
            zoom: 15,
          };
          const map = new window.naver.maps.Map("map", mapOptions);
          new window.naver.maps.Marker({
            position: new window.naver.maps.LatLng(latitude, longitude),
            map: map,
          });
        }
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

      // 근무 정보 갱신
      fetchShifts();
    } catch (error) {
      console.error("Error updating shift:", error);
    }
  };

  const fetchShifts = async () => {
    try {
      // ViewallShift API를 사용하여 출퇴근 기록 가져오기
      const shiftData = await AdminShiftAPI.ViewallShift(1, 100, "asc", "");

      // API 응답에서 출근/퇴근/지각/조퇴/결근 데이터 처리
      if (shiftData && shiftData.content) {
        // 오늘 날짜 생성
        const today = new Date();
        const todayStr = today.toISOString().split("T")[0];

        // 상태별 카운트 계산
        let checkIn = 0;
        let checkOut = 0;
        let late = 0;
        let earlyLeave = 0;
        let absent = 0;

        // 근무 기록 분석
        shiftData.content.forEach((shift) => {
          // 체크인 시간이 있으면 출근으로 카운트
          if (shift.checkinTime) {
            checkIn++;

            // 출근 시간이 9시 이후면 지각으로 카운트
            const checkinDate = new Date(shift.checkinTime);
            if (checkinDate.getHours() >= 9 && checkinDate.getMinutes() > 0) {
              late++;
            }
          }

          // 체크아웃 시간이 있으면 퇴근으로 카운트
          if (shift.checkoutTime) {
            checkOut++;

            // 퇴근 시간이 18시 이전이면 조퇴로 카운트
            const checkoutDate = new Date(shift.checkoutTime);
            if (checkoutDate.getHours() < 18) {
              earlyLeave++;
            }
          }

          // 상태가 PENDING이면 결근으로 카운트
          if (shift.status === "PENDING") {
            absent++;
          }
        });

        // 상태 업데이트
        setCheckinCount(checkIn);
        setCheckoutCount(checkOut);
        setLateCount(late);
        setEarlyLeaveCount(earlyLeave);
        setAbsentCount(absent);

        // 이번 주 근무 정보 설정 (API 데이터를 요일별로 매핑)
        const weekShiftsData = Array(7).fill(null);

        // 임의로 요일별 데이터 구성 (실제 데이터에 맞게 수정 필요)
        for (let i = 0; i < Math.min(shiftData.content.length, 7); i++) {
          const shift = shiftData.content[i];
          const shiftDate = new Date(shift.checkinTime);
          const dayIndex = shiftDate.getDay(); // 0: 일요일, 1: 월요일, ..., 6: 토요일

          // 체크인/체크아웃 시간 포맷팅
          const checkinHour = shiftDate.getHours().toString().padStart(2, "0");
          const checkinMin = shiftDate.getMinutes().toString().padStart(2, "0");

          const checkoutDate = shift.checkoutTime
            ? new Date(shift.checkoutTime)
            : null;
          const checkoutHour = checkoutDate
            ? checkoutDate.getHours().toString().padStart(2, "0")
            : "18";
          const checkoutMin = checkoutDate
            ? checkoutDate.getMinutes().toString().padStart(2, "0")
            : "00";

          weekShiftsData[dayIndex] = {
            ...shift,
            checkinTime: `${checkinHour}:${checkinMin}`,
            checkoutTime: `${checkoutHour}:${checkoutMin}`,
            status: shift.status,
          };
        }

        setWeekShifts(weekShiftsData);

        // 오늘 근무 정보 설정
        const todayShiftData = weekShiftsData[todayIndex] || {
          checkinTime: "09:00",
          checkoutTime: "18:00",
          status: "PENDING",
        };

        setTodayShift(todayShiftData);

        // 근무 중 상태 확인
        if (todayShiftData.status === "WORKING") {
          setIsWorking(true);
        }
      }
    } catch (error) {
      console.error("근무 일정 불러오기 실패:", error);
    }
  };

  useEffect(() => {
    fetchShifts();
  }, [memberId]);

  const handleExcelExport = async () => {
    try {
      const response = await AdminShiftAPI.Export();

      const blob = new Blob([response], { type: "application/vnd.ms-excel" });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = "근무기록.xlsx";

      link.click();
    } catch (error) {
      console.error("엑셀 파일 변환 실패", error);
    }
  };

  return (
    <Container>
      <Header>
        <DateContainer>{getTodayDate()}</DateContainer>
        <div>
          <Button onClick={handleExcelExport}>엑셀 파일 변환</Button>
        </div>
      </Header>

      <Card>
        <Name>오늘 근무 {isWorking && <StatusBadge>근무중</StatusBadge>}</Name>
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            marginTop: "46px",
          }}
        >
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: "28px" }}>출근 / 퇴근</div>
            <div
              style={{
                marginTop: "50px",
                fontSize: "38px",
                fontWeight: "bold",
              }}
            >
              {checkinCount} / {checkoutCount}
            </div>
          </div>
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: "28px" }}>지각 / 조퇴</div>
            <div
              style={{
                marginTop: "50px",
                fontSize: "38px",
                fontWeight: "bold",
              }}
            >
              {lateCount} / {earlyLeaveCount}
            </div>
          </div>
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: "28px" }}>결근</div>
            <div
              style={{
                marginTop: "50px",
                fontSize: "38px",
                fontWeight: "bold",
              }}
            >
              {absentCount}
            </div>
          </div>
        </div>
      </Card>
      <Card2>
        <Name>이번주 근무 평균</Name>
        <ScheduleContainer>
          <DayCardContainer>
            {["일", "월", "화", "수", "목", "금", "토"].map((day, index) => {
              const shift = weekShifts[index];
              return (
                <DayCard
                  key={day}
                  active={todayIndex === index}
                  isWeekend={index === 0 || index === 6}
                >
                  <Weekend>{day}</Weekend>
                  <WorkingTime>
                    {index === 0 || index === 6
                      ? "일정 없음"
                      : shift && shift.checkinTime && shift.checkoutTime
                      ? `${shift.checkinTime} - ${shift.checkoutTime}`
                      : "09:00 18:00"}
                  </WorkingTime>
                </DayCard>
              );
            })}
          </DayCardContainer>

          <ProgressContainer>
            <ProgressBar progress={progress} />
          </ProgressContainer>
        </ScheduleContainer>
      </Card2>
    </Container>
  );
};

export default AdminMain;
