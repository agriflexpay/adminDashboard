import { Box, Button, TextField } from "@mui/material";
import Header from "../../../components/Header";
import { useTheme } from "@mui/material";
import { useAuth } from "../../../AUTH/AuthContext";
import { tokens } from "../../../theme";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { ToastContainer, toast } from "react-toastify";
import KukuCard from "./KuKuCard";
import KukuPlan from "./CreateForm"

const Kuku = () => {
  const theme = useTheme();
  const { user } = useAuth()
  const { axiosInstance, showToastMessage, logout } = useAuth();
  const colors = tokens(theme.palette.mode);


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
        <Header title="CREATE AND MANAGE KUKU PLANS" subtitle="Create a New Kuku Plan Based on Predefined Information" />
        <Accordion
         defaultExpanded={false}
          sx={{
             backgroundColor: `${theme.palette.mode === "dark" ? colors.primary[500] : null}`,
             mt: "10px",
             mb: "20px",     
            }}
        >
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h5">
              Create a New Kuku Plan
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <KukuPlan />
          </AccordionDetails>
        </Accordion>
        <Accordion 
        defaultExpanded={true} 
        sx={{ 
          backgroundColor: `${theme.palette.mode === "dark" ? colors.primary[500] : null}`,
          mt: "10px",
          mb: "10px"
          }}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}
          >
            <Typography variant="h5">
              Available Kuku Plans
            </Typography>
          </AccordionSummary>
          <AccordionDetails >
            <KukuCard />
          </AccordionDetails>
        </Accordion>
      </Box>
    </>
  );
};



export default Kuku
