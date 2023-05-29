import React,{useState, useEffect} from 'react';
import { useNavigate} from 'react-router-dom';
import { Box, Button, TextField } from "@mui/material";
import { Formik } from "formik";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../Charts/Header";
import OS_Sidebar from "../OS_Sidebar/Sidebar";
import axios from 'axios';
// import Topbar from '../../../scenes/global/Topbar';

const baseURL = "http://127.0.0.1:8000/getHospitalIDofOS";

const OS_Birth_Record = (props) => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [isSidebar, setIsSidebar] = useState(true);


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
  const [City, setCity]=useState("");
  const [Address, setAddress]=useState("");
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
    if(!id || !fullName || !Father_Email || !Password || !Contact || !Father_CNIC || !Mother_CNIC || !Gender || !childWeight || !childLength || !deliveryType || !City || !Address)
    {
      setError("Please fill all the fields!")
      return;
    }
    console.log(date)
    let formField = new FormData()
    formField.append("id",Father_CNIC)
    formField.append("Contact", Contact)
    formField.append("Address", Address)
    formField.append("City", City)
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
   <div className="app">
    <OS_Sidebar isSidebar={isSidebar} />
    <main className="content">
    {/* <Topbar setIsSidebar={setIsSidebar} /> */}
    <div className="form">
    <Box m="20px">
      <Header title="ADD Birth Record" subtitle="Add a New Birth Record" />

      <Formik
        // onSubmit={handleFormSubmit}
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
                onChange={(e)=>{setid(e.target.value); anotherFunction();}}
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
                onChange={(e)=>{setfullName(e.target.value); anotherFunction();}}
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
                onChange={(e)=>{setFather_Email(e.target.value); anotherFunction();}}
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
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="City"
                onBlur={handleBlur}
                onChange={(e)=>{setCity(e.target.value); anotherFunction();}}
                value={City}
                name="City"
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Address"
                onBlur={handleBlur}
                onChange={(e)=>{setAddress(e.target.value); anotherFunction();}}
                value={Address}
                name="Address"
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
                Add
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

export default OS_Birth_Record;
