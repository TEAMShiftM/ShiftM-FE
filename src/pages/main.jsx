import React from "react";
import { useNavigate } from "react-router-dom";
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

const Date = styled.div`
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
  width: 130px;
  align-items: center;
  justify-content: center;
  display: flex;
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
  background: rgba(0, 117, 255, 0.1);
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

const Main = () => {
  const navigate = useNavigate();
  return (
    <Container>
      <Header>
        <Date>2025년 2월 3일 월요일</Date>
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
        <WorkButton>출근</WorkButton>
      </Card>

      <Card>
        <Name>이번주 근무</Name>
        <ScheduleContainer>
          <DayCardContainer>
            <DayCard>
              <Weekend>일</Weekend>
              <WorkingTime>
                일정<br></br>없음
              </WorkingTime>
            </DayCard>
            <DayCard active>
              <Weekend>일</Weekend>
              <WorkingTime>
                09:00
                <br />
                18:00
              </WorkingTime>
            </DayCard>
            <DayCard>
              <Weekend>일</Weekend>
              <WorkingTime>
                09:00 <br />
                18:00
              </WorkingTime>
            </DayCard>
            <DayCard>
              <Weekend>일</Weekend>
              <WorkingTime>
                09:00 <br />
                18:00
              </WorkingTime>
            </DayCard>
            <DayCard>
              <Weekend>일</Weekend>
              <WorkingTime>
                09:00
                <br />
                18:00
              </WorkingTime>
            </DayCard>
            <DayCard>
              <Weekend>일</Weekend>
              <WorkingTime>
                09:00
                <br /> 18:00
              </WorkingTime>
            </DayCard>
            <DayCard>
              <Weekend>일</Weekend>
              <WorkingTime>
                일정
                <br />
                없음
              </WorkingTime>
            </DayCard>
          </DayCardContainer>
          <LongBar />
        </ScheduleContainer>
      </Card>
    </Container>
  );
};

export default Main;
