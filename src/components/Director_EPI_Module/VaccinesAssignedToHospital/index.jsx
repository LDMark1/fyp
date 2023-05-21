import { Box } from "@mui/material";
import { DataGrid, GridToolbar, GridCellParams, GridColDef, GridCellValue } from "@mui/x-data-grid";
import { tokens } from "../../../theme";
import Header from "../../Charts/Header";
import { useTheme } from "@mui/material";
import Director_EPI_Sidebar from "../Director_EPI_Sidebar/Sidebar";
import { useState, useEffect } from "react";

const baseURL = "http://127.0.0.1:8000/saveVaccineAssignedToHospital";


const VaccinesAssignedToHospital = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [tableData, setTableData] = useState([]);
  useEffect(() => {
    fetch(baseURL)
      .then((data) => data.json())
      .then((data) => setTableData(data))
  }, [])
   console.log(tableData)

  const columns: GridColDef[] = [
    { field: "id", headerName: "Serial#", flex: 0.5, editable: true, valueParser: (value: GridCellValue, params: GridCellParams) => {
      console.log(value);
    } },
    { field: "hospitalName", headerName: "Hospital Name", editable: true, valueParser: (value: GridCellValue, params: GridCellParams) => {
      console.log(value);
    } },
    {
      field: "vaccineName",
      headerName: "Vaccine Name",
      flex: 1,
      cellClassName: "name-column--cell",
      editable: true,
        valueParser: (value: GridCellValue, params: GridCellParams) => {
        console.log(value);
      }
    },
    {
      field: "Vaccine_Quantity",
      headerName: "Vaccine Quantity",
      flex: 1,
      cellClassName: "name-column--cell",
      editable: true,
        valueParser: (value: GridCellValue, params: GridCellParams) => {
        console.log(value);
      }
    },
    {
      field: "DirectorEPI_Email",
      headerName: "Assigned By",
      flex: 1,
      editable: true,
      valueParser: (value: GridCellValue, params: GridCellParams) => {
        console.log(value);
      }
    },
  ];

  return (
    <>
    <Director_EPI_Sidebar/>
    <div className='Contacts'>
    <Box m="20px">
      <Header
        title="Vaccines Assigned to Hospitals"
        subtitle="List of Vaccines Assigned to Hospitals"
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
        />
      </Box>
    </Box>
    </div>
    </>
  );
};

export default VaccinesAssignedToHospital;
