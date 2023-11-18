import { Outlet, useLocation } from "react-router-dom";
import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
import Header from "./Header";

// function Copyright(props: any) {
//     return (
//         <Typography variant="body2" color="text.secondary" align="center" {...props}>
//             {'Copyright © 2023 All Rights Reserved | Designed and Developed By '}
//             <Link color="inherit" href="http://www.sentientsystems.net/">
//                 <b>Sentient Systems Pvt Ltd.</b>
//             </Link>{' '}
//         </Typography>
//     );
// }

export default function DefaultLayout() {
  const location = useLocation();
  let showHeader = true,
    showNavBar = true;
  if (location.pathname === "/login") showHeader = false;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      {showHeader && <Header />}
      <Box
        component="main"
        sx={{
          backgroundColor: (theme) =>
            theme.palette.mode === "light"
              ? theme.palette.grey[100]
              : theme.palette.grey[900],
          flexGrow: 1,
          height: "100vh",
          overflow: "auto",
        }}
      >
        {showHeader && <Toolbar />}
        <Container maxWidth="lg" sx={{ mt: 0.4, mb: 0 }}>
          <Outlet />
          {/* <Copyright sx={{ pt: 2, pb: 2 }} /> */}
        </Container>
      </Box>
    </Box>
  );
}
