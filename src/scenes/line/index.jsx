import { Box } from "@mui/material";
import Header from "../../components/Header";
import LineChart from "../../components/LineChart";
import Sidebar from "../global/Sidebar";
import './index.css'

const Line = () => {
  return (
    <>
    <Sidebar/>
    <div className="line">
    <Box m="20px">
      <Header title="Line Chart" subtitle="Simple Line Chart" />
      <Box height="75vh">
        <LineChart />
      </Box>
    </Box>
    </div>
    </>
  );
};

export default Line;
