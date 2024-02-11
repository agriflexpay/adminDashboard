import * as React from "react";
import { Box, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";
import VerifiedUserOutlinedIcon from "@mui/icons-material/VerifiedUserOutlined";
import SupervisedUserCircleOutlinedIcon from "@mui/icons-material/SupervisedUserCircleOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import { useTheme } from "@mui/material";
import ToggleOffOutlinedIcon from "@mui/icons-material/ToggleOffOutlined";
import ToggleOnOutlinedIcon from "@mui/icons-material/ToggleOnOutlined";
import BasicModal from "./EditorModal";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import {
  GridRowModes,
  DataGrid,
  GridToolbar,
  GridToolbarContainer,
  GridActionsCellItem,
  GridRowEditStopReasons,
} from "@mui/x-data-grid";
import { randomId, randomArrayItem } from "@mui/x-data-grid-generator";
import { useQuery } from "react-query";
import { useAuth } from "../../AUTH/AuthContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function EditToolbar(props) {
  const { setRows, setRowModesModel } = props;

  const handleClick = () => {
    const id = randomId();
    setRows((oldRows) => [...oldRows, { id, name: "", age: "", isNew: true }]);
    setRowModesModel((oldModel) => ({
      ...oldModel,
      [id]: { mode: GridRowModes.Edit, fieldToFocus: "name" },
    }));
  };

  return (
    <GridToolbarContainer>
      {/* <Button color="primary" startIcon={<AddIcon />} onClick={handleClick}>
        Add record
      </Button> */}
      <GridToolbar />
    </GridToolbarContainer>
  );
}

