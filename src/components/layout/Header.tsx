import * as React from "react";
import {
  Grid,
  Link,
  Button,
  Typography,
  Paper,
  Stack,
  Divider,
  IconButton,
  List,
  Toolbar,
  Badge,
  Box,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import SideBarMenus from "./Sidebar";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MuiDrawer from "@mui/material/Drawer";
import {
  styled,
  createTheme,
  ThemeProvider,
  alpha,
} from "@mui/material/styles";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Menu, { MenuProps } from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { AuthContext } from "../../utility/context/AuthContext";
import { FolderPath, ROLES, config } from "../../utility/Config";
import { globalService } from "../../services/GlobalService";

const drawerWidth: number = 240;

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  "& .MuiDrawer-paper": {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: "border-box",
    ...(!open && {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9),
      },
    }),
  },
}));

const StyledMenu = styled((props: MenuProps) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "right",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "right",
    }}
    {...props}
  />
))(({ theme }) => ({
  "& .MuiPaper-root": {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    color:
      theme.palette.mode === "light"
        ? "rgb(55, 65, 81)"
        : theme.palette.grey[300],
    boxShadow:
      "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
    "& .MuiMenu-list": {
      padding: "4px 0",
    },
    "& .MuiMenuItem-root": {
      "& .MuiSvgIcon-root": {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      "&:active": {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity
        ),
      },
    },
  },
}));

interface SidebarProps {
  title: string;
  subTitle: string;
}

