import * as React from 'react';
import Modal from '@mui/material/Modal';
import { Select, useTheme } from "@mui/material";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import { tokens } from "../../theme";
import { Box, TextField, Button, Grid } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from '../../components/Header';
const checkoutSchema = yup.object().shape({
    email: yup.string().email("invalid email").required("required"),
    firstname: yup.string().required("required"),
    lastname: yup.string().required("required"),
    phone: yup.string().required("required"),
    national_id: yup.string().required("required"),
    krapin: yup.string().required("required"),
    is_active: yup.boolean().required("required"),
    role: yup.string().required("required"),
    address_id: yup.string().required("required"),
    is_account_verified: yup.string().required("required"),
    latitude: yup.string().required("required"),
    longitude: yup.string().required("required"),
});

export default function BasicModal({ open, handleOpen, handleClose, userdata, handleSaveData }) {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [role, setRole] = React.useState('');

    const handleChange = (event) => {
      setRole(event.target.value);
    };
  
    const initialValues = {
        email: userdata?.data?.email || '',
        firstname: userdata?.data?.fname || '',
        lastname: userdata?.data?.lname || '',
        phone: userdata?.data?.phone || '',
        national_id: userdata?.data?.national_id || '',
        krapin: userdata?.data?.krapin || '',
        is_active: userdata?.data?.is_active || '',
        role: userdata?.data?.role || '',
        address_id: userdata?.data?.address_id || '',
        is_account_verified: userdata?.data?.is_account_verified || false,
        latitude: userdata?.data?.latitude || '',
        longitude: userdata?.data?.longitude || '',
    };

    const handleFormSubmit = async (values, { setSubmitting }) => {
        handleClose();
        // Add logic for form submission or data saving
    };
    const isNonMobile = useMediaQuery("(min-width:600px)");
    return (
        <Box m={"20px"}
            sx={{
                "& > div": { gridColumn: isNonMobile ? "span 3" : "span 4" },

            }}
            color={colors.greenAccent[900]}
        >
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >

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
                        <form
                            onSubmit={handleSubmit}
                        >

                            <Box
                                display="flex"
                                flexDirection="column"
                                margin={"100px"}
                                gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                                backgroundColor={colors.primary[400]}

                                color={colors.greenAccent[900]}
                            >

                                <Grid
                                    container
                                    spacing={2}
                                    sx={{
                                        "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
                                        scrollBehavior: "smooth",
                                        overflowY: "auto", // Add overflowY for vertical scrollbar
                                        "&::-webkit-scrollbar": {
                                            width: "0.4em",
                                        },
                                        "&::-webkit-scrollbar-track": {
                                            boxShadow: "inset 0 0 6px rgba(0,0,0,0.00)",
                                            webkitBoxShadow: "inset 0 0 6px rgba(0,0,0,0.00)",
                                        },
                                        "&::-webkit-scrollbar-thumb": {
                                            backgroundColor: "rgba(0,0,0,.1)",
                                            outline: "1px solid slategrey",
                                        },
                                    }}
                                >
                                    {/**grid to fill a row */}
                                    <Grid
                                    display="flex"
                                    justifyContent="center" 
                                    item 
                                    sx={{width:'100%'}}
                                    
                                    >
                                        <Header title="UPDATE USER" subtitle="Update user  Profile,change roles and addresses" />
                                    </Grid>
                                    <Grid item xs={12} sm={4}>
                                        <TextField
                                            id="email"
                                            name="email"
                                            label="Email"
                                            type="email"
                                            variant="filled"
                                            value={values.email}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            sx={{ mb: 2, width: '100%', padding: '5px' }}
                                            error={touched.email && Boolean(errors.email)}
                                            helperText={touched.email && errors.email}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={4}>
                                        <TextField
                                            id="firstname"
                                            name="firstname"
                                            label="First Name"
                                            type="text"
                                            variant="filled"
                                            value={values.firstname}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            sx={{ mb: 2, width: '100%', padding: '5px' }}
                                            error={touched.firstname && Boolean(errors.firstname)}
                                            helperText={touched.firstname && errors.firstname}
                                        />

                                    </Grid>
                                    <Grid item xs={12} sm={4}>
                                        <TextField
                                            id="lastname"
                                            name="lastname"
                                            label="Last Name"
                                            type="text"
                                            variant="filled"
                                            value={values.lastname}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            sx={{ mb: 2, width: '100%', padding: '5px' }}
                                            error={touched.lastname && Boolean(errors.lastname)}
                                            helperText={touched.lastname && errors.lastname} />
                                    </Grid>
                                    <Grid item xs={12} sm={4}>
                                        <TextField
                                            id="phone"
                                            name="phone"
                                            label="Phone"
                                            type="text"
                                            variant="filled"
                                            value={values.phone}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            sx={{ mb: 2, width: '100%', padding: '5px' }}
                                            error={touched.phone && Boolean(errors.phone)}
                                            helperText={touched.phone && errors.phone}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={4}>
                                        <TextField
                                            id="national_id"
                                            name="national_id"
                                            label="National ID"
                                            type="text"
                                            variant="filled"
                                            value={values.national_id}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            sx={{ mb: 2, width: '100%', padding: '5px' }}
                                            error={touched.national_id && Boolean(errors.national_id)}
                                            helperText={touched.national_id && errors.national_id}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={4}>
                                        <TextField
                                            id="krapin"
                                            name="krapin"
                                            label="KRA PIN"
                                            type="text"
                                            variant="filled"
                                            value={values.krapin}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            sx={{ mb: 2, width: '100%', padding: '5px' }}
                                            error={touched.krapin && Boolean(errors.krapin)}
                                            helperText={touched.krapin && errors.krapin}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={4}>
                                        <TextField
                                            id="is_active"
                                            name="is_active"
                                            label="Status"
                                            type="text"
                                            variant="filled"
                                            value={values.is_active}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            sx={{ mb: 2, width: '100%', padding: '5px' }}
                                            error={touched.is_active && Boolean(errors.is_active)}
                                            helperText={touched.is_active && errors.is_active}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={4}>
                                        <TextField
                                            id="role"
                                            name="role"
                                            label="Access Level"
                                            type="text"
                                            variant="filled"
                                            value={values.role}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            sx={{ mb: 2, width: '100%', padding: '5px' }}
                                            error={touched.role && Boolean(errors.role)}
                                            helperText={touched.role && errors.role}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={4}>
                                        <TextField
                                            id="address_id"
                                            name="address_id"
                                            label="Address ID"
                                            type="text"
                                            variant="filled"
                                            value={values.address_id}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            sx={{ mb: 2, width: '100%', padding: '5px' }}
                                            error={touched.address_id && Boolean(errors.address_id)}
                                            helperText={touched.address_id && errors.address_id}
                                        />
                                    </Grid>

                                    <Grid item xs={12} sm={4}>
                                        <FormControl fullWidth>
                                            <InputLabel id="Role">Role</InputLabel>
                                            <Select
                                                labelId="Role"
                                                id="role"
                                                value={role}
                                                label="Role"
                                                onChange={handleChange}
                                                defaultValue='Farmer'
                                                backgroundColor={colors.primary[400]}
                                            >
                                                <MenuItem value={1}>Admin</MenuItem>
                                                <MenuItem value={2}>Agent</MenuItem>
                                                <MenuItem value={3}>Vet Doctor</MenuItem>
                                                <MenuItem value={4}>Farmer</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </Grid>


                                    <Grid item lg={6} md={6} xs={12} sm={4}>
                                        <Button
                                            type="submit"
                                            variant="contained"
                                            sx={{ width: "20rem" }}
                                            color="secondary">
                                            Submit
                                        </Button>
                                    </Grid>

                                </Grid>



                            </Box>
                        </form>
                    )}
                </Formik>

            </Modal>
        </Box>
    );
}
