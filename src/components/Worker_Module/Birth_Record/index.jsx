import React,{useState} from 'react';
import { useNavigate} from 'react-router-dom';
import { Box, Button, TextField } from "@mui/material";
import { Formik } from "formik";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../Charts/Header";
import HCW_Sidebar from '../HCW_Sidebar/Sidebar';
import axios from 'axios';

const HCW_Birth_Record = (props) => {
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const [id, setid]=useState("");
  const [fullName, setfullName]=useState("");
  const [Father_Email, setFather_Email]=useState("");
  const [Password, setPassword]=useState("");
  const [Contact, setContact]=useState("");
  const [Father_CNIC, setFather_CNIC]=useState("");
  const [Mother_CNIC, setMother_CNIC]=useState("");
  const [Gender, setGender]=useState("");
  const HCW_Email = props.Email
  let access = 'Parent'
  const temp_date = new Date();
  const date = temp_date.toLocaleString();
  const history = useNavigate();
  var respons;

  const saveData = async(event) =>
{
    event.preventDefault()
    const checkEmailExists = await axios.get(
      `http://127.0.0.1:8000/getParentEmail/?Father_Email=${Father_Email}`
    );
    console.log(checkEmailExists);
    if (checkEmailExists.data.exists)
    {
      let formField = new FormData()
      formField.append("id", id)
      formField.append("fullName", fullName)
      formField.append("Gender", Gender)
      formField.append("birth_date", date)
      formField.append("RegisteredBy", HCW_Email)
      formField.append("Father_CNIC", Father_CNIC)
          await axios({
            method: 'POST',
            url:'http://127.0.0.1:8000/saveBirthRecord',
            data: formField
          }).then(response =>{  
            respons=response.status;
              console.log(respons);
            })
      if(respons == 200)
      {
          history("/HCW_dashboard", { replace: true }) 
      }
      return;
    }
    let formField = new FormData()
    formField.append("id",Father_CNIC)
    formField.append("Contact", Contact)
    formField.append("Mother_CNIC", Mother_CNIC)
    formField.append("Father_Email", Father_Email)
    formField.append("Password", Password)
    formField.append("access", access)
         await axios({
          method: 'POST',
          url:'http://127.0.0.1:8000/saveParent',
          data: formField
        }).then(response =>{  
           respons=response.status;
            console.log(respons);
          })
if (respons==200){
        let formField = new FormData()
        formField.append("id", id)
        formField.append("fullName", fullName)
        formField.append("Gender", Gender)
        formField.append("birth_date", date)
        formField.append("RegisteredBy", HCW_Email)
        formField.append("Father_CNIC", Father_CNIC)
            await axios({
              method: 'POST',
              url:'http://127.0.0.1:8000/saveBirthRecord',
              data: formField
            }).then(response =>{  
              respons=response.status;
                console.log(respons);
              })
        if(respons == 200)
        {
            history("/HCW_dashboard", { replace: true }) 
        }
   }
   else{ 
    history("/signup")
}
}

  return (
    <>
    
    <HCW_Sidebar/>
    <div className="form">
    <Box m="20px">
      <Header title="ADD Birth Record" subtitle="Add a New Birth Record" />

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
                label="Child ID"
                onBlur={handleBlur}
                onChange={(e)=>{setid(e.target.value)}}
                value={id}
                name="id"
                sx={{ gridColumn: "span 1" }}
              />

              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Child Full Name"
                onBlur={handleBlur}
                onChange={(e)=>{setfullName(e.target.value)}}
                value={fullName}
                name="firstName"
                sx={{ gridColumn: "span 3" }}
              />
              
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Father Email"
                onBlur={handleBlur}
                onChange={(e)=>{setFather_Email(e.target.value)}}
                value={Father_Email}
                name="Father_Email"
                sx={{ gridColumn: "span 1" }}
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
                sx={{ gridColumn: "span 2" }}
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
                sx={{ gridColumn: "span 1" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Father CNIC"
                onBlur={handleBlur}
                onChange={(e)=>{setFather_CNIC(e.target.value)}}
                value={Father_CNIC}
                name="Father_CNIC"
                sx={{ gridColumn: "span 1" }}
              />
                 <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Mother CNIC"
                onBlur={handleBlur}
                onChange={(e)=>{setMother_CNIC(e.target.value)}}
                value={Mother_CNIC}
                name="Mother_CNIC"
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Gender"
                onBlur={handleBlur}
                onChange={(e)=>{setGender(e.target.value)}}
                value={Gender}
                name="Gender"
                sx={{ gridColumn: "span 1" }}
              />
             
            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" color="secondary" variant="contained">
                Add
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

export default HCW_Birth_Record;
