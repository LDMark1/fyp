import React,{useState} from 'react';
import { Box, Button, TextField } from "@mui/material";
import { useNavigate} from 'react-router-dom'; 
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../Charts/Header";
import Sidebar from '../../../scenes/global/Sidebar';
import axios from 'axios';
import Topbar from '../../../scenes/global/Topbar'


const Hospital_Registration = (props) => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [isSidebar, setIsSidebar] = useState(true);


  // const [id, setHospital_ID]=useState("");
  const [hospitalName, setHospital_Name]=useState("");
  const [hospitalCity, setHospital_City]=useState("");
  const [hospitalProvince, setHospital_Province]=useState("");
  const [hospitalAddress, setAddress]=useState("");

  const [error, setError] = useState("");
  const adminEmail = props.Email;
  console.log(adminEmail);
  const history = useNavigate();
  var respons;
  const anotherFunction=()=>{
    setError("")
    };
  const saveData = async(event) =>
{
    event.preventDefault();
    if (
      hospitalName.trim() === "" ||
      hospitalCity.trim() === "" ||
      hospitalProvince.trim() === "" ||
      hospitalAddress.trim() === "" 
    ) {
      setError("Please fill all the fields");
      return;
    }
    let formField = new FormData()
    // formField.append('id',id)
    formField.append('hospitalName',hospitalName)
    formField.append('hospitalStatus',"Allowed")
    formField.append('hospitalCity',hospitalCity)
    formField.append('hospitalProvince',hospitalProvince)
    formField.append('hospitalAddress',hospitalAddress)
    formField.append('adminEmail',adminEmail)
         await axios({
          method: 'post',
          url:'http://127.0.0.1:8000/savehosp',
          data: formField
        }).then(response =>{  
           respons=response.status;
            console.log(respons);
          })
          // eslint-disable-next-line
if (respons==200){
        history("/dashboard", { replace: true }) 
   }
   else{ 
    history("/signup")
}
}

  return (
    <>
    <div className="app">
    <Sidebar isSidebar={isSidebar} />
    <main className="content">
    <Topbar setIsSidebar={setIsSidebar} />
    <div className="form">
    <Box m="20px">
      <Header title="REGISTER Hospital" subtitle="Register a New Hospital" />

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
                label="Hospital Name"
                onBlur={handleBlur}
                onChange={(e)=>{setHospital_Name(e.target.value);anotherFunction();}}
                value={hospitalName}
                name="Hospital_Name"
                sx={{ gridColumn: "span 4" }}
              />
               <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Hospital City"
                onBlur={handleBlur}
                onChange={(e)=>{setHospital_City(e.target.value);anotherFunction();}}
                value={hospitalCity}
                name="Hospital_City"
                sx={{ gridColumn: "span 2" }}
              />
                <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Hospital Province"
                onBlur={handleBlur}
                onChange={(e)=>{setHospital_Province(e.target.value);anotherFunction();}}
                value={hospitalProvince}
                name="Hospital_Province"
                sx={{ gridColumn: "span 2" }}
              />

              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Hospital Address"
                onBlur={handleBlur}
                onChange={(e)=>{setAddress(e.target.value);anotherFunction();}}
                value={hospitalAddress}
                name="Address"
                sx={{ gridColumn: "span 4" }}
              />
            </Box>
            <div className='errorMsg'>{error}</div>
            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" color="secondary" variant="contained">
                Register 
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


export default Hospital_Registration;
