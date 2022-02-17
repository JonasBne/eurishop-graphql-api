import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      blacks: {
        primaryBlack: string;
      };
      whites: {
        primaryWhite: string;
      };
      blues: {
        primaryBlue: string;
        secondaryBlue: string;
        tertiaryBlue: string;
      };
      greens: {
        primaryGreen: string;
        secondaryGreen: string;
        tertiaryGreen: string;
      };
      reds: {
        primaryRed: string;
      };
    };
  }
}
