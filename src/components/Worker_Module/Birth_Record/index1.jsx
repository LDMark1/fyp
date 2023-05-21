import React,{useState, useEffect} from 'react';
import { useNavigate} from 'react-router-dom';
import { Box, Button, TextField } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../Charts/Header";
import OS_Sidebar from "../OS_Sidebar/Sidebar";
import axios from 'axios';

const baseURL = "http://127.0.0.1:8000/getHospitalIDofOS";

const OS_Birth_Record = (props) => {
  const isNonMobile = useMediaQuery("(min-width:600px)");


  const [id, setid]=useState("");
  const [error,setError]=useState("");
  const anotherFunction=()=>{
    setError("")
    };
  const [fullName, setfullName]=useState("");
  const [Father_Email, setFather_Email]=useState("");
  const [Password, setPassword]=useState("");
  const [Contact, setContact]=useState("");
  const [Father_CNIC, setFather_CNIC]=useState("");
  const [Mother_CNIC, setMother_CNIC]=useState("");
  const [Gender, setGender]=useState("");
  const [childWeight, setchildWeight]=useState("");
  const [childLength, setchildLength]=useState("");
  const [deliveryType, setdeliveryType]=useState("");
  const [Hospital_ID, setHospital_ID]=useState("");
  const OS_Email = props.Email
  let access = 'Parent'
  const temp_date = new Date();
  const date = temp_date.toLocaleString();
  const history = useNavigate();
  var respons;

  useEffect(() => {
    if (props.Email) {
      fetch(`${baseURL}/?OS_Email=${props.Email}`)
      .then((data) => data.json())
      .then((data) => setHospital_ID(data.id))
    }
  }, [props.Email])

  const saveData = async(event) =>
{
    event.preventDefault();
    if(!Father_CNIC || !Contact  || !Mother_CNIC  || !Father_Email  || !access  || !OS_Email  || !Password)
    {
      setError("Please fill all the fields!")
      return;
    }
    console.log(date)
    let formField = new FormData()
    formField.append("id",Father_CNIC)
    formField.append("Contact", Contact)
    formField.append("Mother_CNIC", Mother_CNIC)
    formField.append("Father_Email", Father_Email)
    formField.append("Password", Password)
    formField.append("access", access)
    formField.append("RegisteredBy", OS_Email)
         await axios({
          method: 'POST',
          url:'http://127.0.0.1:8000/saveParent',
          data: formField
        }).then(response =>{  
           respons=response.status;
            console.log(respons);
          })
          // eslint-disable-next-line
if (respons==200){
        let formField = new FormData()
        formField.append("id", id)
        formField.append("fullName", fullName)
        formField.append("Gender", Gender)
        formField.append("childWeight", childWeight)
        formField.append("childLength", childLength)
        formField.append("deliveryType", deliveryType)
        formField.append("birth_date", date)
        formField.append("Hospital_ID", Hospital_ID)
        formField.append("RegisteredBy", OS_Email)
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
            history("/OS_dashboard", { replace: true }) 
        }
   }
   else{ 
    history("/signup")
}
}

  return (
    <>
    
    <OS_Sidebar/>
    <div className="form">
    <Box m="20px">
      <Header title="ADD Birth Record" subtitle="Add a New Birth Record" />

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
          // <form onSubmit={handleSubmit}>
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
                onChange={(e)=>{setid(e.target.value); anotherFunction();}}
                value={id}
                name="id"
                // error={!!touched.firstName && !!errors.firstName}
                // helperText={touched.firstName && errors.firstName}
                sx={{ gridColumn: "span 1" }}
              />

              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Child Full Name"
                onBlur={handleBlur}
                onChange={(e)=>{setfullName(e.target.value); anotherFunction();}}
                value={fullName}
                name="firstName"
                // error={!!touched.firstName && !!errors.firstName}
                // helperText={touched.firstName && errors.firstName}
                sx={{ gridColumn: "span 3" }}
              />
              
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Father Email"
                onBlur={handleBlur}
                onChange={(e)=>{setFather_Email(e.target.value); anotherFunction();}}
                value={Father_Email}
                name="Father_Email"
                // error={!!touched.email && !!errors.email}
                // helperText={touched.email && errors.email}
                sx={{ gridColumn: "span 1" }}
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
                onChange={(e)=>{setContact(e.target.value); anotherFunction();}}
                value={Contact}
                name="Contact"
                // error={!!touched.contact && !!errors.contact}
                // helperText={touched.contact && errors.contact}
                sx={{ gridColumn: "span 1" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Father CNIC"
                onBlur={handleBlur}
                onChange={(e)=>{setFather_CNIC(e.target.value); anotherFunction();}}
                value={Father_CNIC}
                name="Father_CNIC"
                // error={!!touched.address2 && !!errors.address2}
                // helperText={touched.address2 && errors.address2}
                sx={{ gridColumn: "span 2" }}
              />
                 <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Mother CNIC"
                onBlur={handleBlur}
                onChange={(e)=>{setMother_CNIC(e.target.value); anotherFunction();}}
                value={Mother_CNIC}
                name="Mother_CNIC"
                // error={!!touched.address2 && !!errors.address2}
                // helperText={touched.address2 && errors.address2}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Gender"
                onBlur={handleBlur}
                onChange={(e)=>{setGender(e.target.value); anotherFunction();}}
                value={Gender}
                name="Gender"
                // error={!!touched.address2 && !!errors.address2}
                // helperText={touched.address2 && errors.address2}
                sx={{ gridColumn: "span 1" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Child Weight"
                onBlur={handleBlur}
                onChange={(e)=>{setchildWeight(e.target.value); anotherFunction();}}
                value={childWeight}
                name="childWeight"
                // error={!!touched.address2 && !!errors.address2}
                // helperText={touched.address2 && errors.address2}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Child Length"
                onBlur={handleBlur}
                onChange={(e)=>{setchildLength(e.target.value); anotherFunction();}}
                value={childLength}
                name="childLength"
                // error={!!touched.address2 && !!errors.address2}
                // helperText={touched.address2 && errors.address2}
                sx={{ gridColumn: "span 1" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Delivery Type"
                onBlur={handleBlur}
                onChange={(e)=>{setdeliveryType(e.target.value); anotherFunction();}}
                value={deliveryType}
                name="deliveryType"
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
                // onChange={(e)=>{setHospital_ID(e.target.value)}}
                value={Hospital_ID}
                name="Hospital_ID"
                // error={!!touched.address2 && !!errors.address2}
                // helperText={touched.address2 && errors.address2}
                sx={{ gridColumn: "span 1" }}
              />
             
            </Box>
            <div className='errorMsg'>{error}</div>
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

export default OS_Birth_Record;
