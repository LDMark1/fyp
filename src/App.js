import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./components/Login/login";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import {  addListener } from "./components/Login/login";
import { respons } from "./components/Login/login";
import HomePage from "./components/Home/Home";


//Imports For Admin
import Dashboard from "./components/Admin_Module/dashboard/index";
import VM_Registration from "./components/Admin_Module/VM_Registration";
import Hospital_Registration from "./components/Admin_Module/Hospital_Registration";
import MSI_Registration from "./components/Admin_Module/MSI_Registration";
import EPI_Data from "./components/Admin_Module/contacts";
import Form from "./components/Admin_Module/form";
import MSI_Data from "./components/Admin_Module/MSI_Data";
import HospitalData from "./components/Admin_Module/HospitalData";
import VaccineManagerData from "./components/Admin_Module/VM_Data";
import FeedbackView from "./components/Admin_Module/view_feedback/feedback";

//Imports For VaccineManager
import Add_Vaccine from "./components/Vaccine_Manager_Module/Add_Vaccines";
import EPI_Data_View from "./components/Vaccine_Manager_Module/View_EPI";
import Director_EPI_Vaccine_Assignment from "./components/Vaccine_Manager_Module/Assign_Vaccine";
import VaccineData from "./components/Vaccine_Manager_Module/Vaccine_Data";
import DEPI_Assigned_Vaccines from "./components/Vaccine_Manager_Module/DEPI_Assigned_Vaccines";
import Vaccine_Manager_Dashboard from "./components/Vaccine_Manager_Module/Vaccine_Manager_Dashboard";

//Imports For DirectorEPI
import HospitalData_EPI from "./components/Director_EPI_Module/HospitalData_ForEPI";
import VaccineData_EPI from "./components/Director_EPI_Module/Vaccine_Data/vaccine_Data_EPI";
import HCW_Admin_Data from "./components/Director_EPI_Module/HCW_Data";
import HCW_Admin_Vaccination_Assignment from "./components/Director_EPI_Module/HCW_Vaccine_Assignment";
import HCWA_Assigned_Vaccines from "./components/Director_EPI_Module/HCW_Assigned_Vaccines";
import VaccinesAssignedToHospital from "./components/Director_EPI_Module/VaccinesAssignedToHospital";
import Director_EPI_Dashboard from "./components/Director_EPI_Module/Director_EPI_Dashboard";
import HCW_Admin_Registration from "./components/Director_EPI_Module/HCW_Admin_Registration";
import HCW_Assigned_Vaccines from "./components/Director_EPI_Module/HCW_Assigned_Vaccines";
import Hospital_Vaccination_Assignment from "./components/Director_EPI_Module/Hospital_Vaccine_Assignment";

//Imports For Healthcare Worker Admin
import HCW_Admin_Dashboard from "./components/HCW_Admin_Module/HCW_Admin_Dashboard";
import HCW_Registration from "./components/HCW_Admin_Module/HCW_Registration";
import HCWA_Alloted_Vaccines from "./components/HCW_Admin_Module/View_Alloted_Vaccines";
import HCW_Data from "./components/HCW_Admin_Module/HCW_Data";
import HCW_Vaccination_Assignment from "./components/HCW_Admin_Module/Assign_Vaccine";
import Vaccines_Assigned_To_HCW from "./components/HCW_Admin_Module/View_Assigned_Vaccines";

//Imports For Medical Superintendent
import MSI_Dashboard from "./components/Medical_SuperIntendent_Module/MSI_Dashboard";
import OS_Registration from "./components/Medical_SuperIntendent_Module/OS_Registration";
import VaccineData_MSI from "./components/Medical_SuperIntendent_Module/Vaccine_Data/VaccineData_MSI";
import OS_Data from "./components/Medical_SuperIntendent_Module/View_OS_Data";
import MSI_View_Birth_Records from "./components/Medical_SuperIntendent_Module/View_Birth_Records";

//Imports For Healthcare Worker 
import HCW_Dashboard from "./components/Worker_Module/HCW_Dashboard";
import HCW_Vaccination_Record from "./components/Worker_Module/Vaccination_Record";
import HCW_Birth_Record from "./components/Worker_Module/Birth_Record";
import HCW_View_Birth_Records from "./components/Worker_Module/View_Birth_Records/hcw_index";
import HCW_View_Vaccine_Records from "./components/Worker_Module/View_Vaccine_Records/hcw_index";
import VaccineData_HCW from "./components/Worker_Module/Vaccine_Data/VaccineData_HCW";
import Future_VaccineData_HCW from "./components/Worker_Module/view_future_vaccines/index1";

