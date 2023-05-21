import { Box } from "@mui/material";
import { DataGrid, GridToolbar, GridCellParams, GridColDef, GridCellValue, GridCellEditStopReasons } from "@mui/x-data-grid";
import { tokens } from "../../../theme";
import Header from "../../Charts/Header";
import { useTheme } from "@mui/material";
import HCW_Sidebar from "../HCW_Sidebar/Sidebar";
import Topbar from "../../../scenes/global/Topbar";
import React from "react";
import { useState, useEffect } from "react";

const baseURL = "http://127.0.0.1:8000/saveVaccineAssignedToHCW";


const VaccineData_HCW = () => {
  const [isSidebar, setIsSidebar] = useState(true);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [tableData, setTableData] = useState([]);
  



  useEffect(() => {
    fetch(baseURL)
      .then((data) => data.json())
      .then((data) => setTableData(data))
  }, [])


  const columns: GridColDef[] = [
    { field: "id", headerName: "Serial#", flex: 0.2},

    {
      field: "HCWA_Email",
      headerName: "Assigned to",
      flex: 0.5,
    },
    {
      field: "vaccineName",
      headerName: "Vaccine ID",
      flex: 0.5,
    },
    {
      field: "Vaccine_Quantity",
      headerName: "Vaccine Quantity",
      flex: 0.5,
    },
    // { field: "HCWA_Email", headerName: "Assigned By", flex: 1, },
  ];

  return (
    <>
    <div className="app">
    <HCW_Sidebar isSidebar={isSidebar} />
    <main className="content">
    <Topbar setIsSidebar={setIsSidebar} />
    <div className='Contacts'>
    <Box m="20px">
      <Header
        title="Vaccines"
        subtitle="List of Vaccines saved in the Database"
      />
      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${colors.grey[100]} !important`,
          },
        }}
      >
        <DataGrid
          rows={tableData}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
          experimentalFeatures={{ newEditingApi: true }}
          initialState={{
            sorting: {
              sortModel: [{ field: 'id', sort: 'asc' }],
            },
          }}
        />
      </Box>
    </Box>
    </div>
    </main>
    </div>
    </>
  );
};

export default VaccineData_HCW;
