import { ThemeProvider } from 'styled-components';

import theme from "../themes/default";
import { HomeStyles, PortfolioStyles } from './globals';

const Theme = ({ children }) => {
  const Styles = children.type.name == 'Index' ? HomeStyles : PortfolioStyles;
  return (
  <ThemeProvider theme={theme}>
    <Styles />
    {children}
  </ThemeProvider>
)};

export default Theme;