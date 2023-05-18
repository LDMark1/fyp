import React,{useState} from 'react';
import { useNavigate} from 'react-router-dom'; 
import { Box, Button, TextField } from "@mui/material";
import { Formik } from "formik";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../Charts/Header";
import Sidebar from "../../../scenes/global/Sidebar";
import './index.css'
import axios from 'axios';

const cnicRegex = /^[0-9]+$/;

const Form = (props) => {
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const [fullName, setfullName]=useState("");
  const [directorEPIEmail, setEmail]=useState("");
  const [Password, setPassword]=useState("");
  const [Province, setProvince]=useState("");
  const [Contact, setContact]=useState("");
  const [CNIC, setCNIC]=useState("");

  const [error, setError]=useState("");

  const adminEmail = props.Email


  const history = useNavigate();
  var respons;
  let access = 'directorEPI';

  const saveData = async(event) =>
{
    event.preventDefault();
    if (
      fullName.trim() === "" ||
      directorEPIEmail.trim() === "" ||
      Password.trim() === "" ||
      Province.trim() === "" ||
      Contact.trim() === "" ||
      CNIC.trim() === ""
    ) {
      setError("Please fill all the fields");
      return;
    }
  
    if (!cnicRegex.test(CNIC)) {
      setError("CNIC must only contain numbers.");
      return;
    }
  
    if (!cnicRegex.test(Contact)) {
      setError("Phone must only contain numbers.");
      return;
    }
    let formField = new FormData()
    formField.append('directorEPIfullName',fullName)
    formField.append('directorEPIEmail',directorEPIEmail)
    formField.append('directorEPIPassword',Password)
    formField.append('directorEPIProvince',Province)
    formField.append('directorEPIphone',Contact)
    formField.append('id',CNIC)
    formField.append('adminEmail', adminEmail)
    formField.append('access',access)
         await axios({
          method: 'POST',
          url:'http://127.0.0.1:8000/savedepi',
          data: formField
        }).then(response =>{  
           respons=response.status;
            console.log(respons);
          })
          // eslint-disable-next-line
if (respons==200){
        history("/dashboard", { replace: true }) 
   }
}
  return (
    <>
    
    <Sidebar/>
    <div className="form">
    <Box m="20px">
      <Header title="CREATE Director EPI" subtitle="Create a New Director EPI" />

      <Formik
        onSubmit={saveData}
      >
        {({
          handleBlur,
        }) => (
          <form onSubmit={saveData}>
            <Box
              display="grid"
              gap="30px"
              gridTemplateColumns="repeat(4, minmax(0, 1fr))"
              sx={{
                "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
              }}
            >
              <TextField 
              fullWidth 
              variant="filled" 
              type="text" 
              label="Full Name" 
              onBlur={handleBlur}
              name="fullName"
              value={fullName}
              onChange={(e)=>{setfullName(e.target.value)}}
              sx={{ gridColumn: "span 2" }}
              />

              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="CNIC"
                onBlur={handleBlur}
                onChange={(e)=>{setCNIC(e.target.value)}}
                value={CNIC}
                name="CNIC"
                sx={{ gridColumn: "span 2" }}
              />
              
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Email"
                onBlur={handleBlur}
                onChange={(e)=>{setEmail(e.target.value)}}
                value={directorEPIEmail}
                name="directorEPIEmail"
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="password"
                label="Password"
                onBlur={handleBlur}
                onChange={(e)=>{setPassword(e.target.value)}}
                value={Password}
                name="Password"
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Province"
                onBlur={handleBlur}
                onChange={(e)=>{setProvince(e.target.value)}}
                value={Province}
                name="Province"
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Contact Number"
                onBlur={handleBlur}
                onChange={(e)=>{setContact(e.target.value)}}
                value={Contact}
                name="Contact"
                sx={{ gridColumn: "span 4" }}
              />
            </Box>
            <div className='errorMsg'>{error}</div>
            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" color="secondary" variant="contained">
                Create 
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
    </div>
    </>
  );
};



export default Form;