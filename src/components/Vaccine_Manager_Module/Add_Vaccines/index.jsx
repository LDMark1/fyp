import React,{useState} from 'react';
import { Box, Button, TextField } from "@mui/material";
import { useNavigate} from 'react-router-dom'; 
import { Formik } from "formik";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../Charts/Header";
import Vaccine_Manager_Sidebar from '../Vaccine_Manager_Sidebar/Sidebar';
import axios from 'axios';

const cnicRegex = /^[0-9]+$/;

const Add_Vaccine = (props) => {
  const isNonMobile = useMediaQuery("(min-width:600px)");


  const [vaccineName, setvaccineName]=useState("");
  const [vaccinetype, setvaccinetype]=useState("");
  const [vaccinequantity, setvaccinequantity]=useState();
  const [vaccinedescription, setvaccinedescription]=useState("");
  const VMEmail = props.Email;

  const [error, setError] = useState("");

  const anotherFunction=()=>{
    setError("")
    };
  const history = useNavigate();
  var respons;

  const saveData = async(event) =>
{
    event.preventDefault();
    if (
      vaccineName.trim() === "" ||
      vaccinetype.trim() === "" ||
      vaccinequantity.trim() === "" ||
      vaccinedescription.trim() === "" 
    ) {
      setError("Please fill all the fields");
      return;
    }

    if (!cnicRegex.test(vaccinequantity)) {
      setError("Vaccine Quantity must only contain numbers.");
      return;
    }


    let formField = new FormData()
    formField.append('vaccineName',vaccineName)
    formField.append('vaccinetype',vaccinetype)
    formField.append('vaccinequantity',vaccinequantity)
    formField.append('vaccinedescription',vaccinedescription)
    formField.append('VM_Email',VMEmail)
         await axios({
          method: 'post',
          url:'http://127.0.0.1:8000/savevac',
          data: formField
        }).then(response =>{  
           respons=response.status;
            console.log(respons);
          })
if (respons==200){
        history("/Vaccine_Manager_Dashboard", { replace: true }) 
   }
}

  return (
    <>
    
    <Vaccine_Manager_Sidebar/>
    <div className="form">
    <Box m="20px">
      <Header title="ADD Vaccine" subtitle="Add a new Vaccine" />

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
                label="Vaccine Name"
                onBlur={handleBlur}
                onChange={(e)=>{setvaccineName(e.target.value);anotherFunction();}}
                value={vaccineName}
                name="Vaccine_Name"
                sx={{ gridColumn: "span 4" }}
              />
               <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Vaccine Type"
                onBlur={handleBlur}
                onChange={(e)=>{setvaccinetype(e.target.value);anotherFunction();}}
                value={vaccinetype}
                name="Vaccine_Type"
                sx={{ gridColumn: "span 2" }}
              />
                <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Vaccine Quantity"
                onBlur={handleBlur}
                onChange={(e)=>{setvaccinequantity(e.target.value);anotherFunction();}}
                value={vaccinequantity}
                name="Vaccine_Quantity"
                sx={{ gridColumn: "span 2" }}
              />

              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Vaccine Description"
                onBlur={handleBlur}
                onChange={(e)=>{setvaccinedescription(e.target.value);anotherFunction();}}
                value={vaccinedescription}
                name="Vaccine_Description"
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


export default Add_Vaccine;
