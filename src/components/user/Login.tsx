import {
  Link,
  Container,
  Box,
  Button,
  Checkbox,
  createTheme,
  CssBaseline,
  FormControlLabel,
  Grid,
  Paper,
  TextField,
  ThemeProvider,
  Typography,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { userService } from "../../services/UserService";
import { globalService } from "../../services/GlobalService";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../utility/context/AuthContext";
import { ROLES, config } from "../../utility/Config";
import { AuthModel, LoginModel } from "../../models/UserModel";
import Controls from "../../utility/controls/Controls";
import useForm from "../../utility/hooks/UseForm";
import { encryptionDecryptionService } from "../../services/EncryptionDecryptionService";

const Login: React.FC = () => {
  //const { auth, setAuth } = useAuth() as AuthContextType;
  const { auth, setAuth } = useContext(AuthContext);
  const theme = createTheme();
  const [appSetting, setAppSetting] = useState<any>(null);
  let count = 0;

  useEffect(() => {
    if (auth?.Token) {
      localStorage.clear();
      setAuth(null);
    }

    if (count <= 1) //to prevent this from calling multiple times
    {
      //if (!appSetting)
      getAppSetting();
    }
    count++;
  }, [count]);

  const getAppSetting = () => {
    userService
      .getAppSetting()
      .then((response) => {
        let result = response.data;
        setAppSetting(result.row);
        localStorage.setItem('themeLightHexCode', result.row.ThemeLightHexCode);
        localStorage.setItem('themeDarkHexCode', result.row.ThemeDarkHexCode);
      });
  }

  const validate: any = (fieldValues: LoginModel = values) => {
    let temp: any = { ...errors };
    if ("Password" in fieldValues)
      temp.Password = fieldValues.Password ? "" : "Password is required.";

    if ("UserName" in fieldValues)
      temp.UserName = fieldValues.UserName ? "" : "UserName is required.";

    setErrors({
      ...temp,
    });

    if (fieldValues === values)
      return Object.values(temp).every((x) => x === "");
  };

  const { values, setValues, errors, setErrors, handleInputChange, resetForm } =
    useForm(userService.initialLoginFieldValues, validate, null);

  const newUser = () => {
    setValues(userService.initialLoginFieldValues);
  };

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  //const userRef = useRef();
  //const [user, setUser] = useState(initialFieldValues);

  //   const handleInputChange = (event: any) => {
  //
  //     const { name, value } = event.target;
  //     setUser({ ...user, [name]: value });
  //   };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (validate()) {
      //   let success = false;
      //   if (values.UserName === "icici_user" && values.Password === "Abc@123") {
      //     success = true;
      //     localStorage.setItem("company", "icici");
      //   } else if (
      //     values.UserName === "sbi_user" &&
      //     values.Password === "Abc@123"
      //   ) {
      //     success = true;
      //     localStorage.setItem("company", "sbi");
      //   } else if (
      //     values.UserName === "airtel_user" &&
      //     values.Password === "Abc@123"
      //   ) {
      //     success = true;
      //     localStorage.setItem("company", "airtel");
      //   }
      //   if (success) {
      //     navigate("/");
      //     window.location.reload();
      //   }

      let payload = {
        UserName: encryptionDecryptionService.encrypt(values.UserName),
        Password: encryptionDecryptionService.encrypt(values.Password)
      };
      userService.login(payload).then((response) => {
        if (response) {
          let result = response.data;
          if (result?.isSuccess) {
            const accessToken = result?.row?.JwtToken;
            // let roles: string[] = result?.row?.RoleNames;
            //dont comment this. Its used in AuthContext. Without localstorage, its unable to fetch auth

            localStorage.setItem("currentUser", JSON.stringify(result.row));

            setAuth({
              Role: result?.row?.RoleName,
              Token: accessToken,
              Id: result?.row?.Id,
              Name: result?.row?.Name,
              UserName: result?.row?.UserName,
              ReportingToUserId: result?.row?.ReportingToUserId,
              CompanyId: result?.row?.CompanyId,
              CompanyName: result?.row?.Company?.Name,
              ThemeLightHexCode: result?.row?.Company?.ThemeLightHexCode ?? config.themeLightHexCode,
              ThemeDarkHexCode: result?.row?.Company?.ThemeDarkHexCode ?? config.themeDarkHexCode,
              Logo: result?.row?.Company?.Logo ?? null,
            });
            localStorage.setItem("company", result?.row?.Company?.Name);
            // navigate(from, { replace: true });

            localStorage.setItem("token", accessToken); //this is used in customAxios
            // if (roles.some((x) => x === ROLES.Admin)) {
            //   navigate("/admin");
            // } else if (roles.some((x) => x === ROLES.Subscriber)) {
            //   navigate("/mySociety");
            // } else {
            navigate("/");
            //}
            navigate(from, { replace: true });
            //setAuth1(true); //or conditional state
          } else {
            globalService.error(result.message);
          }
          //console.log(response.data);
        }
      });
    } else {
      globalService.error("Incorrect UserName/Password.");
    }
  };

  // const handleSubmit = (event) => {
  //     event.preventDefault();
  //     const data = new FormData(event.currentTarget);
  //     console.log({
  //       email: data.get("email"),
  //       password: data.get("password"),
  //     });
  //   };

  return (
    <Container component="main" maxWidth="lg">
      <Typography variant="h3" align="center">
        VoV-Value Of Visit <span className="spnCompany"> ({appSetting ? appSetting.CompanyName : ''})</span>
      </Typography>

      <Box
        sx={{
          marginTop: 1,
        }}
      >
        <Grid container>
          <CssBaseline />
          <Grid
            item
            xs={false}
            sm={4}
            md={7}
            sx={{
              // backgroundImage: "url(https://source.unsplash.com/random)",
              backgroundImage: "url(/images/loginVov.jpg)",
              backgroundRepeat: "no-repeat",
              backgroundColor: (t) =>
                t.palette.mode === "light"
                  ? t.palette.grey[50]
                  : t.palette.grey[900],
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
          <Grid
            item
            xs={12}
            sm={8}
            md={5}
            component={Paper}
            elevation={6}
            square
          >
            <Box
              sx={{
                my: 8,
                mx: 4,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Typography component="h1" variant="h5">
                Sign in
              </Typography>
              <Box
                component="form"
                noValidate
                onSubmit={handleSubmit}
                sx={{ mt: 1 }}
              >
                <Controls.Input
                  required
                  id="UserName"
                  label="UserName / Email Address"
                  name="UserName"
                  autoFocus
                  value={values.UserName}
                  onChange={handleInputChange}
                  error={errors.UserName}
                />
                <Controls.Input
                  margin="normal"
                  required
                  fullWidth
                  name="Password"
                  label="Password"
                  type="password"
                  value={values.Password}
                  id="password"
                  autoComplete="current-password"
                  autoFocus
                  onChange={handleInputChange}
                  error={errors.Password}
                />
                {/* <FormControlLabel
                  control={<Checkbox value="remember" color="primary" />}
                  label="Remember me"
                /> */}
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Sign In
                </Button>
                <Grid container>
                  <Grid item xs>
                    <Link href="#" variant="body2">
                      Forgot password?
                    </Link>
                  </Grid>
                  <Grid item>
                    <Link href="#" variant="body2">
                      {"Don't have an account? Sign Up"}
                    </Link>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default Login;
