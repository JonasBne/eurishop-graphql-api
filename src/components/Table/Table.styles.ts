import styled from 'styled-components';
import { space, SpaceProps } from 'styled-system';

const StyledTable = styled.table<SpaceProps>`
  ${space}
  border-collapse: collapse;
  border-radius: 1rem;
  overflow: hidden;
  box-shadow: rgba(0, 0, 0, 0.3) 0px 19px 38px,
    rgba(0, 0, 0, 0.22) 0px 15px 12px;
`;

const TableHead = styled.th`
  background: ${({ theme }) => theme.colors.blues.primaryBlue};
  color: white;
  padding: 1rem;
  text-align: left;
`;

const TableRow = styled.tr`
  height: 3.5rem;
  color: #808080;
  line-height: 1.2;

  &:hover {
    cursor: pointer;
  }
`;

const TableData = styled.td`
  width: fit-content;
  padding: 1rem;
  margin: 1rem;
  text-align: left;
  background: ${({ theme }) => theme.colors.whites.primaryWhite};
`;

export {
  StyledTable, TableHead, TableRow, TableData,
};
