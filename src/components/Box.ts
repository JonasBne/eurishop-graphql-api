import styled from 'styled-components';
import {
  space,
  SpaceProps,
  layout,
  LayoutProps,
  GridProps,
  FlexProps,
  FlexboxProps,
  border,
  BorderProps,
  flex,
  grid,
  flexbox,
  typography,
  TypographyProps,
  color,
  ColorProps,
  boxShadow,
  BoxShadowProps,
} from 'styled-system';

const Box = styled.div<
| SpaceProps
| LayoutProps
| GridProps
| FlexProps
| FlexboxProps
| BorderProps
| TypographyProps
| ColorProps
| BoxShadowProps
>(
  {
    boxSizing: 'border-box',
    minWidth: 0,
  },
  space,
  layout,
  border,
  flex,
  flexbox,
  grid,
  typography,
  color,
  boxShadow,
);

export default Box;
