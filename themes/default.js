const themeConfig = {
  // Temp fonts
  fonts: {
    display: "Thunder, sans-serif",
    title: "Poppins, sans-serif",
    main: "Roboto, sans-serif",
  },
  // Colors for layout
  colors: {
    primary1: "#222222",
    background1: "#f8d983",
    accent1: "hsl(34.9,98.6%,72.9%)",
    accent2: "rgba(248, 229, 176, 0.66)",
    button: "hsl(205.1,100%,36.1%)",
    background2: "hsl(232.7,27.3%,23.7%)",
    link: "#18C5DD",
    navLink: "rgba(0,0,0,0.75)",
    navLinkHover: "rgba(0,0,0,1)",
  },
  // Breakpoints for responsive design
  breakpoints: {
    xs: "only screen and (min-width: 0px) and (max-width: 450px)",
    sm: "only screen and (min-width: 451px) and (max-width: 640px)",
    md: "only screen and (min-width: 641px) and (max-width: 768px)",
    lg: "only screen and (min-width: 769px) and (max-width: 1024px)",
    xl: "only screen and (min-width: 1025px) and (max-width: 1280px)",
  },
};

export default themeConfig;
