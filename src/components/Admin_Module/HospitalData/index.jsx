import { Box } from "@mui/material";
import { DataGrid, GridToolbar, GridCellParams, GridColDef, GridCellValue, GridCellEditStopReasons } from "@mui/x-data-grid";
import { tokens } from "../../../theme";
import Header from "../../Charts/Header";
import { useTheme } from "@mui/material";
import Sidebar from "../../../scenes/global/Sidebar";
import axios from "axios";
import React from "react";
import { useState, useEffect } from "react";

const baseURL = "http://127.0.0.1:8000/savehosp";


const HospitalData = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [tableData, setTableData] = useState([]);

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
            method: 'put',
            url:'http://127.0.0.1:8000/savehosp',
            data: formField
          }).then(response =>{  
             respons=response.status;
             
            })
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

  const columns: GridColDef[] = [
    { field: "id", headerName: "Hospital ID", flex: 0.5},
    { field: "hospitalName", headerName: "Hospital Name", flex:1,editable: true, valueParser: (value: GridCellValue, params: GridCellParams) => {
      headerName = ('hospitalName');
      updateValue = value;
    } },
    {
      field: "hospitalCity",
      headerName: "Hospital City",
      flex: 1,
      cellClassName: "name-column--cell",
      editable: true,
        valueParser: (value: GridCellValue, params: GridCellParams) => {
          headerName = ('hospitalCity');
          updateValue = value;
      }
    },
    {
      field: "hospitalProvince",
      headerName: "Hospital Province",
      flex: 1,
      editable: true,
      valueParser: (value: GridCellValue, params: GridCellParams) => {
        headerName = ('hospitalProvince');
      updateValue = value;
      }
    },
    {
      field: "hospitalAddress",
      headerName: "Hospital Address",
      flex: 1,
      editable: true,
      valueParser: (value: GridCellValue, params: GridCellParams) => {
        headerName = ('hospitalAddress');
        updateValue = value;
      }
    },
  ];

  return (
    <>
    <Sidebar/>
    <div className='Contacts'>
    <Box m="20px">
      <Header
        title="Hospitals"
        subtitle="List of Hospitals in the system"
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
    </>
  );
};

export default HospitalData;
