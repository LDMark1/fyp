import React,{useState, useEffect} from 'react';
import { useNavigate} from 'react-router-dom'; 
import { Box, Button, TextField } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../Charts/Header";
import MSI_Sidebar from "../MSI_Sidebar/Sidebar";
import axios from 'axios';

const baseURL = "http://127.0.0.1:8000/getHospitalIDofMSI";

const OS_Registration = (props) => {
  const isNonMobile = useMediaQuery("(min-width:600px)");

  // const handleFormSubmit = (values) => {
  //   console.log(values);
  // };
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
    
    <MSI_Sidebar/>
    <div className="form">
    <Box m="20px">
      <Header title="CREATE Operating Staff" subtitle="Create a New Operating Staff" />

      <Formik
        // onSubmit={handleFormSubmit}
        onSubmit={saveData}
        initialValues={initialValues}
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
                // error={!!touched.lastName && !!errors.lastName}
                // helperText={touched.lastName && errors.lastName}
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
                // error={!!touched.email && !!errors.email}
                // helperText={touched.email && errors.email}
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
                onChange={(e)=>{setCNIC(e.target.value);  anotherFunction();}}
                value={CNIC}
                name="CNIC"
                // error={!!touched.address2 && !!errors.address2}
                // helperText={touched.address2 && errors.address2}
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
const initialValues = {
  firstName: "",
  lastName: "",
  email: "",
  contact: "",
  address1: "",
  address2: "",
};

export default OS_Registration;
