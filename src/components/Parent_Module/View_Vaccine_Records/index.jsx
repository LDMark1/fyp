import { Box } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../../theme";
import Header from "../../Charts/Header";
import { useTheme } from "@mui/material";
import Parent_Sidebar from "../Parent_Sidebar/Sidebar";
import React from "react";
import { useState, useEffect } from "react";

const baseURL = "http://127.0.0.1:8000/savevacr";


const Parent_View_Vaccine_Records = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [tableData, setTableData] = useState([]);



  useEffect(() => {
    fetch(baseURL)
      .then((data) => data.json())
      .then((data) => setTableData(data))
  }, [])




  const columns = [
    { field: "id", headerName: "Serial#", flex: 1,},
    {
      field: "childName",
      headerName: "Child Name",
      flex: 1,
    },
    {
      field: "vaccineName",
      headerName: "Vaccine Name",
      flex: 1,
    },
    {
        field: "RegisteredBy",
        headerName: "Registered By",
        flex: 2.5,
    },
    {
        field: "Description",
        headerName: "Description",
        flex: 1,
      },
  ];

  return (
    <>
    <Parent_Sidebar/>
    <div className='Contacts'>
    <Box m="20px">
      <Header
        title="Vaccine Records"
        subtitle="List of all the Vaccine Records saved in Database"
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
    </>
  );
};

export default Parent_View_Vaccine_Records;
