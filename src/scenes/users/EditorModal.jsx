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
import {useQuery} from "react-query";
import { useAuth } from "../../AUTH/AuthContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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

export default function BasicModal({ open, handleClose, userdata,setSuccess}) {
    const theme = useTheme();
  
    const { axiosInstance,showToastMessage,logout  } = useAuth();
    const colors = tokens(theme.palette.mode);
    const [location, setLocation] = React.useState(null);
    React.useEffect(() => {
        const getLocation = () => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        const { latitude, longitude } = position.coords;
                        setLocation({ latitude, longitude });
                    },
                    (error) => {
                        console.error('Error getting location:', error.message);
                    }
                );
            } else {
                console.error('Geolocation is not supported by this browser.');
            }
        };

        getLocation();
    }, [])

    const fetchlocations = async () => {
        try{
            const response = await axiosInstance.get("/api/address")
            return response
        }
        catch(error){
            console.log(error?.response?.status);
        }

    }
    const { data } = useQuery("locations", fetchlocations);
    //map through the data and return the object with the id=userdata?.data?.Address
    const Address_data= data?.data?.data?.map((item) => {
        if (item.id == userdata?.data?.Address?.id) {
            return item
        }
    })
    //console.log(Address_data)

    const initialValues = {
        email: userdata?.data?.email || '',
        firstname: userdata?.data?.fname || '',
        lastname: userdata?.data?.lname || '',
        phone: userdata?.data?.phone || '',
        national_id: userdata?.data?.national_id || '',
        krapin: userdata?.data?.krapin || '',
        is_active: userdata?.data?.is_active || false,
        role: userdata?.data?.role || '',
        address_id: userdata?.data?.Address?.id|| '',
        is_account_verified: userdata?.data?.is_account_verified || false,
        latitude:  location?.latitude || 0o0,
        longitude: location?.longitude || 0o0,

    };
    const handleFormSubmit = async (values, { setSubmitting }) => {
        const data = {
            email: values.email,
            fname: values.firstname,
            lname: values.lastname,
            phone: values.phone,
            national_id: values.national_id,
            krapin: values.krapin,
            role: values.role,
            address_id: values.address_id,
            is_account_verified: values.is_account_verified,
            latitude: location?.latitude || 0o0,
            longitude: location?.longitude || 0o0,
        };
        //send the data to the backend
        await axiosInstance.put(`/api/user/update/${userdata.id}`, data, {
            headers: {
                'Content-Type': 'application/json',
            },
            withCredentials: true,
        })
            .then((res) => {
                if (res.status === 200) {
                    handleClose()
                    setSuccess(true)
                    showToastMessage("User Updated Successfully","success")
                }
            })
            .catch((err) => {
                console.log(err);
                logout()
            });
       
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
                                        sx={{ width: '100%' }}

                                    >
                                        <Header title="UPDATE USER" subtitle="Update user  Profile,change roles and addresses" /><br />
                                   
                                       
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
                                        <FormControl fullWidth >
                                            <InputLabel id="role">Role</InputLabel>
                                            <Select
                                                labelId="role"
                                                id="role"
                                                name='role'
                                                value={values.role}
                                                label="Role"
                                                onChange={handleChange}
                                                sx={{ mb: 2, width: '100%', paddingRight: '10px'}}
                                                error={touched.role && Boolean(errors.role)}
                                            >
                                                <MenuItem sx={{backgroundColor:'Highlight'}} value={1}>Admin</MenuItem>
                                                <MenuItem sx={{backgroundColor:'Highlight'}} value={2}>Agent</MenuItem>
                                                <MenuItem sx={{backgroundColor:'Highlight'}} value={3}>Vet Doctor</MenuItem>
                                                <MenuItem sx={{backgroundColor:'Highlight'}} value={4}>Farmer</MenuItem>
                                            </Select>
                                            {touched.role && errors.role && (
                                                <p style={{ color: 'red' }}>{errors.role}</p>
                                            )}
                                        </FormControl>
                                    </Grid>

                                    <Grid item xs={12} sm={4}>
                                        <FormControl fullWidth >
                                            <InputLabel id="address_id">Home County</InputLabel>
                                            <Select
                                                   id="address_id"
                                                   name="address_id"
                                                   label="Home County"
                                                   type="text"
                                                   variant="filled"
                                                   value={values.address_id}
                                                   onChange={handleChange}
                                                   onBlur={handleBlur}
                                                   sx={{ mb: 2, width: '100%', padding: '5px' }}
                                                   error={touched.address_id && Boolean(errors.address_id)}
                                                   helperText={touched.address_id && errors.address_id}
                                            >
                                                {
                                                    data?.data?.data?.map((item) => (
                                                        <MenuItem sx={{backgroundColor:'Highlight'}} value={item.id} key={item.id}>{item.county}</MenuItem>
                                                    ))
                                                }
                                            </Select>
                                            {touched.role && errors.role && (
                                                <p style={{ color: 'red' }}>{errors.role}</p>
                                            )}
                                        </FormControl>
                                    </Grid>

                                    <Grid item xs={12} sm={4}>
                                        <TextField
                                            id="longitude"
                                            name="longitude"
                                            label="Longitude"
                                            type="number"
                                            variant="filled"
                                            value={values.longitude}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            sx={{ mb: 2, width: '100%', padding: '5px' }}
                                            error={touched.longitude && Boolean(errors.longitude)}
                                            helperText={touched.longitude && errors.longitude}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={4}>
                                        <TextField
                                            id="latitude"
                                            name="latitude"
                                            label="Latitude"
                                            type="number"
                                            variant="filled"
                                            value={values.latitude}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            sx={{ mb: 2, width: '100%', padding: '5px' }}
                                            error={touched.latitude && Boolean(errors.latitude)}
                                            helperText={touched.latitude && errors.latitude}
                                        />
                                    </Grid>

                                    <Grid item lg={6} md={6} xs={12} sm={4}>
                                        <Button
                                            type="submit"
                                            variant="contained"
                                            sx={{ width: "20rem", margin: "10px"}}
                                            color="secondary"
                                        >

                                            Submit
                                        </Button>
                                        

                                        <Button
                                            type="button"
                                            variant="contained"
                                            sx={{ width: "20rem", margin: "10px"}}
                                            color="secondary"
                                            onClick={handleClose}
                                        >

                                            Cancel
                                        </Button>
                                    </Grid>
                                    <Grid item lg={6} md={6} xs={12} sm={4}>

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
