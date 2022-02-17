import styled from 'styled-components';
import { grid, GridProps } from 'styled-system';
import Box from './Box';

const Grid = styled(Box)<GridProps>(
  {
    display: 'grid',
  },
  grid,
);

export default Grid;
