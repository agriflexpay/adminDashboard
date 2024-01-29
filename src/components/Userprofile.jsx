import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { tokens } from "../theme";
import { IconButton, useTheme } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useAuth } from '../AUTH/AuthContext';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import VerifiedUserOutlinedIcon from "@mui/icons-material/VerifiedUserOutlined";
import SupervisedUserCircleOutlinedIcon from "@mui/icons-material/SupervisedUserCircleOutlined";

export default function BasicModal({ open, user, logout, handleClose }) {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const isNonMobile = useMediaQuery(theme.breakpoints.up("sm"));
  const role = user.user.role
  return (
    <div>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box

          sx={{
            "& > div": { gridColumn: isNonMobile ? "span 3" : "span 4" },
            backgroundColor: colors.primary[400],
            borderRadius: "3px",
            p: 2,
            position: "absolute",
            top: "20%",
            left: "85%",
            mt: `${isNonMobile ? "1%" : "20%"}`,
            transform: "translate(-50%, -50%)",
          }}

          m={"auto"}
        >
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <img
              alt="Upload Image"
              width="100px"
              height="100px"
              src={`https://cdn.vectorstock.com/i/preview-1x/76/28/unknown-person-user-icon-for-web-vector-34757628.webp`}
              style={{ cursor: "pointer", borderRadius: "50%" }}
            />

            <Box>
              <Button
                sx={{
                  backgroundColor: colors.blueAccent[700],
                  color: colors.grey[100],
                  fontSize: "14px",
                  fontWeight: "bold",
                  padding: "10px 20px",
                  ml: "100px"
                }}
                onClick={logout}
              >
                <LogoutOutlinedIcon sx={{ mr: "10px" }} />
                Logout
              </Button>
            </Box>
          </Box>
          <Box
            display="grid"
            gridTemplateColumns="repeat(2, 1fr)"
            gridAutoRows="140px"
            gap="20px"
          >
            <Box
              display="grid"
              gridColumn="span 1"
              gridTemplateColumns="repeat(1, 1fr)"
              backgroundColor={colors.primary[400]}
              alignItems="center"
              justifyContent="center"
            >
              <Box
                gridColumn={"span 1"}
                display="flex"
                justifyContent="center"
                alignItems="left"
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
              <Box
                gridColumn={"span 1"}
                display="flex"
                justifyContent="left"
                alignItems="left"
              >
                <Typography color={colors.grey[100]} sx={{ ml: "2px" }}>
                  Name: {user.user.fname} {user.user.lname}
                </Typography>

              </Box>
            </Box>
            <Box
              display="grid"
              gridColumn="span 1"
              gridTemplateColumns="repeat(1, 1fr)"
              backgroundColor={colors.primary[400]}
              alignItems="center"
              justifyContent="center"
            >
              <Box
                gridColumn={"span 1"}
                display="flex"
                justifyContent="left"
                alignItems="left"
              >
                <Typography
                  variant="h6"
                  color={colors.grey[100]}
                  fontWeight="bold"
                  sx={{ m: "10px 0 0 0" }}
                >
                  Email: {user.user.email}
                </Typography>
              </Box>
              <Box
                gridColumn={"span 1"}
                display="flex"
                justifyContent="left"
                alignItems="left"
              >
                <Typography
                  variant="h6"
                  color={colors.grey[100]}
                  fontWeight="bold"
                  sx={{ m: "10px 0 0 0" }}
                >
                  Location: {user.user.Address.county}
                </Typography>
              </Box>
            </Box>

          </Box>

        </Box>
      </Modal>
    </div>
  );
}
