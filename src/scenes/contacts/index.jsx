import { Box } from "@mui/material";
import { DataGrid, GridToolbar} from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import { useTheme } from "@mui/material";
import {useQuery} from "react-query";
import { useAuth } from "../../AUTH/AuthContext";

const Contacts = () => {
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
 const columns=[
 // { field: "id", headerName: "ID", flex: 0.5 },
  {field:"fname",headerName:"First Name",flex:1},
  {field:"lname",headerName:"Last Name",flex:1},
  {field:"email",headerName:"Email",flex:1},
  {field:"national_id",headerName:"National ID",flex:1},
  //{field:"krapin",headerName:"KRA PIN",flex:1},
  {field:"phone",headerName:"Phone",flex:1},
  //{field:"is_active",headerName:"Status",flex:1},
 // {field:"role",headerName:"Role",flex:1},
  //{field:"createdAt",headerName:"Created At",flex:1},
 // {field:"updatedAt",headerName:"Updated At",flex:1},
  //{field:"address_id",headerName:"Address ID",flex:1},
 // {field:"is_account_verified",headerName:"Account Verified",flex:1},
 // {field:"latitude",headerName:"Latitude",flex:1},
//  {field:"longitude",headerName:"Longitude",flex:1},
 ]
  return (
    <Box m="20px">
      <Header
        title="CONTACTS"
        subtitle="List of Contacts for Future Reference"
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
  );
};

export default Contacts;
