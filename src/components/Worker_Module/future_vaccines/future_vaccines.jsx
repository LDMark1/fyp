/* 
Once the future_vaccines form is registered, use the OS_Email to find hospital id and hospital
city, add a city field in healthcareworker as well, then write a view to show these future
vaccines to the healthcareworker that has the same city as the hospital.
Also write a view to show these future_vaccines to the parent of that child. 
You can use getHospitalIDofOS/ url to retrieve the hospital ID, use props.Email and pass it
as a parameter to get the hospitalID. 
*/

import React,{useState, useEffect} from 'react';
import { useNavigate} from 'react-router-dom'; 
import { Box, Button, TextField, MenuItem } from "@mui/material";
import { Formik } from "formik";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../Charts/Header";
import OS_Sidebar from "../OS_Sidebar/Sidebar";
import axios from 'axios';
import Topbar from '../../../scenes/global/Topbar';

const Adding_Future_Vaccines = (props) => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [isSidebar, setIsSidebar] = useState(true);
  
  const [error,setError]=useState("");
  const [Vaccine_Description, setVaccine_Description]=useState("");
  const anotherFunction=()=>{
    setError("")
    };
  const [childIDs, setchildIDs] = useState([]);
  const [selectedchildIDs, setselectedchildIDs] = useState("");

  const [VaccineIDs, setVaccineIDs] = useState([]);
  const [selectedVaccineIDs, setselectedVaccineIDs] = useState("");

  
  const [HCWIDs, setHCWIDs] = useState([]);
  const [selectedHCWIDs, setselectedHCWIDs] = useState("");
  const [date, setdate]=useState('');



  const OS_Email = props.Email
  const history = useNavigate();
  var respons;


  

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/savehcw')
      .then(response => {
        setHCWIDs(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);



  useEffect(() => {
    axios.get('http://127.0.0.1:8000/saveBirthRecord')
      .then(response => {
        setchildIDs(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/Vaccine_IdsView')
      .then(response => {
        setVaccineIDs(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  const saveData = async(event) =>
{
    event.preventDefault();
    if(!selectedchildIDs || !selectedVaccineIDs  || !Vaccine_Description  || !date)
    {
      setError("Please fill all the fields!")
      return;
    }
    let formField = new FormData()
    formField.append('child_id',selectedchildIDs)
    formField.append('VaccineId',selectedVaccineIDs)
    formField.append('Description',Vaccine_Description)
    formField.append('Date',date)
    formField.append('OS_Email',OS_Email)
    formField.append('HCW_Email',selectedHCWIDs)
         await axios({
          method: 'post',
          url:'http://127.0.0.1:8000/saveFutureVaccines',
          data: formField
        }).then(response =>{  
           respons=response.status;
            console.log(respons);
          })
if (respons==200){
        history("/OS_Dashboard", { replace: true }) 
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
    <Topbar setIsSidebar={setIsSidebar} />
    <div className="form">
    <Box m="20px">
      <Header title="ADD Future Records" subtitle="Add a New Future Vaccine Record For Child" />

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
                label="Child ID"
                onBlur={handleBlur}
                onChange={(e) => {
                  setselectedchildIDs(e.target.value);anotherFunction();
                }}
                value={selectedchildIDs}
                name="childID"
                select
                sx={{ gridColumn: "span 2" }}
              >
                {childIDs.map((birthRecord) => (
                  <MenuItem key={birthRecord.id} value={birthRecord.id}>
                    {`${birthRecord.id} - ${birthRecord.fullName}`}
                  </MenuItem>
                ))}
              </TextField>

              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Vaccine ID"
                onBlur={handleBlur}
                onChange={(e)=>{setselectedVaccineIDs(e.target.value);anotherFunction();}}
                value={selectedVaccineIDs}
                name="Vaccine_ID"
                select
                // SelectProps={{ native: true }}
                sx={{ gridColumn: "span 2" }}
              >
                {VaccineIDs.map((vacc) => (
                  <MenuItem key={vacc.id} value={vacc.id}>
                    {`${vacc.id} - ${vacc.vaccineName}`}
                  </MenuItem>
                ))}
              </TextField>

              <TextField
                fullWidth
                variant="filled"
                type="date"
                onBlur={handleBlur}
                onChange={(e)=>{setdate(e.target.value);anotherFunction();}}
                value={date}
                name="Vaccine_Description"
                sx={{ gridColumn: "span 2" }}
              /> 
                   <TextField
                fullWidth
                variant="filled"
                type="text"
                label="HealthCare Worker "
                onBlur={handleBlur}
                onChange={(e)=>{setselectedHCWIDs(e.target.value);anotherFunction();}}
                value={selectedHCWIDs}
                select
                // SelectProps={{ native: true }}
                sx={{ gridColumn: "span 2" }}
              >
                {HCWIDs.map((vacc) => (
                  <MenuItem key={vacc.fullName} value={vacc.Email}>
                    {`${vacc.fullName} - ${vacc.city}`}
                  </MenuItem>
                ))}
              </TextField>

             
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Notification Description"
                onBlur={handleBlur}
                onChange={(e)=>{setVaccine_Description(e.target.value);anotherFunction();}}
                value={Vaccine_Description}
                name="Vaccine_Description"
                sx={{ gridColumn: "span 4" }}
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

export default Adding_Future_Vaccines;
