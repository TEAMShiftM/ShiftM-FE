import styled from "styled-components";
// Styled Components
export const Container = styled.div`
  background-color: #f0f8ff;
  width: 100vw;
  height: 100vw;
  padding-top: 100px;
`;
export const Header = styled.h2`
  font-size: 30px;
  font-weight: 600;
  text-align: center;
  margin-bottom: 31px;
  margin-top: 50px;
  color: #4a4a4a;
`;
export const FilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
`;
export const FilterLabel = styled.span`
  font-size: 20px;
  color: #595959;
  margin-bottom: 6px;
  margin-left: 162px;
`;
export const Table = styled.table`
  width: 1116px;
  background-color: white;
  overflow: hidden;
  margin-left: 162px;
  border: none;
`;
export const TableHeader = styled.thead`
  background-color: rgba(0, 117, 255, 0.25);
  color: black;
`;
export const TableRow = styled.tr`
  border-bottom: 1px solidrgba(241, 241, 241, 0.34);
  height: 65px;
`;
export const TableHead = styled.th`
  padding: 12px;
  text-align: left;
  font-weight: 600;
  font-size: 0.875rem;
  text-align: center;
  border: none;
`;
export const TableBody = styled.tbody``;
export const TableCell = styled.td`
  padding: 12px;
  font-size: 0.875rem;
  color: #595959;
  text-align: center;
  border: none;
`;
export const Button = styled.button`
  background-color: ${(props) =>
    props.variant === "link" ? "transparent" : "#0075ff"};
  color: ${(props) => (props.variant === "link" ? "#ff0000" : "white")};
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
export const CheckboxContainer = styled.div`
  display: flex;
  margin-right: 162px;
`;
export const Checkbox = styled.input`
  accent-color: #0075ff;
  margin-right: 8px;
  width: 20px;
  height: 20px;
`;
export const Label = styled.div`
  margin-right: 16px;
  font-size: 20px;
`;
export const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  margin-top: 20px;
`;
export const PageButton = styled.button`
  background: none;
  border: none;
  color: ${({ disabled }) => (disabled ? "#ccc" : "#111111")};
  font-size: 16px;
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
`;
export const PageNumber = styled.button`
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
