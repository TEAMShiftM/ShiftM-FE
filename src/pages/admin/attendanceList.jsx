import { useState } from "react";
import styled from "styled-components";

// 출근 데이터
const leaveData = [
  {
    id: 1,
    name: "김사원",
    location: "서울시 성북구",
    time: "25.02.28 09:00",
    status: "대기",
  },
  {
    id: 2,
    name: "이대리",
    location: "서울시 성북구",
    time: "25.02.28 09:00",
    status: "승인",
  },
  {
    id: 3,
    name: "박팀장",
    location: "서울시 성북구",
    time: "25.02.28 09:00",
    status: "거절",
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

const SearchContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
  max-width: 1116px;
  margin: 0 auto 20px;
`;

const SearchInput = styled.input`
  width: 360px;
  height: 45px;
  border: 1px solid #0075ff;
  border-radius: 28px;
  padding: 8px 50px;
  font-size: 1rem;
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

// CheckVacation 컴포넌트
export default function AttendanceList() {
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7; // 한 페이지에 표시할 데이터 개수

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

  // 검색바 컴포넌트  
  const SearchBar = ({ onSearch }) => {
    const [query, setQuery] = useState("");

    const handleChange = () => {
      setQuery(e.target.value)
    };

    const handleSubmit = (e) => {
      e.preventDefault();
      onSearch(query);
    };

    return (
      <SearchContainer>
        <form onSubmit={handleSubmit} style={{ display: "flex" }}>
          <SearchInput
            type="text"
            value={query}
            onChange={handleChange}
            placeholder="직원 이름을 입력해주세요"
          />
        </form>
      </SearchContainer>
    );
  };

  return (
    <Container>
      <Header>출근 신청</Header>
      <SearchBar onSearch={(query) => console.log("검색:", query)} />
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead> </TableHead>
            <TableHead>이름</TableHead>
            <TableHead>출근 위치</TableHead>
            <TableHead>출근 시간</TableHead>
            <TableHead>상태</TableHead>
            <TableHead> </TableHead>
            <TableHead> </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {paginatedData.map((leave) => (
            <TableRow key={leave.id}>
              <TableCell>{leave.id}</TableCell>
              <TableCell>{leave.name}</TableCell>
              <TableCell>{leave.location}</TableCell>
              <TableCell>{leave.time}</TableCell>
              <TableCell>{leave.status}</TableCell>
              <TableCell>
                {leave.status === "대기" && (
                  <Button variant="link">승인</Button>
                )}
              </TableCell>
              <TableCell>
                {leave.status === "대기" && (
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