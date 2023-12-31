import { Box, Typography, useTheme } from "@mui/material";
import { 
  DataGrid ,
  GridToolbar,
  GridRowModes,
  GridToolbarContainer,
  GridActionsCellItem,
  GridRowEditStopReasons} from "@mui/x-data-grid";
import { tokens } from "../../theme";
import ToggleOffOutlinedIcon from '@mui/icons-material/ToggleOffOutlined';
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import ToggleOnOutlinedIcon from '@mui/icons-material/ToggleOnOutlined';
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import Header from "../../components/Header";
import {useQuery} from "react-query";
import { useAuth } from "../../AUTH/AuthContext";
const Team = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { axiosInstance } = useAuth();
  const fetchUsers = async () => {
    try {
        const response = await axiosInstance.get("/api/user/fetchAll")
        return response
    } catch (error) {
        console.log(error);
    }
  }

  const { data,error } = useQuery("users", fetchUsers);

 const rows = data?.data?.data||[]
  const columns= [
  //{ field: "id", headerName: "ID", flex: 0.5 },
  {field:"fname",headerName:"First Name",flex:1},
  {field:"lname",headerName:"Last Name",flex:1},
  {field:"email",headerName:"Email",flex:1},
  {field:"national_id",headerName:"National ID",flex:1},
 // {field:"krapin",headerName:"KRA PIN",flex:1},
  {field:"phone",headerName:"Phone",flex:1},
  {field:"is_active",headerName:"Status",flex:1,
      renderCell: ({ row: { is_active } }) => {
        return (
          <Box
            width="60%"
            m="0 auto"
            p="5px"
            display="flex"
            justifyContent="center"
            backgroundColor={
              is_active ===true
                ? colors.greenAccent[600]
                : is_active ===false
                ? colors.redAccent[500]
                : colors.greenAccent[700]
            }
            borderRadius="4px"
          >
            {is_active === true && <ToggleOffOutlinedIcon />}
            {is_active === false && <ToggleOnOutlinedIcon />}
            <Typography color={colors.grey[100]} sx={{ ml: "2px" }}>
              {is_active==true?"Active":is_active==false?"Inactive":"Suspended"}
            </Typography>
          </Box>
        );
      }
},
 {field:"role",headerName:"Access Level",flex:1,
      renderCell: ({ row: { role } }) => {
        return (
          <Box
            width="60%"
            m="0 auto"
            p="5px"
            display="flex"
            justifyContent="center"
            backgroundColor={
              role === "1"
                ? colors.greenAccent[600]
                : role === "2"
                ? colors.greenAccent[700]
                : colors.grey[700]
            }
            borderRadius="4px"
          >
            {role === "1" && <AdminPanelSettingsOutlinedIcon />}
            {role === "2" && <SecurityOutlinedIcon />}
            {role === "3" && <LockOpenOutlinedIcon />}
            <Typography color={colors.grey[100]} sx={{ ml: "2px" }}>
              {role==1?"Admin":role==2?"Manager":"User"}
            </Typography>
          </Box>
        );
      }},
  //{field:"createdAt",headerName:"Created At",flex:1},
 // {field:"updatedAt",headerName:"Updated At",flex:1},
 // {field:"address_id",headerName:"Address ID",flex:1},
 // {field:"is_account_verified",headerName:"Account Verified",flex:1},
 // {field:"latitude",headerName:"Latitude",flex:1},
//  {field:"longitude",headerName:"Longitude",flex:1},
  ]
 

  return (
    <Box m="20px">
      <Header
       title="TEAM" 
       subtitle="Managing the Team Members
       " />
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
  );
};

export default Team;
