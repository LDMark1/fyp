import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { tokens } from "../../../theme";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import LocalHospitalSharpIcon from '@mui/icons-material/LocalHospitalSharp';
import VaccinesSharpIcon from '@mui/icons-material/VaccinesSharp';
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import Header from "../../Charts/Header";
import LineChart from "../../Charts/LineChart";
import StatBox from "../../StatBox";
import { useState, useEffect } from "react";
import "react-pro-sidebar/dist/css/styles.css";
import Director_EPI_Sidebar from "../Director_EPI_Sidebar/Sidebar";
import { useNavigate } from "react-router-dom";
import Topbar from "../../../scenes/global/Topbar";


const baseURL = 'http://127.0.0.1:8000/countHealthCareWorkerAdmins'
const baseURL1 = 'http://127.0.0.1:8000/countHospitalForDirectorEPI'
const baseURL2 = "http://127.0.0.1:8000/countVaccineAssignedToHealthCareWorkerAdmin"; 
const baseURL3 = "http://127.0.0.1:8000/countVaccineAssignedToHospital"; 
const baseURL4 = "http://127.0.0.1:8000/savevac";

const Director_EPI_Dashboard = (props) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isSidebar, setIsSidebar] = useState(true);

  const navigate = useNavigate();
  const [HospitalsCount, setHospitalsCount] = useState(0);
  const [VaccinesCount, setVaccinesCount] = useState(0);
  const [HCWsCount, setHCWsCount] = useState(0);
  const [VaccinesCountForHospital, setVaccinesCountForHospital] = useState(0);
  const [vac, setvac] = useState([]);

  useEffect(() => {
    if (props.Email) {
      fetch(`${baseURL1}/?directorEPIEmail=${props.Email}`)
        .then((data) => data.json())
        .then((data) => setHospitalsCount(data))
    }
  }, [props.Email])

  useEffect(() => {
    fetch(baseURL)
      .then((data) => data.json())
      .then((data) => setHCWsCount(data))
  }, [])


  useEffect(() => {
    fetch(baseURL4)
      .then((data) => data.json())
      .then((data) => setvac(data))
  }, [])

  useEffect(() => {
    fetch(baseURL2)
      .then((data) => data.json())
      .then((data) => setVaccinesCount(data))
  }, [])

  useEffect(() => {
    fetch(baseURL3)
      .then((data) => data.json())
      .then((data) => setVaccinesCountForHospital(data))
  }, [])



  return (
    <>
    <div className="app">
    <Director_EPI_Sidebar isSidebar={isSidebar} />
    <main className="content">
    <Topbar setIsSidebar={setIsSidebar} />
    <div className="Dashboard">
    <Box m="20px">
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="Director EPI Dashboard" subtitle="Welcome to your dashboard" />

       
      </Box>

      {/* GRID & CHARTS */}
      <Box
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="140px"
        gap="20px"
      >
        {/* ROW 1 */}
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
          sx={{ borderRadius: '13px' }}
          onClick={()=> navigate("/HospitalData_EPI")}
        >
          <StatBox
            title={HospitalsCount.toLocaleString("en-US")}
            subtitle="Total Hospitals"
            progress="0.75"
            increase="+14%"
            icon={
              <LocalHospitalSharpIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
          sx={{ borderRadius: '13px' }}
          onClick={()=> navigate("/VaccinesAssignedToHospital")}
        >
          <StatBox
            title={VaccinesCountForHospital.toLocaleString("en-US")}
            subtitle="Vaccines assigned to hospital"
            progress="0.50"
            increase="+21%"
            icon={
              <VaccinesSharpIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
          sx={{ borderRadius: '13px' }}
          onClick={()=> navigate("/HCW_Admin_Data")}
        >
          <StatBox
            title={HCWsCount.toLocaleString("en-US")}
            subtitle="Healthcare Workers Admins"
            progress="0.30"
            increase="+5%"
            icon={
              <PersonAddIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
          sx={{ borderRadius: '13px' }}
          onClick={()=> navigate("/HCWA_Assigned_Vaccines")}
        >
          <StatBox
            title={VaccinesCount.toLocaleString("en-US")}
            subtitle="Vaccines Assigned to HCW Admins"
            progress="0.80"
            increase="+43%"
            icon={
              <PersonAddIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>

        {/* ROW 2 */}
        <Box
          gridColumn="span 8"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          sx={{ borderRadius: '13px' }}
        >
          <Box
            mt="25px"
            p="0 30px"
            display="flex "
            justifyContent="space-between"
            alignItems="center"
          >
            <Box>
              <Typography
                variant="h5"
                fontWeight="600"
                color={colors.grey[100]}
              >
                Hospital Data
              </Typography>
              <Typography
                variant="h3"
                fontWeight="bold"
                color={colors.greenAccent[500]}
              >
                $59,342.32
              </Typography>
            </Box>
            <Box>
              <IconButton>
                <DownloadOutlinedIcon
                  sx={{ fontSize: "26px", color: colors.greenAccent[500] }}
                />
              </IconButton>
            </Box>
          </Box>
          <Box height="250px" m="-20px 0 0 0">
            <LineChart isDashboard={true} />
          </Box>
        </Box>
        <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          overflow="auto"
          sx={{ borderRadius: '13px' }}
        >
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            borderBottom={`4px solid ${colors.primary[500]}`}
            colors={colors.grey[100]}
            p="15px"
          >
            <Typography color={colors.grey[100]} variant="h5" fontWeight="600">
              Recent Vaccines
            </Typography>
          </Box>
          {vac.map((transaction, i) => (
            <Box
              key={`${transaction.id}-${i}`}
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              borderBottom={`4px solid ${colors.primary[500]}`}
              p="15px"
            >
              <Box>
                <Typography
                  color={colors.greenAccent[500]}
                  variant="h5"
                  fontWeight="600"
                >
                  {transaction.id}
                </Typography>
                <Typography color={colors.grey[100]}>
                  {transaction.vaccineName}
                </Typography>
              </Box>
              <Box color={colors.grey[100]}>{transaction.vaccinetype}</Box>
              <Box
                backgroundColor={colors.greenAccent[500]}
                p="5px 10px"
                borderRadius="4px"
              >
                {transaction.vaccinequantity}
              </Box>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
    </div>
    </main>
    </div>
    </>
    );
};

export default Director_EPI_Dashboard;
