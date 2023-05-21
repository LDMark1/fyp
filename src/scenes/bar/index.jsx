import { Box } from "@mui/material";
import Header from "../../components/Header";
import BarChart from "../../components/BarChart";
import Sidebar from "../global/Sidebar";
import './index.css'

const Bar = () => {
  return (
    <>
    <Sidebar/>
    <div className="bar">
    <Box m="20px">
      <Header title="Bar Chart" subtitle="Simple Bar Chart" />
      <Box height="75vh">
        <BarChart />
      </Box>
    </Box>
    </div>
    </>
  );
};

export default Bar;
