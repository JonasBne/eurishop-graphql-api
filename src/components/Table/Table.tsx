/* eslint-disable jsx-a11y/aria-role */
/* eslint-disable react/no-array-index-key */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/require-default-props */
import React from 'react';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { SpaceProps } from 'styled-system';
import FaIcon from '../../assets/FaIcon';
import SortableTableHead from './SortableTableHead';
import { StyledTable, TableRow, TableData } from './Table.styles';
import FlexBox from '../FlexBox';
import Button from '../Button';

interface Column {
  name: string;
  label: string;
  sortable: boolean;
  id: string;
}

interface TableProps extends SpaceProps {
  data: any[];
  onRowClick?: (productId: string) => void;
  onActionClick?: (productId: string) => void;
  onLoadData: () => void;
  sortExpression: string;
  setSortExpression: (prevSortExp: any) => void;
  columns: Column[];
}

function Table({
  data,
  columns,
  sortExpression,
  setSortExpression,
  onRowClick,
  onActionClick,
  onLoadData,
  ...space
}: TableProps) {
  return (
    <>
      <StyledTable {...space} role="table">
        <thead>
          <TableRow role="row">
            {columns.map((col, index) => (
              <SortableTableHead
                title={col.label}
                index={index}
                name={col.name}
                sortable={col.sortable}
                sortExpression={sortExpression}
                setSortExpression={setSortExpression}
                key={col.id}
              />
            ))}
          </TableRow>
        </thead>
        <tbody role="tablebody">
          {data.map((item: any, dataIndex) => (
            <TableRow key={item.id} role="row">
              {Object.keys(data[0]).map((title: any, index) => (
                <TableData
                  role="cell"
                  key={`item${index}${dataIndex}`}
                  onClick={() => {
                    if (onRowClick !== undefined) {
                      onRowClick(item.id);
                    }
                  }}
                >
                  {item[title]}
                </TableData>
              ))}
              <TableData role="cell">
                <FaIcon
                  role="img"
                  aria-label="trash-bin"
                  icon={faTrash}
                  px="0.25rem"
                  color="red"
                  mx="1rem"
                  onClick={() => {
                    if (onActionClick !== undefined) {
                      onActionClick(item.id);
                    }
                  }}
                />
              </TableData>
            </TableRow>
          ))}
        </tbody>
      </StyledTable>
      <FlexBox justifyContent="center">
        <Button type="button" variant="primary" mb="2rem" mx="1rem" onClick={onLoadData}>
          LOAD MORE...
        </Button>
      </FlexBox>
    </>
  );
}

export default Table;
