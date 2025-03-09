import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import styled from "styled-components";

const Container = styled.div`
  background-color: #f7faff;
  width: 100%;
  height: 100%;
  padding: 20px;
  align-items: center;
  justify-content: center;
  padding-top: 100px;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 18px;
  margin-left: 160px;
  margin-right: 130px;
  width: 1116px;
`;

const DateContainer = styled.div`
  color: black;
  font-size: 24px;
`;

const Name = styled.div`
  color: black;
  font-size: 30px;
  margin-top: 40px;
  margin-left: 71px;
`;

const Bar = styled.div`
  color: black;
  font-size: 30px;
  margin-left: 71px;
`;

const Time = styled.div`
  color: black;
  font-size: 20x;
  margin-left: 24px;
`;

const TimeBox = styled.div`
  color: black;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-top: 15px;
`;

const Button = styled.button`
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
`;

const Card = styled.div`
  background: white;
  border-radius: 10px;
  padding: 20px;
  margin: 20px 0;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  width: 1120px;
  height: 300px;
  margin-left: 162px;
`;

const WorkingTime = styled.div`
  width: 66px;
  align-items: center;
  justify-content: center;
  display: flex;
  color: black;
`;

const WorkButton = styled.button`
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
`;

const ModalOverlay = styled.div`
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

const ModalContent = styled.div`
  width: 784px;
  height: 600px;
  background: #f3f9ff;
  border-radius: 20px;
  position: relative;
  display: flex;
  flex-direction: column;
  align-itmes: center;
`;

const ModalButton = styled.button`
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

const Map = styled.div`
  width: 735px;
  height: 445px;
  border-radius: 20px;
  margin-top: 45px;
  margin-left: 23px;
`;

const ScheduleContainer = styled.div`
  display: flex;
  flex-direction: column; /* 세로 정렬 */
  align-items: center;
  height: auto;
`;

const Weekend = styled.div`
  margin-top: 10px;
  margin-bottom: 20px;
`;

const DayCard = styled.div`
  flex: 1;
  width: 130px;
  height: 130px;
  background: ${(props) =>
    props.active ? "rgba(0, 117, 255, 0.3)" : "rgba(0, 117, 255, 0.1)"};
  border-radius: 20px;
  font-size: 24px;
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

const LongBar = styled.div`
  width: 924px;
  height: 24px;
  background: rgba(0, 117, 255, 0.1);
  margin: 20px auto 0;
`;

const DayCardContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

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

const Main = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleWorkButtonClick = async () => {
    await loadNaverMap();
    setIsModalOpen(true);
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
        <Name>오늘 근무</Name>
        <TimeBox>
          <Bar>|</Bar>
          <Time>9:00 - 18:00 | 본사</Time>
        </TimeBox>
        <WorkButton onClick={handleWorkButtonClick}>출근</WorkButton>
      </Card>

      {isModalOpen && (
        <ModalOverlay>
          <ModalContent>
            <Map id="map"></Map>
            <ModalButton onClick={() => setIsModalOpen(false)}>
              출근
            </ModalButton>
          </ModalContent>
        </ModalOverlay>
      )}

      <Card>
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
                  {index === 0 || index === 6 ? "일정 없음" : "09:00 18:00"}
                </WorkingTime>
              </DayCard>
            ))}
          </DayCardContainer>
          <LongBar />
        </ScheduleContainer>
      </Card>
    </Container>
  );
};

export default Main;
