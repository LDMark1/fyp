import { Box } from "@mui/material";
import { DataGrid, GridToolbar, GridCellParams, GridColDef, GridCellValue, GridCellEditStopReasons } from "@mui/x-data-grid";
import { tokens } from "../../../theme";
import Header from "../../Charts/Header";
import { useTheme } from "@mui/material";
import Director_EPI_Sidebar from "../Director_EPI_Sidebar/Sidebar";
import axios from "axios";
import React from "react";
import { useState, useEffect } from "react";


const baseURL = "http://192.168.0.121:8000/showvacr";


const Vaccine_Records_Data = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [tableData, setTableData] = useState([])

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
            url:'http://192.168.0.122:8000/updatevacr',
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

  const deleteData = async() =>
  {
    let formField = new FormData()
      formField.append('id', updateValueID)
          //  await axios({
          //   method: 'delete',
          //   url:'http://192.168.0.121:8000/deletevacr',
          //   data: formField
          // })
  }

  const DeleteButton = () => {
    return (
      // <Button onClick={() => deleteData()  } sx={{color: 'red'}} > DELETE </Button>
      <a className="redColor" onClick={() => console.log('id: ' + updateValueID)} >DELETE</a>
    );
  };

  const columns: GridColDef[] = [
    { field: "id", headerName: "Record ID", flex: 0.5 },
    { field: "firstName", headerName: "First Name", editable: true, valueParser: (value: GridCellValue, params: GridCellParams) => {
      headerName = ('updatefirstName');
      updateValue = value;
    } },
    {
      field: "Father_CNIC",
      headerName: "Father CNIC",
      flex: 1,
      cellClassName: "name-column--cell",
      editable: true,
        valueParser: (value: GridCellValue, params: GridCellParams) => {
        headerName = ('updateFather_CNIC');
        updateValue = value;
      }
    },
    {
      field: "Vaccine_Name",
      headerName: "Vaccine",
      flex: 1,
      editable: true,
      valueParser: (value: GridCellValue, params: GridCellParams) => {
        headerName = ('updateVaccine_Name');
        updateValue = value;
      }
    },
    {
      field: "HCW_ID",
      headerName: "Vaccinated By",
      flex: 1,
    },
    {
      flex: 1,
      renderCell: () => <DeleteButton />,
    },
  ];

  return (
    <>
    <Director_EPI_Sidebar/>
    <div className='Contacts'>
    <Box m="20px">
      <Header
        title="CONTACTS"
        subtitle="List of Contacts for Future Reference"
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

export default Vaccine_Records_Data;
