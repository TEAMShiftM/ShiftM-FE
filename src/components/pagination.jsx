import React from "react";
import styled from "styled-components";

// Styled Components for Pagination
const PaginationContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
`;

const PaginationButton = styled.button`
  background-color: ${(props) => (props.active ? "#0075ff" : "transparent")};
  color: ${(props) => (props.active ? "white" : "#0075ff")};
  padding: 8px 16px;
  border: 1px solid #0075ff;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.875rem;

  &:hover {
    background-color: ${(props) => (props.active ? "#005bb5" : "#e5f1ff")};
  }
`;

export const Pagination = ({ totalPages, currentPage, onPageChange }) => {
  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);

  return (
    <PaginationContainer>
      <PaginationButton
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        이전
      </PaginationButton>
      {pages.map((page) => (
        <PaginationButton
          key={page}
          active={page === currentPage}
          onClick={() => onPageChange(page)}
        >
          {page}
        </PaginationButton>
      ))}
      <PaginationButton
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        다음
      </PaginationButton>
    </PaginationContainer>
  );
};

export default Pagination;
