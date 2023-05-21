import React,{useState, useEffect} from 'react';
import { useNavigate} from 'react-router-dom'; 
import { Box, Button, TextField } from "@mui/material";
import { Formik } from "formik";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../Charts/Header";
import Director_EPI_Sidebar from "../Director_EPI_Sidebar/Sidebar";
import axios from 'axios';
import Topbar from '../../../scenes/global/Topbar';


const baseURL = "http://127.0.0.1:8000/getProvinceOfDirectorEPI";



const HCW_Admin_Registration = (props) => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [isSidebar, setIsSidebar] = useState(true);

  const [fullName, setfullName]=useState("");
  const [Email, setEmail]=useState("");
  const [Password, setPassword]=useState("");
  const [Contact, setContact]=useState("");
  const [province, setprovince]=useState("");
  const [region, setRegion]=useState("");
  const [id, setid]=useState();
  const [error,setError]=useState("");
  const directorEPI_Email = props.Email;
  const history = useNavigate();
  let access = 'HealthCareWorkerAdmin';
  var respons;
  console.log(directorEPI_Email);
  const anotherFunction=()=>{
    setError("")
    };
  useEffect(() => {
    if (props.Email) {
      fetch(`${baseURL}/?directorEPIEmail=${props.Email}`)
        .then((data) => data.json())
        .then((data) => setprovince(data))
    }
  }, [props.Email])

  const saveData = async(event) =>
{
  event.preventDefault();
  if(!fullName || !Email || !Password || !Contact || !province || !region)
  {
    setError("Please fill all the fields!")
    return;
  }
    let formField = new FormData()
    formField.append('fullName',fullName)
    formField.append('email',Email)
    formField.append('password',Password)
    formField.append('contact',Contact)
    formField.append('id',id)
    formField.append('directorEPI_Email',directorEPI_Email)
    formField.append('province',province)
    formField.append('region',region)
    formField.append('access',access)
         await axios({
          method: 'post',
          url:'http://127.0.0.1:8000/saveHCWAdmin',
          data: formField
        }).then(response =>{  
           respons=response.status;
            console.log(respons);
          })
          // eslint-disable-next-line
if (respons==200){
        history("/Director_EPI_Dashboard", { replace: true }) 
   }
   else{ 
    history("/signup")
}
}

  return (
    <>
    <div className="app">
    <Director_EPI_Sidebar isSidebar={isSidebar} />
    <main className="content">
    <Topbar setIsSidebar={setIsSidebar}/>
    <div className="form">
    <Box m="20px">
      <Header title="CREATE Healthcare Worker Admin" subtitle="Create a Healthcare Worker Admin" />

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
                onChange={(e)=>{setfullName(e.target.value); anotherFunction();}}
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
                onChange={(e)=>{setEmail(e.target.value); anotherFunction();}}
                value={Email}
                name="Email"
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="password"
                label="Password"
                onBlur={handleBlur}
                onChange={(e)=>{setPassword(e.target.value); anotherFunction();}}
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
                onChange={(e)=>{setContact(e.target.value); anotherFunction();}}
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
                onChange={(e)=>{setid(e.target.value); anotherFunction();}}
                value={id}
                name="CNIC"
                sx={{ gridColumn: "span 2" }}
              />

              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Region"
                onBlur={handleBlur}
                onChange={(e)=>{setRegion(e.target.value); anotherFunction();}}
                value={region}
                name="region"
                sx={{ gridColumn: "span 2" }}
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


export default HCW_Admin_Registration;
