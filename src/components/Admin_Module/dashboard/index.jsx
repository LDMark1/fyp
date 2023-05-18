import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { tokens } from "../../../theme";
import { mockTransactions } from "../../../data/mockData";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import LocalHospitalSharpIcon from '@mui/icons-material/LocalHospitalSharp';
import VaccinesSharpIcon from '@mui/icons-material/VaccinesSharp';
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import Header from "../../Charts/Header";
import LineChart from "../../Charts/LineChart";
import GeographyChart from "../../Charts/GeographyChart";
import BarChart from "../../Charts/BarChart";
import StatBox from "../../StatBox";
import ProgressCircle from "../../Charts/ProgressCircle";
import { useState, useEffect } from "react";
import "react-pro-sidebar/dist/css/styles.css";
import Sidebar from "../../../scenes/global/Sidebar";
import './index.css'
import { useNavigate } from "react-router-dom";


const baseURL = 'http://127.0.0.1:8000/countdepi'
const baseURL1 = 'http://127.0.0.1:8000/counthosp'
const baseURL2 = "http://127.0.0.1:8000/countmsi";
const baseURL3 = "http://127.0.0.1:8000/countvacM";


const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isSidebar, setIsSidebar] = useState(true);

  const [HospitalsCount, setHospitalsCount] = useState(0);
  const [VaccinesCount, setVaccinesCount] = useState(0);
  const [MSIsCount, setMSIsCount] = useState(0);
  const [EPIsCount, setEPIsCount] = useState(0);
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
    <Sidebar isSidebar={isSidebar} />
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
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
          sx={{ borderRadius: '13px'}}
          onClick={()=> navigate("/HospitalData")}
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
          onClick={()=> navigate("/vaccineManagerData")}
        >
          <StatBox
            title={VaccinesCount.toLocaleString("en-US")}
            subtitle="Vaccine Manager"
            progress="0.50"
            increase="+21%"
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
          onClick={()=> navigate("/msi_data")}
        >
          <StatBox
            title={MSIsCount.toLocaleString("en-US")}
            subtitle="Medical Superintendents"
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
          onClick={()=> navigate("/EPI_Data")}
        >
          <StatBox
            title={EPIsCount.toLocaleString("en-US")}
            subtitle="Director EPIs"
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
            sx={{ borderRadius: '13px' }}
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
          {mockTransactions.map((transaction, i) => (
            <Box
              key={`${transaction.txId}-${i}`}
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
                  {transaction.txId}
                </Typography>
                <Typography color={colors.grey[100]}>
                  {transaction.user}
                </Typography>
              </Box>
              <Box color={colors.grey[100]}>{transaction.date}</Box>
              <Box
                backgroundColor={colors.greenAccent[500]}
                p="5px 10px"
                borderRadius="4px"
              >
                ${transaction.cost}
              </Box>
            </Box>
          ))}
        </Box>

        {/* ROW 3 */}
        <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          p="30px"
          sx={{ borderRadius: '13px' }}
        >
          <Typography variant="h5" fontWeight="600">
            Campaign
          </Typography>
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            mt="25px"
          >
            <ProgressCircle size="125" />
            <Typography
              variant="h5"
              color={colors.greenAccent[500]}
              sx={{ mt: "15px" }}
            >
              $48,352 revenue generated
            </Typography>
            <Typography>Includes extra misc expenditures and costs</Typography>
          </Box>
        </Box>
        <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          sx={{ borderRadius: '13px' }}
        >
          <Typography
            variant="h5"
            fontWeight="600"
            sx={{ padding: "30px 30px 0 30px" }}
          >
            Sales Quantity
          </Typography>
          <Box height="250px" mt="-20px">
            <BarChart isDashboard={true} />
          </Box>
        </Box>
        <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          padding="30px"
          sx={{ borderRadius: '13px' }}
        >
          <Typography
            variant="h5"
            fontWeight="600"
            sx={{ marginBottom: "15px" }}
          >
            Geography Based Traffic
          </Typography>
          <Box height="200px">
            <GeographyChart isDashboard={true} />
          </Box>
        </Box>
      </Box>
    </Box>
    </div>
    </>
    );
};

export default Dashboard;