export default function ManageTeam() {
  const { axiosInstance, logout, showToastMessage } = useAuth();
  const [open, setOpen] = React.useState(false);
  const [userdata, setUserdata] = React.useState({});
  const [success, setSuccess] = React.useState(null);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleSaveData = (data) => setUserdata(data);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const fetchUsers = async () => {
    try {
      const response = await axiosInstance.get("/api/user/fetchAll");
      return response;
    } catch (error) {
      if (error?.response?.status === 403) {
        logout();
      }
    }
  };

  let { data, error, refetch } = useQuery("users", fetchUsers);
  let initialRows = data?.data?.data || [];

  React.useEffect(() => {
    setRows(data?.data?.data || []);
    if (success) {
      setSuccess(false), refetch();
    }
  }, [data, success]);

  const [rows, setRows] = React.useState(initialRows);
  const [rowModesModel, setRowModesModel] = React.useState({});

  const handleRowEditStop = (params, event) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  const handleEditClick =
    ({ id, data }) =>
    () => {
      setUserdata({ data, id });
      handleOpen();
    };

  const handleSaveClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };

  const handleDeleteClick =(id) =>() => {
      axiosInstance
        .delete(`/api/user/delete/${id}`, {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        })
        .then((response) => {
          if (response.status === 200) {
            showToastMessage("User Deleted Successfully")
            refetch();
          }
        }).catch((error) => {
          if (error?.response?.status === 403) {
            logout();
          }
        }
        );
    };

  const handleActivateClick =({ id, user_data }) =>
      async () => {
      let touggle;
      user_data?.is_active === true ? (touggle = false) : (touggle = true);
      const data = {
        is_active: touggle,
      };
      await axiosInstance
        .put(`/api/user/update/${id}`, data, {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        })
        .then((response) => {
          if (response.status === 200) {
            showToastMessage("User Activated Successfully");
            refetch();
          }
        })
        .catch((error) => {
          if (error?.response?.status === 403) {
            logout();
          }
        });
    };

  const handleCancelClick = (id) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });

    const editedRow = rows.find((row) => row.id === id);
    if (editedRow.isNew) {
      setRows(rows.filter((row) => row.id !== id));
    }
  };

  const processRowUpdate = (newRow) => {
    const updatedRow = { ...newRow, isNew: false };
    setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
    return updatedRow;
  };

  const handleRowModesModelChange = (newRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  const columns = [
    // { field: "id", headerName: "ID", flex: 1 },
    { field: "fname", headerName: "First Name", flex: 1 },
    { field: "lname", headerName: "Last Name", flex: 1 },
    { field: "email", headerName: "Email", flex: 1 },
    { field: "national_id", headerName: "National ID", flex: 1 },
    { field: "krapin", headerName: "KRA PIN", flex: 1 },
    { field: "phone", headerName: "Phone", flex: 1 },
    {
      field: "is_active",
      headerName: "Status",
      flex: 1,
      renderCell: ({ row: { is_active } }) => {
        return (
          <Box
            width="60%"
            m="0 auto"
            p="5px"
            display="flex"
            justifyContent="center"
            color={
              is_active === true
                ? colors.greenAccent[600]
                : is_active === false
                ? colors.redAccent[400]
                : null
            }
            borderRadius="4px"
          >
            {is_active === true &&<ToggleOnOutlinedIcon />}
            {is_active === false &&  <ToggleOffOutlinedIcon />}
            <Typography color={colors.grey[100]} sx={{ ml: "2px" }}>
              {is_active == true
                ? "Active"
                : is_active == false
                ? "Inactive"
                : "Suspended"}
            </Typography>
          </Box>
        );
      },
    },
    {
      field: "role",
      headerName: "Access Level",
      flex: 1,
      renderCell: ({ row: { role } }) => {
        return (
          <Box
            width="60%"
            m="0 auto"
            p="5px"
            display="flex"
            justifyContent="center"
            color={
              role === "1"
                ? colors.redAccent[400]
                : role === "2"
                ? colors.greenAccent[500]
                : role === "3"
                ? colors.blueAccent[500]
                : colors.blueAccent[500]
            }
            borderRadius="4px"
          >
            {role === "1" && <SecurityOutlinedIcon />}
            {role === "2" && <VerifiedUserOutlinedIcon />}
            {role === "3" && <SupervisedUserCircleOutlinedIcon />}
            {role === "4" && <LockOpenOutlinedIcon />}
            <Typography color={colors.grey[100]} sx={{ ml: "2px" }}>
              {role == 1
                ? " Agency"
                : role == 2
                ? " Agent"
                : role == 3
                ? " Vet Doctor"
                : " Farmer"}
            </Typography>
          </Box>
        );
      },
    },
    //    {field:"createdAt",headerName:"Created At",flex:1},
    //   {field:"updatedAt",headerName:"Updated At",flex:1},
    //   {field:"address_id",headerName:"Address ID",flex:1},
    //  {field:"is_account_verified",headerName:"Account Verified",flex:1},
    //  {field:"latitude",headerName:"Latitude",flex:1},
    //  {field:"longitude",headerName:"Longitude",flex:1},
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: 100,
      cellClassName: "actions",
      getActions: ({ id }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

        if (isInEditMode) {
          return [
            <GridActionsCellItem
              icon={<SaveIcon />}
              label="Save"
              sx={{
                color: "primary.main",
              }}
              onClick={handleSaveClick(id)}
            />,
            <GridActionsCellItem
              icon={<CancelIcon />}
              label="Cancel"
              className="textPrimary"
              onClick={handleCancelClick(id)}
              color="inherit"
            />,
          ];
        }

        return [
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            onClick={handleEditClick({
              id,
              data: rows.find((row) => row.id === id),
            })}
            color="inherit"
          />,
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={handleDeleteClick(id)}
            color="inherit"
          />,
          <GridActionsCellItem
            icon={<ToggleOnOutlinedIcon />}
            label="Activate"
            onClick={handleActivateClick({
              id,
              user_data: rows.find((row) => row.id === id),
            })}
            color="inherit"
          />,
        ];
      },
    },
  ];

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
       title="TEAM" 
       subtitle="Managing the Team Members
       " />
             <Box
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
          editMode="row"
          rowModesModel={rowModesModel}
          onRowModesModelChange={handleRowModesModelChange}
          onRowEditStop={handleRowEditStop}
          processRowUpdate={processRowUpdate}
          slots={{
            toolbar: EditToolbar,
          }}
          slotProps={{
            toolbar: { setRows, setRowModesModel },
          }}
        />
        {/* Render the BasicModal component when open state is true */}
        {open && (
          <BasicModal
            open={open}
            setSuccess={setSuccess}
            handleOpen={handleOpen}
            handleClose={handleClose}
            userdata={userdata}
            handleSaveData={handleSaveData}
            // Pass any additional props needed by BasicModal
          />
        )}
      </Box>
      </Box>

    </>
  );
}
