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
const Applications = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { axiosInstance, logout, showToastMessage } = useAuth();
  const { user } = useAuth();
  const [Plandata, setPlanData] = useState([]);


  const { refetch: data } = useQuery(
    "plans",
    async () => {
      const response = await PlanService.fetchPlanByAgency({
        axiosInstance: axiosInstance,
        agency_uuid: user?.user?.Agency?.id
      });
      return response;
    },
    {
      onSuccess: (data) => {
        setPlanData(()=>{
          return [...data]
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
  
  const handleDelete = async (id) => {
    const response = await PlanService.deletePlan({
      axiosInstance:axiosInstance,
      id:id})
    if (response===1) {
      showToastMessage("Plan Deleted Successfully", "success");
      data()
    } else {
      showToastMessage("Plan Deletion Failed", "error");
    }
  }

  const rows = (Plandata && Plandata.map((plan) => {
    return {
      id: plan.id,
      name: plan?.KukuPlan?.name,
      lname: plan.sales,
      initial_amount: plan?.KukuPlan?.amount,
      time: plan?.KukuPlan?.duration,
      phaone: plan.projected_profit,
      createdAt: plan.createdAt,
      Interest_rate: plan?.KukuPlan?.interest_rate

    }
  }
  )
  ) || []

  const columns = [
    { field: "name", headerName: "Plan Name", flex: .5 },
    { field: "sales", headerName: "Sales", flex: .5 },
    { field: "initial_amount", headerName: "Initial Amount", flex: .5 },
    { field: "phaone", headerName: "Projected Profit", flex: .5 },
    { field: "time", headerName: "Duration (months)", flex: .5 },
    { field: "createdAt", headerName: "CreatedAt", flex: 1 },
    { field: "Interest_rate", headerName: "% Interest Rate(pa)", flex: .5 },
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
