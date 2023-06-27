import { createTheme } from "@mui/material";
import { Theme } from "@mui/material/styles";
import { breakPoints } from "../contant/breakPoints";

declare module "@mui/styles/defaultTheme" {
  interface DefaultTheme extends Theme {}
}

declare module "@mui/material/styles" {
  interface CustomTheme {
    custom?: {
      text: {
        highLight: string;
        information: string;
        opacity: string;
        titleSteps: string;
        link: string;
        title: string;
        pinkSubTitle: string;
        desc: string;
        blueMain: string;
        white: string;
      };
      background: {
        backgroundCard: string;
        white: string;
        blueMain: string;
        pink: string;
      };
      flexBox: {
        centerCenter: {
          display: "flex";
          justifyContent: "center";
          alignItems: "center";
        };
        spaceBetweenCenter: {
          display: "flex";
          justifyContent: "space-between";
          alignItems: "center";
        };
        horizontalCenter: {
          display: "flex";
          justifyContent: "center";
        };
        verticalCenter:{
          display: "flex";
          alignItems: "center";
        }
      };
      border: {
        bottomTitle: string;
        borderBottom: string;
        main: string;
      };
      textTitleBorder: {
        paddingBottom: string;
        marginBottom: string;
        borderBottom: string;
      };
      textDesc: {
        marginBottom: string;
      };
      textTitleSection: {
        paddingBottom: string;
        marginBottom: string;
        borderBottom: string;
      };
      boxShadow: {
        main: string;
      };
    };
  }
  interface Theme extends CustomTheme {}
  interface ThemeOptions extends CustomTheme {}
}
export const theme = createTheme({
  breakpoints: {
    values: {
      xs: breakPoints.xs,
      sm: breakPoints.sm,
      md: breakPoints.md,
      lg: breakPoints.lg,
      xl: breakPoints.xl,
    },
  },
  custom: {
    text: {
      highLight: "rgba(216, 1, 102, 1)",
      information: "rgba(0, 0, 0, 1)",
      opacity: "rgba(112, 112, 112, 1)",
      titleSteps: "rgba(221, 0, 113, 1)",
      link: "rgba(81, 190, 240, 1)",
      title: "#000000",
      pinkSubTitle: "rgba(221, 0, 113, 1)",
      desc: "#666666",
      blueMain: "rgba(20, 30, 210, 1)",
      white: "#fff",
    },
    background: {
      backgroundCard: "rgba(252, 236, 243, 1)",
      white: "#fff",
      blueMain: "rgba(20, 30, 210, 1)",
      pink: "#EA84AB",
    },
    border: {
      bottomTitle: "#f0f0f0",
      borderBottom: "1px solid #f0f0f0",
      main: "#F5F5F5",
    },
    flexBox: {
      centerCenter: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      },
      spaceBetweenCenter: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      },
      horizontalCenter: {
        display: "flex",
        justifyContent: "center",
      },
      verticalCenter:{
        display: "flex",
        alignItems: "center",
      }
    },
    textTitleBorder: {
      paddingBottom: "16px",
      marginBottom: "16px",
      borderBottom: "1px solid rgba(217, 217, 217, 1)",
    },
    textDesc: {
      marginBottom: "4px",
    },
    textTitleSection: {
      paddingBottom: "12px",
      marginBottom: "24px",
      borderBottom: "1px solid #f0f0f0",
    },
    boxShadow: {
      main: "0px 2px 4px rgba(0, 0, 0, 0.1)",
    },
  },
  palette: {},
});
