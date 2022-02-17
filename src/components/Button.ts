import styled from 'styled-components';
import {
  space, SpaceProps, layout, LayoutProps, variant,
} from 'styled-system';
import theme from '../theme/theme';

type Variants = 'primary' | 'secondary' | 'danger' | 'success';

interface VariantProps {
  variant?: Variants;
}

const Button = styled('button')<SpaceProps | LayoutProps | VariantProps>(
  {
    boxSizing: 'border-box',
    borderRadius: '35px',
    borderWidth: '0',
    color: '#FFF',
    fontSize: '100%',
    height: '2rem',
    lineHeight: '1.15',
    outline: 'none',
    textAlign: 'center',
    textTransform: 'none',
    cursor: 'pointer',
  },
  space,
  layout,
  variant({
    variants: {
      primary: {
        color: `${theme.colors.whites.primaryWhite}`,
        bg: `${theme.colors.blues.secondaryBlue}`,
      },
      secondary: {
        color: `${theme.colors.whites.primaryWhite}`,
        bg: `${theme.colors.greens.secondaryGreen}`,
      },
      danger: {
        color: `${theme.colors.whites.primaryWhite}`,
        bg: `${theme.colors.reds.primaryRed}`,
      },
      success: {
        color: `${theme.colors.whites.primaryWhite}`,
        bg: `${theme.colors.greens.primaryGreen}`,
      },
    },
  }),
);

export default Button;
