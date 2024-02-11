import { Box, Button, TextField } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../../components/Header";
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import { Select, useTheme } from "@mui/material";
import MenuItem from '@mui/material/MenuItem';
import { useAuth } from "../../../AUTH/AuthContext";
import { tokens } from "../../../theme";
import { ToastContainer, toast } from "react-toastify";
const checkoutSchema = yup.object().shape({
  name: yup.string().required("required"),
  description: yup.string().required("required"),
  amount: yup.number().required("required"),
  duration: yup.number().required("required"),
  interest_rate: yup.number().required("required"),
  type: yup.number().required("required"),
  purpose: yup.string().required("required"),
  maturity: yup.number().required("required"),
  averageEggproduction: yup.number().required("required"),
  meatProduction: yup.number().required("required"),
  feeding: yup.string().required("required"),
  setting: yup.string().required("required"),
  declineinProduction: yup.number().required("required"),
  deseaseResistance: yup.string().required("required"),
  averageWeight: yup.number().required("required")
});

const initialValues = {
  name: "",
  description: "",
  amount: "",
  duration: "",
  interest_rate: "",
  type: "",
  purpose: "",
  maturity: "",
  averageEggproduction: "",
  meatProduction: "",
  feeding: "",
  setting: "",
  declineinProduction: "",
  deseaseResistance: "",
  averageWeight: ""
};
const KukuPlan = () => {
  const theme = useTheme();
  const {user} = useAuth()
  const { axiosInstance,showToastMessage,logout  } = useAuth();
  const colors = tokens(theme.palette.mode);





  const isNonMobile = useMediaQuery("(min-width:600px)");

  const handleFormSubmit = async (values, { setSubmitting }) => {
    try {
     const data={
        name:values?.name,
        description:values?.description,
        amount:values?.amount,
        duration:values?.duration,
        interest_rate:values?.interest_rate,
        vendor_id:user?.user?.Agency?.id,
        type:[values?.type],
        puporse:values?.purpose,
        maturity:values?.maturity,
        averageEggProduction:values?.averageEggproduction,
        meatProduction:values?.meatProduction,
        averageWeight:values?.averageWeight,
        feeding:values?.feeding,
        setting:values?.setting,
        declineinProduction:values?.declineinProduction,
        diseaseResistance: values?.deseaseResistance,
        averageWeight:values?.averageWeight
    }
    await axiosInstance.post("/api/kukuplan/create",data,{
      headers:{
        'Content-Type':'application/json'
      },
      withCredentials:true
    }).then((response)=>{
      if(response.status === 200){
        showToastMessage("Kuku Plan Created Successfully","success")
      }
    }).catch(error=>{
      showToastMessage("Kuku Plan Creation Failed","error")
    
    })
    }
    catch (error) {
      console.log(error);
    }
  
    
  };

  return (
    <>
     <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme={theme.palette.mode === "dark" ? "dark" : "light"}
      />
 
    <Box m="20px">
      <Header title="CREATE  KUKU PLAN" subtitle="Create a New Kuku Plan Based on Predefined Information" />

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
              display="grid"
              gap="30px"
              gridTemplateColumns="repeat(4, minmax(0, 1fr))"
              sx={{
                "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
              }}
            >
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Name eg. Kuku Plan 1"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.name}
                name="name"
                error={!!touched.name && !!errors.name}
                helperText={touched.name && errors.name}
                sx={{ gridColumn: "span 1" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="number"
                label="Initial Amount eg. 10000"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.amount}
                name="amount"
                error={!!touched.amount && !!errors.amount}
                helperText={touched.amount && errors.amount}
                sx={{ gridColumn: "span 1" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="number"
                label="Duration of the plan in months"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.duration}
                name="duration"
                error={!!touched.duration && !!errors.duration}
                helperText={touched.duration && errors.duration}
                sx={{ gridColumn: "span 1" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="number"
                label="% Interest rate"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.interest_rate}
                name="interest_rate"
                error={!!touched.interest_rate && !!errors.interest_rate}
                helperText={touched.interest_rate && errors.interest_rate}
                sx={{ gridColumn: "span 1" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Purpose eg. layer, broiler"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.purpose}
                name="purpose"
                error={!!touched.purpose && !!errors.purpose}
                helperText={touched.purpose && errors.purpose}
                sx={{ gridColumn: "span 1" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="number"
                label="Maturity in months eg. 6 months"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.maturity}
                name="maturity"
                error={!!touched.maturity && !!errors.maturity}
                helperText={touched.maturity && errors.maturity}
                sx={{ gridColumn: "span 1" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="number"
                label="Average Egg Production per month"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.averageEggproduction}
                name="averageEggproduction"
                error={!!touched.averageEggproduction && !!errors.averageEggproduction}
                helperText={touched.averageEggproduction && errors.averageEggproduction}
                sx={{ gridColumn: "span 1" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="number"
                label="Average Meat Production per head(kg)"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.meatProduction}
                name="meatProduction"
                error={!!touched.meatProduction && !!errors.meatProduction}
                helperText={touched.meatProduction && errors.meatProduction}
                sx={{ gridColumn: "span 1" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="number"
                label="Production decline rate eg. 1.5"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.declineinProduction}
                name="declineinProduction"
                error={!!touched.declineinProduction && !!errors.declineinProduction}
                helperText={touched.declineinProduction && errors.declineinProduction}
                sx={{ gridColumn: "span 1" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Feeding eg. Heavy feeder"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.feeding}
                name="feeding"
                error={!!touched.feeding && !!errors.feeding}
                helperText={touched.feeding && errors.feeding}
                sx={{ gridColumn: "span 1" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Desease Resistance eg. High"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.deseaseResistance}
                name="deseaseResistance"
                error={!!touched.deseaseResistance && !!errors.deseaseResistance}
                helperText={touched.deseaseResistance && errors.deseaseResistance}
                sx={{ gridColumn: "span 1" }}
              />
              {/* create a select option with this options type{kari f1; kenbro; sasso;kuroiler;dominant kienyeji;rainbow-rooster} */}
              <FormControl fullWidth  >
                <InputLabel id="type">Type</InputLabel>
                <Select
                  labelId="type"
                  id="type"
                  name='type'
                  value={values.type}
                  label="Type"
                  onChange={handleChange}
                  sx={{ gridColumn: "span 1" }}
                  error={touched.type && Boolean(errors.type)}
                  color={touched.type && errors.type ? 'error' : 'primary'}
                 
                >
                  <MenuItem sx={{  backgroundColor: `${colors.primary}` }} value={1}>kari f1</MenuItem>
                  <MenuItem sx={{  backgroundColor: `${colors.primary}` }} value={2}>Kenbro</MenuItem>
                  <MenuItem sx={{  backgroundColor: `${colors.primary}` }} value={3}>Sasso</MenuItem>
                  <MenuItem sx={{  backgroundColor: `${colors.primary}` }} value={4}>Kuroiler</MenuItem>
                  <MenuItem sx={{  backgroundColor: `${colors.primary}` }} value={5}>dominant kienyeji</MenuItem>
                  <MenuItem sx={{  backgroundColor: `${colors.primary}` }} value={6}>rainbow-rooster</MenuItem>
                </Select>
                {touched.type && errors.type && (
                  <p style={{ color: 'red' }}>{errors.type}</p>
                )}
              </FormControl>
              <TextField
                fullWidth
                variant="filled"
                type="number"
                label="Average Weight eg. 2.5kg"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.averageWeight}
                name="averageWeight"
                error={!!touched.averageWeight && !!errors.averageWeight}
                helperText={touched.averageWeight && errors.averageWeight}
                sx={{ gridColumn: "span 1" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Sitting characteristics {Multi-coloured ones are good sitters Poor sitters Does not sit Does not sit}"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.setting}
                name="setting"
                error={!!touched.setting && !!errors.setting}
                helperText={touched.setting && errors.setting}
                sx={{ gridColumn: "span 1" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Description"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.description}
                name="description"
                error={!!touched.description && !!errors.description}
                helperText={touched.description && errors.description}
                sx={{ gridColumn: "span 2" }}
              />
            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" variant="contained" color="secondary" >
                Create New Kuku Plan
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
    </>
  );
};



export default KukuPlan;