//Imports For Operating Staff
import OS_Dashboard from "./components/Worker_Module/OS_Dashboard";
import OS_Vaccination_Record from "./components/Worker_Module/Vaccination_Record/index1";
import OS_Birth_Record from "./components/Worker_Module/Birth_Record/index1";
import OS_View_Birth_Records from "./components/Worker_Module/View_Birth_Records";
import OS_View_Vaccine_Records from "./components/Worker_Module/View_Vaccine_Records";
import VaccineData_OS from "./components/Worker_Module/Vaccine_Data/VaccineData_OS";
import Adding_Future_Vaccines from "./components/Worker_Module/future_vaccines/future_vaccines";
import View_Future_Vaccines_OS from "./components/Worker_Module/view_future_vaccines";


//Imports For Parents
import Parent_Dashboard from "./components/Parent_Module/Parent_Dashboard";
import Parent_View_Birth_Records from "./components/Parent_Module/View_Birth_Records";
import Parent_View_Vaccine_Records from "./components/Parent_Module/View_Vaccine_Records";
import FeedbackForm from "./components/Parent_Module/Parent_Feedback/feedback";
import Future_VaccineData_Parent from "./components/Parent_Module/View_Future_Vaccines/index1";


function App() {
  const [theme, colorMode] = useMode();
  // const [isSidebar, setIsSidebar] = useState(true);

  const [role, setRole] = useState(sessionStorage.getItem("role") || "normaluser");
  const [Email, setEmail] = useState('');
  


  useEffect(() => {
    addListener((loggedIn) => {
      console.log(`loggedIn value has changed to ${loggedIn}`);
      
        setRole(loggedIn);
      const data = respons.data;
      console.log('data: ')
      console.log(data);
      if (data && data.email =='admin')
       {
        setEmail(data.email);
        sessionStorage.setItem("Email", 'admin');
       }

       if (data && data.access =='VaccineManager')
       {
        setEmail(data.email);
        sessionStorage.setItem("Email", data.email);
       }


       if (data && data.access =='directorEPI')
       {
        setEmail(data.email);
        sessionStorage.setItem("Email", data.email);
       }

       if (data && data.access =='HealthCareWorkerAdmin')
       {
        setEmail(data.email);
        sessionStorage.setItem("Email", data.email);
       }

       if (data && data.email && loggedIn=='MedicalSuperIntendent') 
       {
        setEmail(data.email);
        sessionStorage.setItem("Email", Email);
       }

       if (data && data.email && loggedIn=='OperatingStaff') 
       {
        setEmail(data.email);
        sessionStorage.setItem("Email", Email);
       }

       if (data && data.email && loggedIn=='HealthCareWorker') 
       {
        setEmail(data.email);
        sessionStorage.setItem("Email", Email);
       }

       if (data && data.email && loggedIn=='Parent') 
       {
        setEmail(data.email);
        sessionStorage.setItem("Email", Email);
       }
       
      sessionStorage.setItem("role", loggedIn);
    });
  }, []);


  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className="app">
      <main className="content">

    <Routes>
      {role === "normaluser" && (
      <>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<Login />} />
      </>
      )}

      {role === "admin" && (
        <>
          <Route path="/Dashboard" element={[<Dashboard/>   ]} />
          <Route path="/VM_Registration" element={<VM_Registration Email={Email} />} />
          <Route path="/form" element={<Form Email={Email}/>} />
          <Route path="/hospitaldata" element={<HospitalData />} />
          <Route path="/VaccineManagerData" element={<VaccineManagerData />} />
          <Route path="/EPI_Data" element={<EPI_Data />} />
          <Route path="/MSI_registration" element={<MSI_Registration Email={Email} />} />
          <Route path="/hospital_registration" element={<Hospital_Registration Email={Email}/>} />
          <Route path="/msi_data" element={<MSI_Data />} />
          <Route path="/FeedbackView" element={<FeedbackView />} />
        </>
      )}

      {role === "directorEPI" && (
        <>
          <Route path="/Director_EPI_Dashboard" element={<Director_EPI_Dashboard Email={Email}/>} />
          <Route path="/HCW_Admin_Registration" element={<HCW_Admin_Registration Email={Email} />} />
          <Route path="/Hospital_Vaccination_Assignment" element={<Hospital_Vaccination_Assignment Email={Email} />} />
          <Route path="/HospitalData_EPI" element={<HospitalData_EPI Email={Email}/>} />
          <Route path="/VaccineData_EPI" element={<VaccineData_EPI Email={Email}/>} />
          <Route path="/HCW_Admin_Data" element={<HCW_Admin_Data Email={Email}/>} />
          <Route path="/HCW_Admin_Vaccine_Assignment" element={<HCW_Admin_Vaccination_Assignment Email={Email} />} />
          <Route path="/HCWA_Assigned_Vaccines" element={<HCWA_Assigned_Vaccines Email={Email}/>} />
          <Route path="/VaccinesAssignedToHospital" element={<VaccinesAssignedToHospital Email={Email}/>} />
        </>
      )}

      {role === "VaccineManager" && (
        <>
          <Route path="/Vaccine_Manager_Dashboard" element={<Vaccine_Manager_Dashboard Email={Email}/>} />
          <Route path="/Add_Vaccine" element={<Add_Vaccine Email={Email} />} />
          <Route path="/EPI_Data_View" element={<EPI_Data_View Email={Email}/>} />
          <Route path="/Director_EPI_Vaccine_Assignment" element={<Director_EPI_Vaccine_Assignment Email={Email} />} />
          <Route path="/VaccineData" element={<VaccineData />} />
          <Route path="/DEPI_Assigned_Vaccines" element={<DEPI_Assigned_Vaccines />} />
        </>
      )}

      {role === "HealthCareWorkerAdmin" && (
        <>
          <Route path="/HCW_Admin_Dashboard" element={<HCW_Admin_Dashboard Email={Email}/>} />
          <Route path="/HCW_Registration" element={<HCW_Registration Email={Email} />} />
          <Route path="/HCWA_Alloted_Vaccines" element={<HCWA_Alloted_Vaccines Email={Email} />} />
          <Route path="/HCW_Data" element={<HCW_Data Email={Email}/>} />
          <Route path="/HCW_Vaccination_Assignment" element={<HCW_Vaccination_Assignment Email={Email}/>} />
          <Route path="/Vaccines_Assigned_To_HCW" element={<Vaccines_Assigned_To_HCW Email={Email}/>} />
        </>
      )}

      {role === "MedicalSuperIntendent" && (
        <>
          <Route path="/MSI_Dashboard" element={<MSI_Dashboard Email={Email} />} />
          <Route path="/OS_Registration" element={<OS_Registration Email={Email}/>} />
          <Route path="/VaccineData_MSI" element={<VaccineData_MSI Email={Email}/>} />
          <Route path="/OS_Data" element={<OS_Data Email={Email}/>} />
          <Route path="/MSI_View_Birth_Records" element={<MSI_View_Birth_Records Email={Email}/>} />
        </>
      )}

      {role === "HealthCareWorker" && (
        <>
          <Route path="/HCW_Dashboard" element={<HCW_Dashboard Email={Email}/>} />
          <Route path="/HCW_Vaccination_Record" element={<HCW_Vaccination_Record Email={Email}/>} />
          <Route path="/HCW_Birth_Record" element={<HCW_Birth_Record Email={Email}/>} />
          <Route path="/HCW_View_Birth_Records" element={<HCW_View_Birth_Records/>} />
          <Route path="/HCW_View_Vaccine_Records" element={<HCW_View_Vaccine_Records Email={Email}/>} />
          <Route path="/VaccineData_HCW" element={<VaccineData_HCW Email={Email}/>} />
          <Route path="/Future_VaccineData_HCW" element={<Future_VaccineData_HCW Email={Email}/>} />
        </>
      )}
{/* os remaining */}
      {role === "OperatingStaff" && (
        <>
          <Route path="/OS_Dashboard" element={<OS_Dashboard Email={Email}/>} />
          <Route path="/OS_Vaccination_Record" element={<OS_Vaccination_Record Email={Email}/>} />
          <Route path="/OS_Birth_Record" element={<OS_Birth_Record Email={Email}/>} />
          <Route path="/OS_View_Birth_Records" element={<OS_View_Birth_Records/>} />
          <Route path="/OS_View_Vaccine_Records" element={<OS_View_Vaccine_Records/>} />
          <Route path="/VaccineData_OS" element={<VaccineData_OS Email={Email}/>} />
          <Route path="/Adding_Future_Vaccines" element={<Adding_Future_Vaccines Email={Email}/>} />
          <Route path="/View_Future_Vaccines_OS" element={<View_Future_Vaccines_OS />} />
        </>
      )}

      {role === "Parent" && (
        <>
          <Route path="/parent_Dashboard" element={<Parent_Dashboard Email={Email}/>} />
          <Route path="/Parent_View_Birth_Records" element={<Parent_View_Birth_Records Email={Email}/>} />
          <Route path="/Parent_View_Vaccine_Records" element={<Parent_View_Vaccine_Records Email={Email}/>} />
          <Route path="/FeedbackForm" element={<FeedbackForm Email={Email}/>} />
          <Route path="/Future_VaccineData_Parent" element={<Future_VaccineData_Parent Email={Email}/>} />
        </>
      )}
      

    </Routes>

    </main>
    </div>
    </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;