import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useTheme } from "@mui/material";
import { tokens } from "../../../theme";
import Popover from '@mui/material/Popover';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import UpgradeOutlinedIcon from '@mui/icons-material/UpgradeOutlined';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import ToggleOffOutlinedIcon from '@mui/icons-material/ToggleOffOutlined';
import ToggleOnOutlinedIcon from '@mui/icons-material/ToggleOnOutlined';
import { useAuth } from "../../../AUTH/AuthContext";
import PlanService from '../../../API/Data/plans';
import { useEffect, useState } from "react";



const planData = async ({ id, axios }) => {
  const response = await PlanService.getOnePlan({ id: id, axiosInstance: axios }) || []

  return response;
}
const activePlans = async ({ id, axios }) => {
  const response = await PlanService.fetchPlanByAgency({ agency_uuid: id, axiosInstance: axios });
  return response;
}


const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

const planIsActive = (plans, id) => plans.includes(id);

export default function KuKuCard({ ...props }) {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [anchorEl, setAnchorEl] = useState(null);
  const [kukuPlan, setKukuPlan] = useState([]);
  const [activePlan, setActivePlan] = useState([]);

  const data = async () => { const a = await planData({ id: props.id, axios: props.axiosInstance }); setKukuPlan(a); }
  const activeData = async () => {
    const a = await activePlans({ id: props.vendor_id, axios: props.axiosInstance });
    const active_uuids = (a??[]).map(item => { return item?.KukuPlan?.id })
    setActivePlan(active_uuids)
  }

  useEffect(() => {
    data()
    activeData()
  }, []);



  const activatePlan = async () => {
    try {
      const data = {
        plan_uuid: props.id,
        vendor_uuid: props.vendor_id,
      }
      const response = await PlanService.createPlan({ data: data, axiosInstance: props.axiosInstance });
      console.log(response);
      if (response.status === 200) {
        props.setMessage("Plan activated", "success");
        props.setShowMesssage(true);
        data()
      }
    } catch (error) {
      props.setMessage(error.response.data.message, "error");
      props.setShowMesssage(true);
    }
  }


  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };



  const handleClose = () => {
    setAnchorEl(null);
  };



  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined



  const handleExpandClick = () => {
    props.setExpanded(!props.expanded);
  };



  return (
    <Card sx={{
      bgcolor: theme.palette.mode === "dark" ? colors.blueAccent[800] : colors.grey[900]
    }}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe">
            {props?.avatar || "M"}
          </Avatar>
        }
        action={
          <IconButton aria-label="settings"  >
            <MoreVertIcon onClick={handleClick} aria-describedby={id} variant="contained" />
            <Popover
              id={id}
              open={open}
              anchorEl={anchorEl}
              onClose={handleClose}

              sx={{
                mt: "10px",
                mb: "20px",
              }}
              anchorOrigin={{
                vertical: 'center',
                horizontal: 'right',
              }}
              transformOrigin={{
                vertical: 'center',
                horizontal: 'left',
              }}
            >
              <Box
                display="grid"
                gap=".5rem"
                gridTemplateColumns="repeat(1, minmax(0, 1fr))"
                sx={{
                  bgcolor: theme.palette.mode === "dark" ? colors.blueAccent[900] : colors.grey[900],
                  width: "fit-content",
                }}>
                <Button
                  variant="contained"
                  sx={{ background: theme.palette.mode === "dark" ? colors.greenAccent[800] : colors.greenAccent[200] }}
                  startIcon={<UpgradeOutlinedIcon />}>
                  Update
                </Button>
                <Button
                  variant="contained"
                  sx={{ background: theme.palette.mode === "dark" ? colors.redAccent[600] : colors.redAccent[500] }}
                  startIcon={<DeleteForeverOutlinedIcon />}
                  onClick={() => { console.log(activePlan) }}
                >
                  Delete
                </Button>
                <Button
                  onClick={() => { kukuPlan?.data?.id ?? activatePlan() }}
                  variant="contained"
                  sx={{ background: theme.palette.mode === "dark" ? colors.blueAccent[700] : colors.blueAccent[200] }}
                  startIcon={
                    planIsActive(activePlan,kukuPlan?.data?.id) ? <ToggleOffOutlinedIcon /> : <ToggleOnOutlinedIcon />
                  }>
                  {planIsActive(activePlan,kukuPlan?.data?.id) ? "Disable" : "Enable"}
                </Button>
              </Box>
            </Popover>
          </IconButton>
        }
        title={props?.name || "Plan Name"}
        subheader={props?.createdAt || "Date"}
      />
      <CardMedia
        component="img"
        image={props.image}
        alt="Mising image please update "

      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {props?.description || "Missing description"}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
        <ExpandMore
          expand={props?.expanded}
          onClick={handleExpandClick}
          aria-expanded={props?.expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={props?.expanded} timeout="auto" unmountOnExit>
        <CardContent>

          <Typography
            variant='h4'
            color={theme.palette.mode === "dark" ? colors.greenAccent[400] : colors.blueAccent[300]}
            fontWeight={theme.typography.fontWeightBold}
            sx={{ m: "0 0 5px 0" }}
          >
            {props?.details || "Plan Detailed Description"}
          </Typography>
          <Typography paragraph>
            <span
              style={{
                color: `${theme.palette.mode === "dark" ? colors.greenAccent[400] : colors.blueAccent[300]}`,
              }}
            >Name: </span>  {props?.name || "Plan Name"}
          </Typography>
          <Typography paragraph>
            <span
              style={{
                color: `${theme.palette.mode === "dark" ? colors.greenAccent[400] : colors.blueAccent[300]}`,
              }}
            >Initial Amount: </span>
            {props?.amount || "Plan Initial Amount"}
          </Typography>
          <Typography paragraph>
            <span
              style={{
                color: `${theme.palette.mode === "dark" ? colors.greenAccent[400] : colors.blueAccent[300]}`,
              }}
            >
              Duration in Months: </span>
            {props?.duration || "Plan Duration in Months"}
          </Typography>
          <Typography paragraph>
            <span
              style={{
                color: `${theme.palette.mode === "dark" ? colors.greenAccent[400] : colors.blueAccent[300]}`,
              }}
            >
              Interest rate pa: </span>
            {props?.interest_rate || "Plan Interest rate pa"}
          </Typography>
          <Typography paragraph>
            <span
              style={{
                color: `${theme.palette.mode === "dark" ? colors.greenAccent[400] : colors.blueAccent[300]}`,
              }}
            >
              Type: </span> {props?.type || "Plan Type"}
          </Typography>
          <Typography paragraph>
            <span
              style={{
                color: `${theme.palette.mode === "dark" ? colors.greenAccent[400] : colors.blueAccent[300]}`,
              }}
            >
              Maturity in months: </span>
            {props?.maturity || "Plan Maturity in months"}
          </Typography>
          <Typography paragraph>
            <span
              style={{
                color: `${theme.palette.mode === "dark" ? colors.greenAccent[400] : colors.blueAccent[300]}`,
              }}
            >
              Average Egg production: </span>
            {props?.averageEggProduction || "Plan Average Egg production"}
          </Typography>
          <Typography paragraph>
            <span
              style={{
                color: `${theme.palette.mode === "dark" ? colors.greenAccent[400] : colors.blueAccent[300]}`,
              }}
            >
              Meat production (kg): </span>
            {props?.meatProduction || "Plan Meat production (kg)"}
          </Typography>
          <Typography paragraph>
            <span
              style={{
                color: `${theme.palette.mode === "dark" ? colors.greenAccent[400] : colors.blueAccent[300]}`,
              }}
            >
              Feeding: </span>

            {props?.feeding || "Plan Feeding"}
          </Typography>
          <Typography paragraph>
            <span
              style={{
                color: `${theme.palette.mode === "dark" ? colors.greenAccent[400] : colors.blueAccent[300]}`,
              }}
            >
              Settiing: </span>
            {props?.setting || "Plan Settiing"}
          </Typography>
          <Typography paragraph>
            <span
              style={{
                color: `${theme.palette.mode === "dark" ? colors.greenAccent[400] : colors.blueAccent[300]}`,
              }}
            >
              Decline In prodaction: </span>
            {props?.declineinProduction || "Plan Decline In prodaction"}
          </Typography>
          <Typography paragraph>
            <span
              style={{
                color: `${theme.palette.mode === "dark" ? colors.greenAccent[400] : colors.blueAccent[300]}`,
              }}
            >
              Disease Resistance: </span>
            {props?.diseaseResistance || "Plan Disease Resistance"}
          </Typography>
          <Typography paragraph>
            <span
              style={{
                color: `${theme.palette.mode === "dark" ? colors.greenAccent[400] : colors.blueAccent[300]}`,
              }}
            >
              Average Weight : </span>
            {props?.initialAmount || "Plan Average Weight"}
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
}
