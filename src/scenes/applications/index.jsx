import { Box, Typography, useTheme } from "@mui/material";
import {
  DataGrid,
  GridToolbar,
  GridRowModes,
  GridToolbarContainer,
  GridActionsCellItem,
  GridRowEditStopReasons
} from "@mui/x-data-grid";
import { tokens } from "../../theme";
import ToggleOffOutlinedIcon from '@mui/icons-material/ToggleOffOutlined';
import ToggleOnOutlinedIcon from '@mui/icons-material/ToggleOnOutlined';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import { ToastContainer, toast } from "react-toastify";
import Header from "../../components/Header";
import { useQuery } from "react-query";
import { useAuth } from "../../AUTH/AuthContext";
import  PlanService  from "../../API/Data/plans/index"
import { useEffect, useState } from "react";
import PreviewOutlinedIcon from '@mui/icons-material/PreviewOutlined';
import bookingsService from "../../API/Data/bookings/index";
const Applications = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { axiosInstance, logout, showToastMessage } = useAuth();
  const { user } = useAuth();
  const [ApplicationData, setApplicationData] = useState([]);

  const { refetch: data } = useQuery(
    "bookings",
    async () => {
      const response = await bookingsService.getBookingsByAgeny(  axiosInstance,
        user?.user?.Agency?.id);
      return response;
    },
    {
      onSuccess: (data) => {
        setApplicationData(()=>{
          console.log(data)
          return [...data.data.data]
        });
      },
      onError: (error) => {
        console.log(error);
      },
    }
  )


  useEffect(() => {
    data()
  }, []);
  

  console.log(ApplicationData)
  const rows = (ApplicationData && ApplicationData.map((data) => {
    return {
      id: data.id,
      plan_uuid: data.Plan.id,
      famer:`${data.User.first_name} ${data.User.last_name}`,
      phone: data.User.phone,
      email: data.User.email,
      avatar: data.User.avatar,
      createdAt: data.createdAt,
      national_id: data.User.national_id,
      krapin: data.User.krapin,
      plan_name: data.Plan.KukuPlan.name,
      amount: data.Plan.KukuPlan.amount,


    }
  }
  )
  ) || []

  const columns = [
    { field: "id", headerName: "ID", flex: 1 },
    { field: "plan_uuid", headerName: "Plan ID", flex: 1 },
    { field: "famer", headerName: "Farmer", flex: 1 },
    { field: "phone", headerName: "Phone", flex: 1 },
    { field: "email", headerName: "Email", flex: 1 },
    { field: "avatar", headerName: "Avatar", flex: 1 },
    { field: "createdAt", headerName: "Created At", flex: 1 },
    { field: "national_id", headerName: "National ID", flex: 1 },
    { field: "krapin", headerName: "KRA PIN", flex: 1 },
    { field: "plan_name", headerName: "Plan Name", flex: 1 },
    { field: "amount", headerName: "Amount", flex: 1 },
   
   
   
   
   
    {
      field: "actions",
      headerName: "Actions",
      type: "actions",
      flex: 1,
      cellClassName: "actions",
      getActions: ({ id }) => {
        return [
          <GridActionsCellItem
            icon={<DeleteIcon />}
            onClick={() => {
              handleDelete(id);
            
            }
            }
            label="Delete"
          />
          ,
          <GridActionsCellItem
            icon={<PreviewOutlinedIcon />}
            label="Edit"
          />
        ]

      }
    }
  ]


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
        <Header
          title="Farmer's Applications"
          subtitle="Preview and Manage Farmer's Applications"
           />
        <Box
          m="40px 0 0 0"
          height="75vh"
          sx={{
            "& .MuiDataGrid-root": {
              border: "none",
            },
            "& .MuiDataGrid-cell": {
              borderBottom: "none",
            },
            "& .name-column--cell": {
              color: colors.greenAccent[300],
            },
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: colors.blueAccent[700],
              borderBottom: "none",
            },
            "& .MuiDataGrid-virtualScroller": {
              backgroundColor: colors.primary[400],
            },
            "& .MuiDataGrid-footerContainer": {
              borderTop: "none",
              backgroundColor: colors.blueAccent[700],
            },
            "& .MuiCheckbox-root": {
              color: `${colors.greenAccent[200]} !important`,
            },
            "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
              color: `${colors.grey[100]} !important`,
            },
          }}
        >
          <DataGrid
            rows={rows}
            columns={columns}
            components={{ Toolbar: GridToolbar }}
          />
        </Box>

      </Box>
    </>

  );
};

export default Applications;
