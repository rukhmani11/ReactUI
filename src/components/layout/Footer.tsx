

import React, { FC, ReactElement } from "react";
import { Box, Container, Grid, Link, Typography } from "@mui/material";


function Copyright(props: any) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © 2023 All Rights Reserved | Designed and Developed By '}
      <Link color="inherit" href="http://www.sentientsystems.net/">
        <b>Sentient Systems Pvt Ltd.</b>
      </Link>{' '}
    </Typography>
  );
}

export const Footer: FC = (): ReactElement => {
  return (
    <Box
      sx={{
        width: "100%",
        height: "auto",
        backgroundColor: "#00000026",
        paddingTop: "0.5rem",
        paddingBottom: "0.6rem",
        alignContent: "center"
      }}
    >
      <Container maxWidth="lg">
        <Copyright />
      </Container>
    </Box>
  );
};

export default Footer;
////////////////////Below By Sujashree///////////////////////
// import * as React from "react";
// import { Link, Box, Container, Typography } from "@mui/material";

// function Copyright() {
//   return (
//     <Typography variant="body2" color="text.secondary" align="center" >
//       {'Copyright © '}
//       <Link color="inherit" href="https://google.com/">
//         Perfect Society
//       </Link>{' '}
//       {new Date().getFullYear()}
//       {'.'}
//       <br />
//       Created By <Link color="inherit" href="http://www.sentientsystems.net/">Sentient Systems</Link>
//     </Typography>
//   );
// }

// interface FooterProps {
//   description: string;
//   title: string;
// }

// export default function Footer(props: FooterProps) {
//   const { description, title } = props;

//   return (
//     <Box component="footer" sx={{ bgcolor: "background.paper", py: 6 }}>
//       <Container maxWidth="lg">
//         <Typography variant="h6" align="center" gutterBottom>
//           {/* {props.title} */}
//           {title}
//         </Typography>
//         <Typography
//           variant="subtitle1"
//           align="center"
//           color="text.secondary"
//           component="p"
//         >
//           {/* {props.description} */}
//           {description}
//         </Typography>
//         <Copyright />
//       </Container>
//     </Box>
//   );
// }
