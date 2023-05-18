import { Box } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../../theme";
import Header from "../../Charts/Header";
import { useTheme } from "@mui/material";
import OS_Sidebar from "../OS_Sidebar/Sidebar";
import React from "react";
import { useState, useEffect } from "react";

const baseURL = "http://127.0.0.1:8000/saveBirthRecord";


const OS_View_Birth_Records = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [tableData, setTableData] = useState([]);



  useEffect(() => {
    fetch(baseURL)
      .then((data) => data.json())
      .then((data) => setTableData(data))
  }, [])




  const columns = [
    { field: "id", headerName: "Child ID", flex: 1,},
    { field: "fullName", headerName: "Name"},
    {
      field: "Father_CNIC",
      headerName: "Father's CNIC",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "Gender",
      headerName: "Gender",
      flex: 1,
    },
    {
        field: "birth_date",
        headerName: "Birth Time",
        flex: 2.5,
    },
    {
        field: "RegisteredBy",
        headerName: "Registered by",
        flex: 1,
      },
  ];

  return (
    <>
    <OS_Sidebar/>
    <div className='Contacts'>
    <Box m="20px">
      <Header
        title="Birth Records"
        subtitle="List of all the Birth Records saved in Database"
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

export default OS_View_Birth_Records;
