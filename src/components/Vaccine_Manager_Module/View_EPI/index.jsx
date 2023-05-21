import { Box } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../../theme";
import Header from "../../Charts/Header";
import { useTheme } from "@mui/material";
import Vaccine_Manager_Sidebar from "../Vaccine_Manager_Sidebar/Sidebar";
import axios from "axios";
import React from "react";
import { useState, useEffect } from "react";
import Topbar from "../../../scenes/global/Topbar";

const baseURL = "http://127.0.0.1:8000/getDEPIforVM";


const EPI_Data_View = (props) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [tableData, setTableData] = useState([]);
  const [isSidebar, setIsSidebar] = useState(true);


  let updateValueID;
  let headerName;
  let updateValue;
  var respons;

  useEffect(() => {
    if (props.Email) {
      fetch(`${baseURL}/?VM_Email=${props.Email}`)
        .then((data) => data.json())
        .then((data) => setTableData(data.depis))
    }
  }, [props.Email])
  

  const updateData = async() =>
  {
      let formField = new FormData()
      formField.append('id', updateValueID)
      formField.append(headerName, updateValue)
           await axios({
            method: 'put',
            url:'http://127.0.0.1:8000/savedepi',
            data: formField
          }).then(response =>{  
             respons=response.status;
             
            })
            // eslint-disable-next-line
  }


  useEffect(() => {
    fetch(baseURL)
      .then((data) => data.json())
      .then((data) => setTableData(data))
  }, [])


  const onRowsSelectionHandler = (ids) => {
    const selectedRowsData = ids.map((id) => tableData.find((row) => row.id === id));
    
    updateValueID = selectedRowsData[0].id;
  };


  const columns = [
    { field: "id", headerName: "CNIC", flex: 1,},
    { field: "directorEPIphone", headerName: "Phone"},
    {
      field: "directorEPIfullName",
      headerName: "Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },

    {
      field: "directorEPIEmail",
      headerName: "Email",
      flex: 1,
    },
    {
      field: "directorEPIProvince",
      headerName: "Province",
      flex: 1,
    },
  ];

  return (
    <>
    <div className="app">
    <Vaccine_Manager_Sidebar isSidebar={isSidebar} />
    <main className="content">
    <Topbar setIsSidebar={setIsSidebar} />
    <div className='Contacts'>
    <Box m="20px">
      <Header
        title="Director EPI Data"
        subtitle="List of all the Director EPIs saved in Database"
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

export default EPI_Data_View;
