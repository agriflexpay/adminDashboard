import * as React from 'react';
import { Box, Typography} from "@mui/material";
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import { useTheme } from "@mui/material";
import BasicModal from "./EditorModal"
import { tokens } from "../../theme";
import {
  GridRowModes,
  DataGrid,
  GridToolbar,
  GridToolbarContainer,
  GridActionsCellItem,
  GridRowEditStopReasons,
} from '@mui/x-data-grid';
import {
  randomCreatedDate,
  randomTraderName,
  randomId,
  randomArrayItem,
} from '@mui/x-data-grid-generator';
import {useQuery} from "react-query";
import { useAuth } from "../../AUTH/AuthContext";
const roles = ['Admin', 'Agent', 'Farmer','Vet Doctor'];
const randomRole = () => {
  return randomArrayItem(roles);
};

function EditToolbar(props) {
  const { setRows, setRowModesModel } = props;

  const handleClick = () => {
    const id = randomId();
    setRows((oldRows) => [...oldRows, { id, name: '', age: '', isNew: true }]);
    setRowModesModel((oldModel) => ({
      ...oldModel,
      [id]: { mode: GridRowModes.Edit, fieldToFocus: 'name' },
    }));
  };

  return (
    <GridToolbarContainer>
      <Button color="primary" startIcon={<AddIcon />} onClick={handleClick}>
        Add record
      </Button>
        <GridToolbar />
    </GridToolbarContainer>
  );
}

export default function FullFeaturedCrudGrid() {
  const { axiosInstance } = useAuth();
  const [open, setOpen] = React.useState(false);
  const [userdata, setUserdata]= React.useState({})
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleSaveData=(data)=>setUserdata(data)
    const fetchUsers = async () => {
        try {
            const response = await axiosInstance.get("/api/user/fetchAll")
            return response
        } catch (error) {
            console.log(error);
        }
      }
    
      const { data,error } = useQuery("users", fetchUsers);
    
    const   initialRows = data?.data?.data||[]
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
  const [rows, setRows] = React.useState(initialRows);
  const [rowModesModel, setRowModesModel] = React.useState({});

  const handleRowEditStop = (params, event) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  const handleEditClick = ({id,data}) => () => {
    setUserdata({data,id})
    handleOpen(); // Open the modal
    
  };

  const handleSaveClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };

  const handleDeleteClick = (id) => () => {
    setRows(rows.filter((row) => row.id !== id));
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
  { field: "id", headerName: "ID", flex: 1 },
  {field:"fname",headerName:"First Name",flex:1},
  {field:"lname",headerName:"Last Name",flex:1},
  {field:"email",headerName:"Email",flex:1},
  {field:"national_id",headerName:"National ID",flex:1},
  {field:"krapin",headerName:"KRA PIN",flex:1},
  {field:"phone",headerName:"Phone",flex:1},
  //{field:"is_active",headerName:"Status",flex:1},
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
                : colors.redAccent[500]
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
//   {field:"createdAt",headerName:"Created At",flex:1},
//  {field:"updatedAt",headerName:"Updated At",flex:1},
 // {field:"address_id",headerName:"Address ID",flex:1},
// {field:"is_account_verified",headerName:"Account Verified",flex:1},
 //{field:"latitude",headerName:"Latitude",flex:1},
 //{field:"longitude",headerName:"Longitude",flex:1},
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Actions',
      width: 100,
      cellClassName: 'actions',
      getActions: ({ id }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

        if (isInEditMode) {
          return [
            <GridActionsCellItem
              icon={<SaveIcon />}
              label="Save"
              sx={{
                color: 'primary.main',
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
            //map through the data and return the id of the selected row
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
        ];
      },
    },
  ];

  return (
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
          handleOpen={handleOpen}
          handleClose={handleClose}
          userdata={userdata}
          handleSaveData={handleSaveData}
          // Pass any additional props needed by BasicModal
        />
      )}
    </Box>
  );
}