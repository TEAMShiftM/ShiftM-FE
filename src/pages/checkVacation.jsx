import { useState } from "react";
import {
  PageNumber,
  PageButton,
  PaginationContainer,
  Label,
  Checkbox,
  CheckboxContainer,
  Button,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableHeader,
  Table,
  FilterContainer,
  FilterLabel,
  Header,
  Container,
} from "../styles/pages/checkVacation";

// 휴가 데이터
const leaveData = [
  {
    id: 1,
    type: "연차 휴가",
    period: "2025/02/01 - 2025/02/01",
    days: 1,
    status: "승인",
  },
  {
    id: 2,
    type: "출산 휴가",
    period: "2025/02/01 - 2025/02/01",
    days: 1,
    status: "거절",
  },
  {
    id: 3,
    type: "배우자 출산 휴가",
    period: "2025/02/01 - 2025/02/01",
    days: 1,
    status: "신청",
  },
];

// CheckVacation 컴포넌트
export default function CheckVacation() {
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
      <Header>휴가 신청 내역</Header>
      <FilterContainer>
        <FilterLabel>2025.02.01 - 2025.02.28</FilterLabel>
        <CheckboxContainer>
          {["신청", "승인", "거절", "취소"].map((filter) => (
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
            <TableHead>연차 유형</TableHead>
            <TableHead>연차 기간</TableHead>
            <TableHead>연차 일수</TableHead>
            <TableHead>승인 여부</TableHead>
            <TableHead> </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {paginatedData.map((leave) => (
            <TableRow key={leave.id}>
              <TableCell>{leave.id}</TableCell>
              <TableCell>{leave.type}</TableCell>
              <TableCell>{leave.period}</TableCell>
              <TableCell>{leave.days}</TableCell>
              <TableCell>{leave.status}</TableCell>
              <TableCell>
                {leave.status === "신청" && (
                  <Button variant="link">취소</Button>
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
