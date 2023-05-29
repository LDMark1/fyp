import { Box, Typography, useTheme } from "@mui/material";
import { tokens } from "../../../theme";
import VaccinesSharpIcon from '@mui/icons-material/VaccinesSharp';
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import Header from "../../Charts/Header";
import StatBox from "../../StatBox";
import { useState, useEffect } from "react";
import "react-pro-sidebar/dist/css/styles.css";
import Parent_Sidebar from "../Parent_Sidebar/Sidebar";
import { useNavigate } from "react-router-dom";
import Topbar from "../../../scenes/global/Topbar";
import images from "../../Home/doctor.png"
const baseURL4 = "http://127.0.0.1:8000/savevac";
const styles={
  width:"50vh",height:"55vh",
  marginLeft:"31.5vw",marginTop:"-41.5vh"
}
const styl = {
  marginLeft: "5vw",
  color: "white",
  fontFamily: "Monaco, monospace",
  marginTop:"10vh",
  fontSize: "24px",
};

const Parent_Dashboard = (props) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isSidebar, setIsSidebar] = useState(true);
  const [vacRecord, setVacRecord] = useState(0);
  const [childRecord, setChildRecord] = useState(0)
  const [futureVacRecords, setFutureVacRecords] = useState(0)
  const [vac, setvac] = useState([]);
  const baseURL = 'http://127.0.0.1:8000/getVaccineRecordsforParent'
  const baseURL1 = 'http://127.0.0.1:8000/getBirthRecordsforParent'
  const baseURL2 = 'http://127.0.0.1:8000/GetFutureVaccinesForParent'
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${baseURL2}/?Parent_Email=${props.Email}`)
      .then((data) => data.json())
      .then((data) => setFutureVacRecords(data.count))
  }, [])

  useEffect(() => {
    fetch(`${baseURL}/?Parent_Email=${props.Email}`)
      .then((data) => data.json())
      .then((data) => setVacRecord(data.count))
  }, [])

  useEffect(() => {
    fetch(baseURL4)
      .then((data) => data.json())
      .then((data) => setvac(data))
  }, [])

  useEffect(() => {
    if (props.Email) {
      fetch(`${baseURL1}/?Parent_Email=${props.Email}`)
        .then((data) => data.json())
        .then((data) => setChildRecord(data.count))
    }
  }, [props.Email])

  return (
    <>
    <div className="app">
    <Parent_Sidebar isSidebar={isSidebar} />
    <main className="content">
    <Topbar setIsSidebar={setIsSidebar} />
    <div className="Dashboard">
    <Box m="20px">
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="Parent Dashboard" subtitle="Welcome to your dashboard" />

       
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
          gridColumn="span 4"
          backgroundColor={colors.primary[900]}
          display="flex"
          alignItems="center"
          justifyContent="center"
          sx={{ borderRadius: '13px' }}
          onClick={()=> navigate("/Parent_View_Birth_Records")}
        >
          <StatBox
            title={childRecord.toLocaleString('en-US')}
            subtitle="Children"
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
          gridColumn="span 4"
          backgroundColor={colors.primary[600]}
          display="flex"
          alignItems="center"
          justifyContent="center"
          sx={{ borderRadius: '13px' }}
          onClick={()=> navigate("/Parent_View_Vaccine_Records")}
        >
          <StatBox
            title={vacRecord.toLocaleString('en-US')}
            subtitle="Vaccination Records"
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
          gridColumn="span 4"
          backgroundColor={colors.primary[600]}
          display="flex"
          alignItems="center"
          justifyContent="center"
          sx={{ borderRadius: '13px' }}
          onClick={()=> navigate("/Future_VaccineData_Parent")}
        >
          <StatBox
            title={futureVacRecords.toLocaleString('en-US')}
            subtitle="Upcoming Vaccination Records"
            progress="0.30"
            increase="+5%"
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
          backgroundColor={"#48c3e7"}
          sx={{ borderRadius: '13px' }}
        >
          <div style={styl} >Protecting lives, one vaccine at<br/> a time. Visit us today and <br/> safeguard your future  health. <br/>Stay safe,  stay vaccinated.</div>
        <img style={styles} src={images}/>
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

export default Parent_Dashboard;
