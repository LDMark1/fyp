import { Box } from "@mui/material";
import { DataGrid, GridToolbar, GridCellParams, GridColDef, GridCellValue, GridCellEditStopReasons } from "@mui/x-data-grid";
import { tokens } from "../../../theme";
import Header from "../../Charts/Header";
import { useTheme } from "@mui/material";
import OS_Sidebar from "../OS_Sidebar/Sidebar";
import axios from "axios";
import React from "react";
import { useState, useEffect } from "react";
import Topbar from "../../../scenes/global/Topbar";

const baseURL = "http://127.0.0.1:8000/getVaccineAssignedToHospitalForOS";


const VaccineData_OS = (props) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [tableData, setTableData] = useState([]);
  const [isSidebar, setIsSidebar] = useState(true);

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
            url:'http://127.0.0.1:8000/updatevac',
            data: formField
          }).then(response =>{  
             respons=response.status;
             
            })
            // eslint-disable-next-line
  }


  useEffect(() => {
    fetch(`${baseURL}/?OS_Email=${props.Email}`)
      .then((data) => data.json())
      .then((data) => setTableData(data.vaccine_records))
  }, [])

  const onRowsSelectionHandler = (ids) => {
    const selectedRowsData = ids.map((id) => tableData.find((row) => row.id === id));
    
    updateValueID = selectedRowsData[0].id;
  };

  const columns: GridColDef[] = [
    { field: "assigned_vaccine_id", headerName: "Vaccine ID", flex: 0.5},

    {
      field: "hospitalName",
      headerName: "Hospital Name",
      flex: 1,
      cellClassName: "name-column--cell",
      editable: true,
        valueParser: (value: GridCellValue, params: GridCellParams) => {
          headerName = ('updatevaccinetype');
          updateValue = value;
      }
    },
    {
      field: "vaccineName",
      headerName: "Vaccine Name",
      flex: 1,
      cellClassName: "name-column--cell",
      editable: true,
        valueParser: (value: GridCellValue, params: GridCellParams) => {
          headerName = ('updatevaccineid');
          updateValue = value;
      }
    },
    {
      field: "Vaccine_Quantity",
      headerName: "Vaccine Quantity",
      flex: 1,
      editable: true,
      valueParser: (value: GridCellValue, params: GridCellParams) => {
        headerName = ('updatevaccinequantity');
        updateValue = value;
      }
    },
    { field: "DirectorEPI_Email", headerName: "Assigned By", flex:1, editable: true, valueParser: (value: GridCellValue, params: GridCellParams) => {
      headerName = ('');
      updateValue = value;
    } },
  ];

  return (
    <>
    <div className="app">
    <OS_Sidebar isSidebar={isSidebar} />
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

export default VaccineData_OS;
