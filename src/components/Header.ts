import styled from 'styled-components';
import {
  space,
  SpaceProps,
  layout,
  LayoutProps,
  textAlign,
  TextAlignProps,
  variant,
  border,
  BorderProps,
} from 'styled-system';
import theme from '../theme/theme';

type Variants = 'primary' | 'secondary' | 'tertiary';

interface VariantProps {
  variant?: Variants;
}

const Header = styled.h1<SpaceProps | LayoutProps | TextAlignProps | VariantProps | BorderProps>(
  {
    letterSpacing: '3px',
  },
  space,
  layout,
  textAlign,
  border,
  variant({
    variants: {
      primary: {
        color: `${theme.colors.whites.primaryWhite}`,
      },
      secondary: {
        color: `${theme.colors.whites.primaryWhite}`,
        background: `${theme.colors.blues.primaryBlue}`,
        marginTop: 0,
        paddingTop: '1rem',
        height: '4rem',
        borderRadius: '20px 20px 0 0',
        textAlign: 'center',
      },
      tertiary: {
        color: `${theme.colors.whites.primaryWhite}`,
        background: `${theme.colors.greens.primaryGreen}`,
        marginTop: 0,
        paddingTop: '1rem',
        height: '4rem',
        borderRadius: '20px 20px 0 0',
        textAlign: 'center',
      },
    },
  }),
);

export default Header;
