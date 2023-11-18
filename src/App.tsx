import { useEffect, useState, useContext } from "react";
import "./App.css";
import Spinner from "./components/helper/Spinner";
import AppRoutes from "./utility/AppRoutes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { customAxios } from "./services/AxiosHttpCommon";
import { ThemeProvider, createTheme } from "@mui/material";
import { AuthContext } from "./utility/context/AuthContext";
import React from "react";
import { config } from "./utility/Config";

function App() {
  const [loading, setLoading] = useState(false);
  const [company, setCompany] = useState(localStorage.getItem("company"));
  const { auth } = useContext(AuthContext);

  useEffect(() => {
    //request interceptor
    customAxios.interceptors.request.use(
      function (config: any) {
        setLoading(true);
        return config;
      },
      function (error) {
        setLoading(false);
        return Promise.reject(error);
      }
    );
    //response interceptor
    customAxios.interceptors.response.use(
      function (config: any) {
        setLoading(false);
        return config;
      },
      function (error) {
        setLoading(false);
        return Promise.reject(error);
      }
    );
  }, [company]);

  function getBgColor(type: string) {
    let color =
      type === "l" ? config.themeLightHexCode : config.themeDarkHexCode;
    let defaultTheme =
      type === "l" ? config.themeLightHexCode : config.themeDarkHexCode;
    if (type === "l") {
      if (auth && auth?.ThemeLightHexCode) {
        //
        color = auth.ThemeLightHexCode;
      } else if (localStorage.getItem("themeLightHexCode")) {
        //
        color = localStorage.getItem("themeLightHexCode");
      }
    }

    if (type === "d") {
      if (auth && auth?.ThemeDarkHexCode) color = auth.ThemeDarkHexCode;
      else if (localStorage.getItem("themeDarkHexCode"))
        color = localStorage.getItem("themeDarkHexCode");
    }
    // console.log(color);
    // console.log('Theme ' + defaultTheme);
    return color !== null && color !== "" && color !== undefined
      ? color
      : defaultTheme;
  }

  function getBgColorOld(type: string) {
    let selCompany = company ? company.toLocaleLowerCase() : "hdfc"; //if nothing in localstorage then set blue theme
    if (selCompany && !company) {
      localStorage.setItem("company", selCompany);
      setCompany(selCompany);
    }

    if (type == "l") {
      //light color then
      switch (selCompany) {
        case "icici":
          return "#fff3e0"; //orange
        case "indian":
          return "#fbe9e7";
        // case "airtel":
        //   return "#e400000d";
        case "vodafone":
        case "airtel":
          return "#fffbf0";
        case "hdfc":
        case "sbi":
          return "#F3F3F3";
        default:
          return "#e3f2fd";
      }
    } else if (type == "d") {
      //for dark colors
      switch (selCompany) {
        case "icici":
          return "#ef6c00"; //orange
        case "indian":
          return "#c62828";
        case "airtel":
          return "#e40000";
        case "vodafone":
          return "#ee2737";
        case "hdfc":
        case "sbi":
          return "#3b536f";
        default:
          return "#1976d2";
      }
    }
  }

  //https://stackoverflow.com/questions/39138380/how-to-apply-different-color-in-appbar-title-material-ui
  //https://mui.com/material-ui/customization/theme-components/

  const defaultTheme = createTheme({
    palette: {
      background: {
        default: getBgColor("l"),
      },
      primary: {
        main: getBgColor("d"),
      },

      // secondary: {
      //     main: '#E33E7F'
      // },
      // error: {
      //     main: '#cb0e00'
      // }
    },
    typography: {
      h1: {
        color: getBgColor("d"),
      },
      h2: {
        color: getBgColor("d"),
      },
      h3: {
        color: getBgColor("d"),
      },
      h4: {
        color: getBgColor("d"),
      },
      h5: {
        color: getBgColor("d"),
      },
      h6: {
        color: getBgColor("d"),
      },
      // subtitle1: {
      //   fontSize: 12,
      // },
      // body1: {
      //   fontWeight: 500,
      // },
      // button: {
      //   fontStyle: 'italic',
      // },
    },
    components: {
      MuiToolbar: {
        styleOverrides: {
          root: {
            backgroundColor: "transparent",
          },
        },
      },
      MuiAppBar: {
        styleOverrides: {
          colorPrimary: {
            backgroundColor: getBgColor("d"),
          },
        },
      },
      MuiContainer: {
        styleOverrides: {
          root: {
            backgroundColor: getBgColor("l"),
            marginBottom: "0px",
            marginTop: 24,
            paddingBottom: 10,
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {},
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            marginBottom: 20,
            borderTop: "3px solid",
            borderTopColor: getBgColor("d"),
          },
        },
      },
      MuiListItemIcon: {
        styleOverrides: {
          root: {
            color: getBgColor("d"),
            minWidth: 40,
          },
        },
      },
      MuiDialogContent: {
        styleOverrides: {
          root: {
            fontSize: "0.85rem",
          },
        },
      },      
    },
  });

  return (
    <>
      <ThemeProvider theme={defaultTheme}>
        <Spinner show={loading} />
        <ToastContainer />
        <AppRoutes />
      </ThemeProvider>
    </>
  );
}

export default App;
