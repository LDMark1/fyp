import React,{useState, useEffect} from 'react';
import { useNavigate} from 'react-router-dom'; 
import { Box, Button, TextField } from "@mui/material";
import { Formik } from "formik";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../Charts/Header";
import MSI_Sidebar from "../MSI_Sidebar/Sidebar";
import axios from 'axios';
import Topbar from '../../../scenes/global/Topbar';

const baseURL = "http://127.0.0.1:8000/getHospitalIDofMSI";

const OS_Registration = (props) => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [isSidebar, setIsSidebar] = useState(true);

  const anotherFunction=()=>{
    setError("")
    };
  const [error,setError]=useState("");
  const [fullName, setfullName]=useState("");
  const [Email, setEmail]=useState("");
  const [Password, setPassword]=useState("");
  const [Contact, setContact]=useState("");
  const [CNIC, setCNIC]=useState();
  const [Hospital_ID, setHospital_ID]=useState();
  const MSI_Email = props.Email
  const history = useNavigate();
  let access = 'OperatingStaff'
  var respons;
  useEffect(() => {
    if (props.Email) {
      fetch(`${baseURL}/?msi_email=${props.Email}`)
      .then((data) => data.json())
      .then((data) => setHospital_ID(data.id))
    }
  }, [props.Email])

  console.log(MSI_Email)
  console.log(Hospital_ID)
  const saveData = async(event) =>
{
    event.preventDefault()
    if(!Email || !Password || !fullName || !Contact || !CNIC || !Hospital_ID || !MSI_Email || !access)
    {
      setError("Please fill all the fields!")
      return;
    }
    let formField = new FormData()
    formField.append('OS_fullName',fullName)
    formField.append('OS_Email',Email)
    formField.append('OS_Password',Password)
    formField.append('OS_Contact',Contact)
    formField.append('id',CNIC)
    formField.append('Hospital_ID',Hospital_ID)
    formField.append('MSI_Email',MSI_Email)
    formField.append('access',access)
         await axios({
          method: 'POST',
          url:'http://127.0.0.1:8000/saveOperatingStaff',
          data: formField
        }).then(response =>{  
           respons=response.status;
            console.log(respons);
          })
          // eslint-disable-next-line
if (respons==200){
        history("/msi_dashboard", { replace: true }) 
   }
   else{ 
    history("/signup")
}
}

  return (
    <>
    <div className="app">
    <MSI_Sidebar isSidebar={isSidebar} />
    <main className="content">
    <Topbar setIsSidebar={setIsSidebar} />
    <div className="form">
    <Box m="20px">
      <Header title="CREATE Operating Staff" subtitle="Create a New Operating Staff" />

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
                onChange={(e)=>{setfullName(e.target.value);  anotherFunction();}}
                value={fullName}
                name="fullName"
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Email"
                onBlur={handleBlur}
                onChange={(e)=>{setEmail(e.target.value);  anotherFunction();}}
                value={Email}
                name="Email"
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="password"
                label="Password"
                onBlur={handleBlur}
                onChange={(e)=>{setPassword(e.target.value);  anotherFunction();}}
                value={Password}
                name="Password"
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Contact Number"
                onBlur={handleBlur}
                onChange={(e)=>{setContact(e.target.value);  anotherFunction();}}
                value={Contact}
                name="Contact"
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="CNIC"
                onBlur={handleBlur}
                onChange={(e)=>{setCNIC(e.target.value);  anotherFunction();}}
                value={CNIC}
                name="CNIC"
                sx={{ gridColumn: "span 3" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Hospital ID"
                onBlur={handleBlur}
                value={Hospital_ID}
                name="Hospital_ID"
                
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
    </main>
    </div>
    </>
  );
};

export default OS_Registration;
