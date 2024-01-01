import axios from "axios";
import { Box, TextField, Button } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import Header from "../../components/Header";
import {useAuth} from "../../AUTH/AuthContext"

const checkoutSchema = yup.object().shape({
  email: yup.string().email("invalid email").required("required"),
  password: yup.string().required("required"),
});
const LOGIN_URL = 'http://localhost:6002/api/user/login'

const initialValues = {
  email: "",
  password: "",
};


function Login() {
  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = () => setShowPassword(false);
  const {login}= useAuth()
  const handleFormSubmit = async (values, { setSubmitting })  => {
    const data = {
      email: values.email,
      password: values.password,
    };
   
    await axios.post(LOGIN_URL, data, {
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true,
    })
      .then((res) => {
     
          if (res.status === 200) {
            login(res.data.data)
            
          }
      })
      .catch((err) => {
        console.log(err);
        
      });


  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      height="100vh"
      mx="auto" // Center horizontally
    >
      <Header title="Login" subtitle="Enter your login details and submit" />

      <Formik
        onSubmit={handleFormSubmit}
        initialValues={initialValues}
        validationSchema={checkoutSchema}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
        }) => (
          <form onSubmit={handleSubmit}>
            <Box
              display="flex"
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
            >
              <TextField
                fullWidth
                id="email"
                name="email"
                label="Email"
                type="email"
                variant="outlined"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                sx={{ mb: 2 }}
                error={touched.email && Boolean(errors.email)}
                helperText={touched.email && errors.email}
              />

              <TextField
                fullWidth
                id="password"
                name="password"
                label="Password"
                type="password"
                variant="outlined"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                sx={{ mb: 2, }}
                error={touched.password && Boolean(errors.password)}
                helperText={touched.password && errors.password}
              />
            </Box>

            <Box mt="20px">
              <Button type="submit" variant="contained" color="secondary" sx={{width:"20rem"}}>
                Submit
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
}

export default Login;
