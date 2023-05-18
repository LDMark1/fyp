import React,{useState} from 'react';
import { useNavigate} from 'react-router-dom'; 
import { Box, Button, TextField } from "@mui/material";
import { Formik } from "formik";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../Charts/Header";
import Sidebar from "../../../scenes/global/Sidebar";
import axios from 'axios';

const cnicRegex = /^[0-9]+$/;

const VM_Registration = (props) => {
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const [id, setid]=useState();
  const [VM_Email, setVM_Email]=useState("");
  const [VM_Password, setVM_Password]=useState("");
  const [VM_FullName, setVM_FullName]=useState("");
  const [phone, setphone]=useState("");
  const [Province, setProvince]=useState("");

  const [error, setError] = useState("");


  const adminEmail = props.Email;
  const history = useNavigate();
  var respons;
  let access = 'VaccineManager';

  const saveData = async(event) =>
{
  event.preventDefault();
  if (
    VM_FullName.trim() === "" ||
    VM_Email.trim() === "" ||
    VM_Password.trim() === "" ||
    phone.trim() === "" ||
    id.trim() === "" ||
    Province.trim() === ""
  ) {
    setError("Please fill all the fields");
    return;
  }

  if (!cnicRegex.test(id)) {
    setError("CNIC must only contain numbers.");
    return;
  }

  if (!cnicRegex.test(phone)) {
    setError("Phone must only contain numbers.");
    return;
  }
    let formField = new FormData()
    formField.append('id',id)
    formField.append('VM_Email',VM_Email)
    formField.append('VM_Password',VM_Password)
    formField.append('VM_FullName',VM_FullName)
    formField.append('phone',phone)
    formField.append('province',Province)
    formField.append('adminEmail',adminEmail);
    formField.append('access',access)
         await axios({
          method: 'post',
          url:'http://127.0.0.1:8000/saveVaccineManager',
          data: formField
        }).then(response =>{  
           respons=response.status;
            console.log(respons);
          })
if (respons==200){
        history("/dashboard", { replace: true }) 
   }
}

  return (
    <>
    
    <Sidebar/>
    <div className="form">
    <Box m="20px">
      <Header title="CREATE a Vaccine Manager" subtitle="Create a New Vaccine Manager" />
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
                onChange={(e)=>{setVM_FullName(e.target.value)}}
                value={VM_FullName}
                name="VM_FullName"
                sx={{ gridColumn: "span 4" }}
              />
             
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Email"
                onBlur={handleBlur}
                onChange={(e)=>{setVM_Email(e.target.value)}}
                value={VM_Email}
                name="Email"
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="password"
                label="Password"
                onBlur={handleBlur}
                onChange={(e)=>{setVM_Password(e.target.value)}}
                value={VM_Password}
                name="Password"
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Contact Number"
                onBlur={handleBlur}
                onChange={(e)=>{setphone(e.target.value)}}
                value={phone}
                name="Contact"
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="CNIC"
                onBlur={handleBlur}
                onChange={(e)=>{setid(e.target.value)}}
                value={id}
                name="CNIC"
                sx={{ gridColumn: "span 3" }}
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
                sx={{ gridColumn: "span 1" }}
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


export default VM_Registration;