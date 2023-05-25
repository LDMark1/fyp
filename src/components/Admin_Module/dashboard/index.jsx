import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { tokens } from "../../../theme";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import LocalHospitalSharpIcon from '@mui/icons-material/LocalHospitalSharp';
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import Header from "../../Charts/Header";
import LineChart from "../../Charts/LineChart";
import StatBox from "../../StatBox";
import { useState, useEffect } from "react";
import "react-pro-sidebar/dist/css/styles.css";
import Sidebar from "../../../scenes/global/Sidebar";
import { useNavigate } from "react-router-dom";
import Topbar from '../../../scenes/global/Topbar'

const baseURL = 'http://127.0.0.1:8000/countdepi'
const baseURL1 = 'http://127.0.0.1:8000/counthosp'
const baseURL2 = "http://127.0.0.1:8000/countmsi";
const baseURL3 = "http://127.0.0.1:8000/countvacM";
const baseURL4 = "http://127.0.0.1:8000/savevac";


const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isSidebar, setIsSidebar] = useState(true);

  const [HospitalsCount, setHospitalsCount] = useState(0);
  const [VaccinesCount, setVaccinesCount] = useState(0);
  const [MSIsCount, setMSIsCount] = useState(0);
  const [EPIsCount, setEPIsCount] = useState(0);
  const [vac, setvac] = useState([]);
  const navigate = useNavigate();
  
  useEffect(() => {
    fetch(baseURL)
      .then((data) => data.json())
      .then((data) => setEPIsCount(data))
  }, [])

  useEffect(() => {
    fetch(baseURL1)
      .then((data) => data.json())
      .then((data) => setHospitalsCount(data))
  }, [])
  useEffect(() => {
    fetch(baseURL4)
      .then((data) => data.json())
      .then((data) => setvac(data))
  }, [])
  useEffect(() => {
    fetch(baseURL2)
      .then((data) => data.json())
      .then((data) => setMSIsCount(data))
  }, [])

  useEffect(() => {
    fetch(baseURL3)
      .then((data) => data.json())
      .then((data) => setVaccinesCount(data))
  }, [])
   
  return (
    <>
    <div className="app">
    <Sidebar isSidebar={isSidebar} />
    <main className="content">
    <Topbar setIsSidebar={setIsSidebar} />
    <div className="Dashboard">
    <Box m="20px">
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="Admin Dashboard" subtitle="Welcome to your dashboard" />

       
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
          // gridRow={}
          backgroundColor={colors.primary[900]}
          display="flex"
          alignItems="center"
          justifyContent="center"
          sx={{ borderRadius: '13px'}}
          onClick={()=> navigate("/HospitalData")}
        >
          <StatBox
            title={  <span
          style={{fontSize: "30px", }}
    >{HospitalsCount.toLocaleString("en-US")} </span>}
            subtitle="Total Hospitals"
            icon={
              <LocalHospitalSharpIcon
                sx={{ color: colors.greenAccent[600], fontSize: "40px" }}
              />
            }
            increase="+21%"
          />
        </Box>
        <Box
           gridColumn="span 3"
          backgroundColor={colors.primary[600]}
          display="flex"
          alignItems="center"
          justifyContent="center"
          sx={{ borderRadius: '13px' }}
          onClick={()=> navigate("/vaccineManagerData")}
        >
          <StatBox
            title={<span style={{fontSize: "30px", }}>{VaccinesCount.toLocaleString("en-US")}</span>}
            subtitle="Vaccine Manager"
            progress="0.50"
            increase="+21%"
            icon={
              <PersonAddIcon
                sx={{ color: colors.greenAccent[600], fontSize: "40px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[700]}
          display="flex"
          alignItems="center"
          justifyContent="center"
          sx={{ borderRadius: '13px' }}
          onClick={()=> navigate("/msi_data")}
        >
          <StatBox
            title={<span style={{fontSize: "30px", }}>{MSIsCount.toLocaleString("en-US")}</span> }
            subtitle="Medical SIs"
            progress="0.30"
            increase="+5%"
            icon={
              <PersonAddIcon
                sx={{ color: colors.greenAccent[600], fontSize: "40px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[800]}
          display="flex"
          alignItems="center"
          justifyContent="center"
          sx={{ borderRadius: '13px' }}
          onClick={()=> navigate("/EPI_Data")}
        >
          <StatBox
            title={<span style={{fontSize: "30px", }}>{EPIsCount.toLocaleString("en-US")}</span> }
            subtitle="Director EPIs"
            progress="0.80"
            increase="+43%"
            icon={
              <PersonAddIcon
                sx={{ color: colors.greenAccent[600], fontSize: "40px" }}
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
            sx={{ borderRadius: '13px' }}
          >
            <Box>
              <Typography
                variant="h5"
                fontWeight="600"
                color={colors.grey[100]}
              >
                 Over all Data
              </Typography>
              <Typography
                variant="h3"
                fontWeight="bold"
                color={colors.greenAccent[500]}
              >
              
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

        {/* ROW 3 */}
      
         
     
      
        </Box>
      </Box>
    </div>
    </main>
    </div>
    </>
    );
};

export default Dashboard;