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
import KukuService from "../../../API/Data/kuku";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";


const Kuku = () => {
  const theme = useTheme();
  const { user } = useAuth()
  const { axiosInstance, showToastMessage, logout } = useAuth();
  const colors = tokens(theme.palette.mode);
  const [kukuPlans, setKukuPlans] = useState([]);
  const [expanded, setExpanded] = useState(false);
  const [showMessage, setShowMessage] = useState(true);
  const [message, setMessage] = useState("");
  const {refetch:data}= useQuery(
    "kukuPlans",
    async () => {
      const response = await KukuService.getKukuPlans(axiosInstance);
      return response;
    },
    {
      onSuccess: (data) => {
        setKukuPlans(data);
        
      },
      onError: (error) => {
        console.log(error);
        
      },
    }
  )
  useEffect(() => {
    data()
  }
  , []);

  if (showMessage ) {
    showToastMessage(message)
    setShowMessage(false)
  }

const kukuPlan =()=>{
  if(kukuPlans.length === 0){
    return (
      <Typography variant="h5" sx={{color: `${theme.palette.mode === "dark" ? colors.primary[200] : colors.primary[500]}`}}>
        No Kuku Plan Available
      </Typography>
    )
  }
  else{
    return  kukuPlans.map((plan) => (
      <KukuCard
        axiosInstance={axiosInstance}
        showToastMessage={showToastMessage}
        logout={logout}
        sx={{width: 'fit-content'}}
        expanded={expanded}
        setExpanded={setExpanded}
        key={plan.id}
        id={plan.id}
        name={plan.name}
        description={plan.description}
        amount={plan.amount}
        duration={plan.duration}
        interest_rate={plan.interest_rate}
        vendor_id={plan.vendor_id}
        type={plan.type}
        puporse={plan.puporse}
        maturity={plan.maturity}
        averageEggProduction={plan.averageEggProduction}
        meatProduction={plan.meatProduction}
        averageWeight={plan.averageWeight}
        feeding={plan.feeding}
        setting={plan.setting}
        declineinProduction={plan.declineinProduction}
        diseaseResistance={plan.diseaseResistance}
        createdAt={plan.createdAt}
        updatedAt={plan.updatedAt}
        refetch={data}
        setShowMessage={setShowMessage}
        setMessage={setMessage}
      />
      
    ))
  }
 
}
  
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
           <Box
           display="grid"
            gap="20px"
            gridTemplateColumns="repeat(3, minmax(0, 1fr))"
            sx={{
              width: "100%"
            }}
          >
            
             { 
              kukuPlan()
            }
          </Box>
          </AccordionDetails>
        </Accordion>
      </Box>
    </>
  );
};



export default Kuku
