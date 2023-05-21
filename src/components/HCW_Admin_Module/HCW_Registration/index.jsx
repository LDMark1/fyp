import React,{useState, useEffect} from 'react';
import { useNavigate} from 'react-router-dom'; 
import { Box, Button, TextField } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../Charts/Header";
import HCW_Admin_Sidebar from '../HCW_Admin_Sidebar/Sidebar';
import axios from 'axios';


const baseURL = "http://127.0.0.1:8000/getRegionOf_HCWA";

const HCW_Registration = (props) => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [error,setError]=useState("");
  const [fullName, setfullName]=useState("");
  const [Email, setEmail]=useState("");
  const [Password, setPassword]=useState("");
  const [Contact, setContact]=useState("");
  const [id, setid]=useState("");
  const [region, setRegion] = useState("");
  const HCWA_Email = props.Email
  const history = useNavigate();
  let access = 'HealthCareWorker';
  var respons;
  console.log(HCWA_Email)
  
  useEffect(() => {
    if (props.Email) {
      fetch(`${baseURL}/?email=${props.Email}`)
        .then((data) => data.json())
        .then((data) => setRegion(data))
    }
  }, [props.Email])

  const anotherFunction=()=>{
    setError("")
    };
  const saveData = async(event) =>
{ event.preventDefault();if(!Email || !Password || !fullName || !Contact || !Password || !id || !HCWA_Email || !region || !access)
  {
    setError("Please fill all the fields!")
    return;
  }
    event.preventDefault()
    let formField = new FormData()
    formField.append('fullName',fullName)
    formField.append('Email',Email)
    formField.append('Password',Password)
    formField.append('contact',Contact)
    formField.append('id',id)
    formField.append('HCWA_Email',HCWA_Email)
    formField.append('region',region)
    formField.append('access',access)
         await axios({
          method: 'post',
          url:'http://127.0.0.1:8000/savehcw',
          data: formField
        }).then(response =>{  
           respons=response.status;
            console.log(respons);
          })
          // eslint-disable-next-line
if (respons==200){
        history("/hcw_admin_dashboard", { replace: true }) 
   }
   else{ 
    history("/signup")
}
}

  return (
    <>
    
    <HCW_Admin_Sidebar/>
    <div className="form">
    <Box m="20px">
      <Header title="CREATE Healthcare Worker" subtitle="Create a Healthcare Worker" />

      <Formik
        // onSubmit={handleFormSubmit}
        onSubmit={saveData}
        validationSchema={checkoutSchema}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          // handleChange,
          // handleSubmit,
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
                // error={!!touched.firstName && !!errors.firstName}
                // helperText={touched.firstName && errors.firstName}
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
                // error={!!touched.email && !!errors.email}
                // helperText={touched.email && errors.email}
                sx={{ gridColumn: "span 2" }}
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
                // error={!!touched.email && !!errors.email}
                // helperText={touched.email && errors.email}
                sx={{ gridColumn: "span 2" }}
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
                // error={!!touched.contact && !!errors.contact}
                // helperText={touched.contact && errors.contact}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="CNIC"
                onBlur={handleBlur}
                onChange={(e)=>{setid(e.target.value);  anotherFunction();}}
                value={id}
                name="CNIC"
                // error={!!touched.address2 && !!errors.address2}
                // helperText={touched.address2 && errors.address2}
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

const phoneRegExp =
  /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;

const checkoutSchema = yup.object().shape({
  firstName: yup.string().required("required"),
  lastName: yup.string().required("required"),
  email: yup.string().email("invalid email").required("required"),
  contact: yup
    .string()
    .matches(phoneRegExp, "Phone number is not valid")
    .required("required"),
  address1: yup.string().required("required"),
  address2: yup.string().required("required"),
});


export default HCW_Registration;
