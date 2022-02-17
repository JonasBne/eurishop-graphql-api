import styled from 'styled-components';
import { gridArea, GridAreaProps } from 'styled-system';

const Label = styled.label<GridAreaProps>`
  margin: 1rem;
  ${gridArea}
`;

export default Label;
