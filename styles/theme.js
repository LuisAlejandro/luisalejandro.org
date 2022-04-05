import { ThemeProvider } from 'styled-components';

import theme from "themes/default";
import { HomeStyles, PortfolioStyles, CaseStudiesStyles } from './globals';

const Theme = ({ children }) => {
  console.log(children.type.name);
  const Styles = children.type.name == 'Index' ? HomeStyles :
                 children.type.name == 'Portfolio' ? PortfolioStyles : CaseStudiesStyles;
  return (
  <ThemeProvider theme={theme}>
    <Styles />
    {children}
  </ThemeProvider>
)};

export default Theme;