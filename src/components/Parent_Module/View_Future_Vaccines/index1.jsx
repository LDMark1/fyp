import { Box } from "@mui/material";
import { DataGrid, GridToolbar, GridCellParams, GridColDef, GridCellValue, GridCellEditStopReasons } from "@mui/x-data-grid";
import { tokens } from "../../../theme";
import Header from "../../Charts/Header";
import { useTheme } from "@mui/material";
import Parent_Sidebar from "../Parent_Sidebar/Sidebar";
import React from "react";
import { useState, useEffect } from "react";
import Topbar from "../../../scenes/global/Topbar";


const Future_VaccineData_Parent = (props) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [tableData, setTableData] = useState([]);
  const [isSidebar, setIsSidebar] = useState(true);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8000/GetFutureVaccinesForParent/?Parent_Email=${props.Email}`);
        const data = await response.json();
        setTableData(data.records);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);


  const columns: GridColDef[] = [
    { field: "VaccineId", headerName: "Vaccine ID", flex: 0.5},

    {
      field: "vaccineName",
      headerName: "Vaccine Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },

    {
      field: "childName",
      headerName: "Child Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },

    {
        field: "Date",
        headerName: "Vaccination Date",
        flex: 1,
        cellClassName: "name-column--cell",
      },

      {
        field: "HCW_Email",
        headerName: "Healthcare worker",
        flex: 1,
        cellClassName: "name-column--cell",
      },
    
  ];

  return (
    <>
    <div className="app">
    <Parent_Sidebar isSidebar={isSidebar} />
    <main className="content">
    <Topbar setIsSidebar={setIsSidebar} />
    <div className='Contacts'>
    <Box m="20px">
      <Header
        title="Upcoming Vaccines"
        subtitle="List of Vaccines with which your child will be vaccinated"
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

export default Future_VaccineData_Parent;
