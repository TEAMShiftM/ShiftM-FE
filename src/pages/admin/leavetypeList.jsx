import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { LeaveTypeAPI } from "../../api/admin/leave-type";

const initialLeaveData = [
  { id: 1, name: "연차 휴가" },
  { id: 2, name: "출산 휴가" },
  { id: 3, name: "특별 휴가" },
];

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

export default function LeaveTypeList() {
  const [leaveData, setLeaveData] = useState(initialLeaveData);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLeaveTypes = async () => {
      const res = await LeaveTypeAPI.leaveTypes();
      if (res.typeList) {
        setLeaveData((prev) => [...prev, ...res.typeList.filter(newItem => !prev.some(prevItem => prevItem.id === newItem.id))]);
      }
    };
    fetchLeaveTypes();
  }, []);

  const handleDelete = async (id) => {
    const confirmed = window.confirm("정말 삭제하시겠습니까?");
    if (!confirmed) return;

    const res = await LeaveTypeAPI.deleteType(id);
    if (res.isSuccess === false) {
      alert(res.message);
    } else {
      alert("삭제되었습니다.");
      setLeaveData((prev) => prev.filter((item) => item.id !== id));
    }
  };

  const filteredLeaveData = leaveData;
  const paginatedData = filteredLeaveData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  const totalPages = Math.ceil(filteredLeaveData.length / itemsPerPage);

  const handlePageClick = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  const SearchBar = ({ onSearch }) => {
    const [query, setQuery] = useState("");
    const handleChange = (e) => setQuery(e.target.value);
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
      <Header>연차 유형 관리</Header>
      <SearchBar onSearch={(query) => console.log("검색:", query)} />
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead> </TableHead>
            <TableHead>이름</TableHead>
            <TableHead> </TableHead>
            <TableHead> </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {paginatedData.map((leave) => (
            <TableRow key={leave.id}>
              <TableCell>{leave.id}</TableCell>
              <TableCell>{leave.name}</TableCell>
              <TableCell>
                {leave.name !== "연차 휴가" && leave.name !== "출산 휴가" && (
                  <Button variant="link" onClick={() => navigate(`/edit-leave-type/${leave.id}`)}>
                    수정
                  </Button>
                )}
              </TableCell>
              <TableCell>
                {leave.name !== "연차 휴가" && leave.name !== "출산 휴가" && (
                  <Button variant="link" onClick={() => handleDelete(leave.id)}>
                    삭제
                  </Button>
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
