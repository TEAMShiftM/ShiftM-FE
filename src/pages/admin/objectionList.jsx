import { useState } from "react";
import styled from "styled-components";

// 출근 데이터
const leaveData = [
  {
    id: 1,
    name: "김사원",
    date: "[출근 기록] 25년 2월 1일",
    content: "[생성] 09:00",
    status: "처리",
  },
  {
    id: 2,
    name: "이대리",
    date: "[퇴근 기록] 25년 2월 2일",
    content: "[수정] 18:00",
    status: "거절",
  },
  {
    id: 3,
    name: "박팀장",
    date: "[출근 기록] 25년 2월 3일",
    content: "[생성] 09:00",
    status: "신청",
  },
];

// Styled Components
const Container = styled.div`
  background-color: #f0f8ff;
  width: 100vw;
  height: 100vw;
  padding-top: 100px;
`;

const Header = styled.h2`
  font-size: 30px;
  font-weight: 600;
  margin-left: 162px;
  margin-bottom: 31px;
  margin-top: 50px;
  color: #4a4a4a;
`;

const Table = styled.table`
  width: 1116px;
  background-color: white;
  overflow: hidden;
  margin-left: 162px;
  border: none;
`;

const TableHeader = styled.thead`
  background-color: rgba(0, 117, 255, 0.25);
  color: black;
`;

const TableRow = styled.tr`
  border-bottom: 1px solidrgba(241, 241, 241, 0.34);
  height: 65px;
`;

const TableHead = styled.th`
  padding: 12px;
  text-align: left;
  font-weight: 600;
  font-size: 0.875rem;
  text-align: center;
  border: none;
`;

const TableBody = styled.tbody``;

const TableCell = styled.td`
  padding: 12px;
  font-size: 0.875rem;
  color: #595959;
  text-align: center;
  border: none;
`;

const Button = styled.button`
  background-color: ${(props) =>
    props.variant === "link" ? "transparent" : "#0075ff"};
  color: ${(props) => (props.variant === "link" ? "#0075ff" : "white")};
  font-size: 0.875rem;
  border: ${(props) =>
    props.variant === "link" ? "none" : "1px solid #0075ff"};
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: ${(props) =>
      props.variant === "link" ? "transparent" : "#005bb5"};
  }
`;

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  margin-top: 20px;
`;

const PageButton = styled.button`
  background: none;
  border: none;
  color: ${({ disabled }) => (disabled ? "#ccc" : "#111111")};
  font-size: 16px;
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
`;

const PageNumber = styled.button`
  background: ${({ active }) => (active ? "white" : "transparent")};
  color: ${({ active }) => (active ? "black" : "black")};
  border: ${({ active }) => (active ? "1px solid black" : "none")};
  border-radius: 4px;
  padding: ${({ active }) => (active ? "6px 12px" : "0")};
  font-size: 16px;
  font-weight: ${({ active }) => (active ? "bold" : "normal")};
  cursor: pointer;

  &:hover {
    background: ${({ active }) => (active ? "white" : "#e6e6e6")};
  }
`;

const FilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
`;

const FilterLabel = styled.span`
  font-size: 20px;
  color: #595959;
  margin-bottom: 6px;
  margin-left: 162px;
`;

const CheckboxContainer = styled.div`
  display: flex;
  margin-right: 162px;
`;

const Checkbox = styled.input`
  accent-color: #0075ff;
  margin-right: 8px;
  width: 20px;
  height: 20px;
`;

const Label = styled.div`
  margin-right: 16px;
  font-size: 20px;
`;

// CheckVacation 컴포넌트
export default function AObjectionList() {
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7; // 한 페이지에 표시할 데이터 개수

  const handleFilterChange = (status) => {
    setSelectedFilters((prevFilters) =>
      prevFilters.includes(status)
        ? prevFilters.filter((filter) => filter !== status)
        : [...prevFilters, status]
    );
  };

  const filteredLeaveData = leaveData.filter((leave) =>
    selectedFilters.length ? selectedFilters.includes(leave.status) : true
  );

  const paginatedData = filteredLeaveData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(filteredLeaveData.length / itemsPerPage);

  const Pagination = ({ totalPages, currentPage, onPageChange }) => {
    const handlePageClick = (pageNumber) => {
      if (pageNumber >= 1 && pageNumber <= totalPages) {
        onPageChange(pageNumber);
      }
    };

    return (
      <div>
        <Button
          variant="link"
          onClick={() => handlePageClick(currentPage - 1)}
          disabled={currentPage === 1}
        >
          이전
        </Button>
        <span>
          {currentPage} / {totalPages}
        </span>
        <Button
          variant="link"
          onClick={() => handlePageClick(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          다음
        </Button>
      </div>
    );
  };

  return (
    <Container>
      <Header>이의 신청 내역</Header>
      <FilterContainer>
        <FilterLabel>2025.02.01 - 2025.02.28</FilterLabel>
        <CheckboxContainer>
          {["신청", "처리", "거절"].map((filter) => (
            <Label key={filter}>
              <Checkbox
                type="checkbox"
                checked={selectedFilters.includes(filter)}
                onChange={() => handleFilterChange(filter)}
              />
              {filter}
            </Label>
          ))}
        </CheckboxContainer>
      </FilterContainer>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead> </TableHead>
            <TableHead>신청자</TableHead>
            <TableHead>이의 신청 대상</TableHead>
            <TableHead>이의 신청 내용</TableHead>
            <TableHead>처리 여부</TableHead>
            <TableHead> </TableHead>
            <TableHead> </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {paginatedData.map((leave) => (
            <TableRow key={leave.id}>
              <TableCell>{leave.id}</TableCell>
              <TableCell>{leave.name}</TableCell>
              <TableCell>{leave.date}</TableCell>
              <TableCell>{leave.content}</TableCell>
              <TableCell>{leave.status}</TableCell>
              <TableCell>
                {leave.status === "신청" && (
                  <Button variant="link">처리</Button>
                )}
              </TableCell>
              <TableCell>
                {leave.status === "신청" && (
                  <Button variant="link">거절</Button>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <PaginationContainer>
        <PageButton
          disabled={currentPage === 1}
          onClick={() => handlePageClick(currentPage - 1)}
        >
          ← Previous
        </PageButton>

        {[...Array(totalPages)].map((_, index) => {
          const pageNumber = index + 1;
          return (
            <PageNumber
              key={pageNumber}
              active={pageNumber === currentPage}
              onClick={() => handlePageClick(pageNumber)}
            >
              {pageNumber}
            </PageNumber>
          );
        })}

        <PageButton
          disabled={currentPage === totalPages}
          onClick={() => handlePageClick(currentPage + 1)}
        >
          Next →
        </PageButton>
      </PaginationContainer>
    </Container>
  );
}