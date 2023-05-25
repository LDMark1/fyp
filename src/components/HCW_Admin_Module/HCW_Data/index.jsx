import { Box } from "@mui/material";
import { DataGrid, GridToolbar, GridCellParams, GridColDef, GridCellValue, GridCellEditStopReasons } from "@mui/x-data-grid";
import { tokens } from "../../../theme";
import Header from "../../Charts/Header";
import { useTheme } from "@mui/material";
import HCW_Admin_Sidebar from "../HCW_Admin_Sidebar/Sidebar";
import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import Topbar from "../../../scenes/global/Topbar";

const baseURL = "http://127.0.0.1:8000/getHCWforHCWA";


const HCW_Data = (props) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [tableData, setTableData] = useState([]);
  const [isSidebar, setIsSidebar] = useState(true)


  let updateValueID;
  let headerName;
  let updateValue;
  var respons;


  const updateData = async() =>
  {
      let formField = new FormData()
      formField.append('id', updateValueID)
      formField.append(headerName, updateValue)
           await axios({
            method: 'PUT',
            url:'http://127.0.0.1:8000/savehcw',
            data: formField
          }).then(response =>{  
             respons=response.status;
             
            })
            // eslint-disable-next-line
  }

  useEffect(() => {
    fetch(`${baseURL}/?HCWA_Email=${props.Email}`)
      .then((data) => data.json())
      .then((data) => setTableData(data.hcw))
  }, [])
   

  const onRowsSelectionHandler = (ids) => {
    const selectedRowsData = ids.map((id) => tableData.find((row) => row.id === id));
    
    updateValueID = selectedRowsData[0].id;
  };

  const columns: GridColDef[] = [
    { field: "id", headerName: "HCW ID", flex: 0.5},
    { field: "contact", headerName: "Phone", editable: true, valueParser: (value: GridCellValue, params: GridCellParams) => {
      headerName = ('Contact');
      updateValue = value;
    } },
    {
      field: "fullName",
      headerName: "HCW Name",
      flex: 1,
      cellClassName: "name-column--cell",
      editable: true,
        valueParser: (value: GridCellValue, params: GridCellParams) => {
          headerName = ('fullName');
          updateValue = value;
      }
    },
    
    {
      field: "Email",
      headerName: "HCW Email",
      flex: 1,
      editable: true,
      valueParser: (value: GridCellValue, params: GridCellParams) => {
        headerName = ('Email');
      updateValue = value;
      }
    },
    {
      field: "HCWA_Email",
      headerName: "Created By",
      flex: 1,
    },
  ];

  return (
    <>
     <div className="app">
    <HCW_Admin_Sidebar isSidebar={isSidebar} />
    <main className="content">
    <Topbar setIsSidebar={setIsSidebar} />
    <div className='Contacts'>
    <Box m="20px">
      <Header
        title="Healthcare Worker Admins"
        subtitle="List of Healthcare Worker Admins"
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
          onSelectionModelChange={(ids) => onRowsSelectionHandler(ids)}
          onCellEditStop={(params: GridCellEditStopParams, event: MuiEvent) => {
            if (params.reason === GridCellEditStopReasons.enterKeyDown) {
              updateData();
            }
          }}
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

export default HCW_Data;