export default function Header() {
  const [open, setOpen] = React.useState(true);
  const [logo, setLogo] = React.useState("hdfc");
  const { auth, setAuth } = React.useContext(AuthContext);
  let isLoggedIn = auth?.Token ? true : false;
  const navigate = useNavigate();

  React.useEffect(() => {
    //getLogo();
    if (auth && !auth.Token) {
      logout();
    }
  }, [logo]);

  function logout() {
    localStorage.clear();
    setAuth(null);
    navigate("/login");
  }

  // const getLogo = () => {
  //   let currentCompany = localStorage.getItem("company");
  //   // try {
  //   //   path = `/images/sbi.png`;
  //   //   require(`${path}`);
  //   // } catch (err) {
  //   //   path = `/images/nocompany.png`;
  //   // }

  //   if (currentCompany) {
  //     // let path = `/images/${currentCompany}.png`;
  //     let path = `/images/sbi.png`;
  //     setLogo(path);
  //   }
  // };

  const toggleDrawer = () => {
    setOpen(!open);
  };

  const [accountAnchorEl, setAccountAnchorEl] =
    React.useState<null | HTMLElement>(null);
  const [companyAnchorEl, setCompanyAnchorEl] =
    React.useState<null | HTMLElement>(null);

  const location = useLocation();
  const openAccount = Boolean(accountAnchorEl);
  const openCompany = Boolean(companyAnchorEl);

  const handleClick = (
    event: React.MouseEvent<HTMLElement>,
    mainMenu: string
  ) => {
    if (mainMenu === "account") setAccountAnchorEl(event.currentTarget);
    else if (mainMenu === "company") setCompanyAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAccountAnchorEl(null);
    setCompanyAnchorEl(null);
  };

  const onChangeCompany = (company: string) => {
    localStorage.setItem("company", company);
    window.location.reload();
  };
  return (
    <>
      <AppBar position="absolute" open={open}>
        <Toolbar
          sx={{
            pr: "24px", // keep right padding when drawer closed
          }}
        >
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={toggleDrawer}
            sx={{
              marginRight: "36px",
              ...(open && { display: "none" }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
            sx={{ flexGrow: 1 }}
          >
            VoV - Value of Visit{" "}
            {globalService.roleMatch([ROLES.CompanyAdmin, ROLES.CompanyDomainUser], auth) && (
              <> (Company : {localStorage.getItem("company")})</>
            )}
          </Typography>
          <IconButton color="inherit">
            <Badge badgeContent={4} color="secondary">
              <NotificationsIcon />
            </Badge>
          </IconButton>
          <Button
            id="user-btn"
            aria-controls={open ? "user-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            // variant="contained"
            className={`nav-btn`}
            disableElevation
          //onClick={(e) => handleClick(e, "account")}
          // endIcon={<KeyboardArrowDownIcon />}
          >
            {/* {auth?.Name} <br/> <p id="spnRole">({auth?.Role})</p> */}
            {auth?.Name} <br /> ({auth?.Role})
          </Button>

          {/* Account */}
          <Button
            id="account-button"
            aria-controls={open ? "account-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            // variant="contained"
            className={`nav-btn`}
            disableElevation
            onClick={(e) => handleClick(e, "account")}
            endIcon={<KeyboardArrowDownIcon />}
          ></Button>
          <StyledMenu
            id="account-menu"
            MenuListProps={{
              "aria-labelledby": "account-button",
            }}
            anchorEl={accountAnchorEl}
            open={openAccount}
            onClose={handleClose}
          >
            <Link color="inherit" href={"/"} className="nav-link">
              <MenuItem onClick={handleClose} disableRipple>
                My Account
              </MenuItem>
            </Link>
            <Link color="inherit" href={"/resetPassword/" + auth.Id } className="nav-link">
              <MenuItem onClick={handleClose} disableRipple>
               Change Password
              </MenuItem>
            </Link>
            <Link color="inherit" onClick={() => logout()} className="nav-link">
              <MenuItem onClick={handleClose} disableRipple>
                Logout
              </MenuItem>
            </Link>
          </StyledMenu>

          {/* <Button
            id="company-button"
            aria-controls={open ? "company-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            // variant="contained"
            className={`nav-btn`}
            disableElevation
            onClick={(e) => handleClick(e, "company")}
            endIcon={<KeyboardArrowDownIcon />}
          >
            Company
          </Button>
          <StyledMenu
            id="company-menu"
            MenuListProps={{
              "aria-labelledby": "company-button",
            }}
            anchorEl={companyAnchorEl}
            open={openCompany}
            onClose={handleClose}
          >
            <Link
              color="inherit"
              onClick={() => onChangeCompany("HDFC")}
              className="nav-link"
            >
              <MenuItem onClick={handleClose} disableRipple>
                HDFC
              </MenuItem>
            </Link>
            <Link
              color="inherit"
              onClick={() => onChangeCompany("SBI")}
              className="nav-link"
            >
              <MenuItem onClick={handleClose} disableRipple>
                SBI
              </MenuItem>
            </Link>
            <Link
              color="inherit"
              onClick={() => onChangeCompany("ICICI")}
              className="nav-link"
            >
              <MenuItem onClick={handleClose} disableRipple>
                ICICI
              </MenuItem>
            </Link>
            <Link
              color="inherit"
              onClick={() => onChangeCompany("AirTel")}
              className="nav-link"
            >
              <MenuItem onClick={handleClose} disableRipple>
                AirTel
              </MenuItem>
            </Link>
            <Link
              color="inherit"
              onClick={() => onChangeCompany("Vodafone")}
              className="nav-link"
            >
              <MenuItem onClick={handleClose} disableRipple>
                Vodafone
              </MenuItem>
            </Link>
          </StyledMenu> */}
        </Toolbar>
      </AppBar>

      <Drawer variant="permanent" open={open}>
        <Toolbar
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            px: [1],
          }}
        >
          <Link href="/">
            <Box
              component="img"
              sx={{ height: 54, width: "100%" }}
              alt="Logo"
              src={config.baseUrl + '/' + FolderPath.companyLogo + '/' + auth.Logo}
            />
          </Link>{" "}
          <IconButton onClick={toggleDrawer}>
            <ChevronLeftIcon />
          </IconButton>
        </Toolbar>
        <Divider />
        <List component="nav">
          {/* {sideBarMenus} */}
          <SideBarMenus />
        </List>
      </Drawer>
    </>
  );
}
