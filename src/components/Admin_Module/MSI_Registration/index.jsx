import React,{useState, useEffect} from 'react';
import { useNavigate} from 'react-router-dom'; 
import { Box, Button, TextField, MenuItem } from "@mui/material";
import { Formik } from "formik";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../Charts/Header";
import Sidebar from "../../../scenes/global/Sidebar";
import axios from 'axios';

const cnicRegex = /^[0-9]+$/;

const MSI_Registration = (props) => {
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const [id, setid]=useState("");

  const [hospitalIDs, setHospitalIDs] = useState([]);
  const [selectedHospitalID, setSelectedHospitalID] = useState("");

  const [medicalSuperIntendentEmail, setmedicalSuperIntendentEmail]=useState("");
  const [medicalSuperIntendentPassword, setmedicalSuperIntendentPassword]=useState("");
  const [medicalSuperIntendentFullName, setmedicalSuperIntendentFullName]=useState("");
  const [phone, setphone]=useState("");

  const [error, setError] = useState("");

  const adminEmail = props.Email;
  const history = useNavigate();
  var respons;
  let access = 'MedicalSuperIntendent';

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/hospital_ids')
      .then(response => {
        setHospitalIDs(response.data);
        // setHospitalNames(response.data.map(hospital => hospital.name));
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  const saveData = async(event) =>
{
    event.preventDefault();
    if (
      id.trim() === "" ||
      medicalSuperIntendentEmail.trim() === "" ||
      medicalSuperIntendentPassword.trim() === "" ||
      medicalSuperIntendentFullName.trim() === "" ||
      phone.trim() === "" ||
      String(selectedHospitalID).trim() === ""
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
    formField.append('medicalSuperIntendentEmail',medicalSuperIntendentEmail)
    formField.append('medicalSuperIntendentPassword',medicalSuperIntendentPassword)
    formField.append('medicalSuperIntendentFullName',medicalSuperIntendentFullName)
    formField.append('phone',phone)
    formField.append('hospitalID',selectedHospitalID)
    formField.append('adminEmail',adminEmail)
    formField.append('access',access)
         await axios({
          method: 'POST',
          url:'http://127.0.0.1:8000/savemsi',
          data: formField
        }).then(response =>{  
           respons=response.status;
            console.log(respons);
          })
          // eslint-disable-next-line
if (respons==200){
        history("/dashboard", { replace: true }) 
   }
}

  return (
    <>
    
    <Sidebar/>
    <div className="form">
    <Box m="20px">
      <Header title="CREATE Medical Superintendent" subtitle="Create a New Medical Superintendent" />

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
                onChange={(e)=>{setmedicalSuperIntendentFullName(e.target.value)}}
                value={medicalSuperIntendentFullName}
                name="medicalSuperIntendentFullName"
                sx={{ gridColumn: "span 2" }}
              />
            
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Email"
                onBlur={handleBlur}
                onChange={(e)=>{setmedicalSuperIntendentEmail(e.target.value)}}
                value={medicalSuperIntendentEmail}
                name="Email"
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="password"
                label="Password"
                onBlur={handleBlur}
                onChange={(e)=>{setmedicalSuperIntendentPassword(e.target.value)}}
                value={medicalSuperIntendentPassword}
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
                label="Hospital ID"
                onBlur={handleBlur}
                onChange={(e) => {
                  setSelectedHospitalID(e.target.value);
                }}
                value={selectedHospitalID}
                name="Hospital_ID"
                select
                sx={{ gridColumn: "span 1" }}
              >
                {hospitalIDs.map((hospital) => (
                  <MenuItem key={hospital.id} value={hospital.id}>
                    {`${hospital.id} - ${hospital.hospitalName}`}
                  </MenuItem>
                ))}
              </TextField>
              
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


export default MSI_Registration;
