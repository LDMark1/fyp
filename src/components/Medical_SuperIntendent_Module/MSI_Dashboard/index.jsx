import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { tokens } from "../../../theme";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import VaccinesSharpIcon from '@mui/icons-material/VaccinesSharp';
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import Header from "../../Charts/Header";
import LineChart from "../../Charts/LineChart4";
import StatBox from "../../../components/StatBox";
import { useState, useEffect } from "react";
import "react-pro-sidebar/dist/css/styles.css";
import MSI_Sidebar from "../MSI_Sidebar/Sidebar";
import { useNavigate } from "react-router-dom";
import Topbar from "../../../scenes/global/Topbar";


const baseURL = 'http://127.0.0.1:8000/RetrieveOperatingStaffForMSI'
const baseURL1 = 'http://127.0.0.1:8000/getVaccAssignedToMSI'
const baseURL2 = 'http://127.0.0.1:8000/RetrieveBirthRecordsForMSI'
const baseURL4 = "http://127.0.0.1:8000/savevac";


const MSI_Dashboard = (props) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isSidebar, setIsSidebar] = useState(true);
  const navigate = useNavigate();

  const [OperatingStaff, setOperatingStaff] = useState(0);
  const [Birth_Records, setBirth_Records] = useState(0);
  const [Vaccine_Count, setVaccine_Count] = useState(0);
  const [vac, setvac] = useState([]);
  
  useEffect(() => {
    fetch(`${baseURL}/?MSI_Email=${props.Email}`)
      .then((data) => data.json())
      .then((data) => setOperatingStaff(data.count))
  }, [])

  useEffect(() => {
    fetch(`${baseURL1}/?MSI_Email=${props.Email}`)
      .then((data) => data.json())
      .then((data) => setVaccine_Count(data.count))
  }, [])


  useEffect(() => {
    fetch(`${baseURL2}/?MSI_Email=${props.Email}`)
      .then((data) => data.json())
      .then((data) => setBirth_Records(data.count))
  }, [])

  useEffect(() => {
    fetch(baseURL4)
      .then((data) => data.json())
      .then((data) => setvac(data))
  }, [])
 

  return (
    <>
    <div className="app">
    <MSI_Sidebar isSidebar={isSidebar} />
    <main className="content">
    <Topbar setIsSidebar={setIsSidebar} />
    <div className="Dashboard">
    <Box m="20px">
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="Medical Superintendent Dashboard" subtitle="Welcome to your dashboard" />

       
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
          backgroundColor={colors.primary[900]}
          display="flex"
          alignItems="center"
          justifyContent="center"
          sx={{ borderRadius: '13px' }}
          onClick={()=> navigate("/VaccineData_MSI")}
        >
          <StatBox
            title={Vaccine_Count}
            subtitle="Total Vaccines"
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
          backgroundColor={colors.primary[600]}
          display="flex"
          alignItems="center"
          justifyContent="center"
          sx={{ borderRadius: '13px' }}
          onClick={()=> navigate("/OS_Data")}
        >
          <StatBox
            title={OperatingStaff}
            subtitle="Operating Staff"
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
          backgroundColor={colors.primary[700]}
          display="flex"
          alignItems="center"
          justifyContent="center"
          sx={{ borderRadius: '13px' }}
          onClick={()=> navigate("/MSI_View_Birth_Records")}
        >
          <StatBox
            title={Birth_Records}
            subtitle="Birth Records"
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

export default MSI_Dashboard;
