import React,{useState, useEffect} from 'react';
import { useNavigate} from 'react-router-dom'; 
import { Box, Button, TextField, MenuItem } from "@mui/material";
import { Formik } from "formik";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../Charts/Header";
import HCW_Sidebar from '../HCW_Sidebar/Sidebar';
import axios from 'axios';
import Topbar from '../../../scenes/global/Topbar';

const HCW_Vaccination_Record = (props) => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [isSidebar, setIsSidebar] = useState(true);

  const [Vaccine_Description, setVaccine_Description]=useState("");

  const [childIDs, setchildIDs] = useState([]);
  const [selectedchildIDs, setselectedchildIDs] = useState("");
  const [error,setError]=useState("");
  const [VaccineIDs, setVaccineIDs] = useState([]);
  const [selectedVaccineIDs, setselectedVaccineIDs] = useState("");

  const HCW_Email = props.Email
  const history = useNavigate();
  var respons;
  const anotherFunction=()=>{
    setError("")
    };
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
    axios.get('http://127.0.0.1:8000/saveVaccineAssignedToHCW')
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
  if(!selectedchildIDs || !selectedVaccineIDs || !Vaccine_Description || !HCW_Email )
  {
    setError("Please fill all the fields!")
    return;
  }
    console.log(selectedchildIDs)
    console.log(selectedVaccineIDs)
    let formField = new FormData()
    formField.append('childId',selectedchildIDs)
    formField.append('VaccineId',selectedVaccineIDs)
    formField.append('Description',Vaccine_Description)
    formField.append("RegisteredBy", HCW_Email)
    formField.append("HCWA_Email", HCW_Email)
         await axios({
          method: 'post',
          url:'http://127.0.0.1:8000/savevacr',
          data: formField
        }).then(response =>{  
           respons=response.status;
            console.log(respons);
          })
          // eslint-disable-next-line
if (respons==200){
        history("/HCW_Dashboard", { replace: true }) 
   }
   else{ 
    history("/signup")
}
}

  return (
    <>
    <div className="app">
    <HCW_Sidebar isSidebar={isSidebar} />
    <main className="content">
    <Topbar setIsSidebar={setIsSidebar} />
    <div className="form">
    <Box m="20px">
      <Header title="ADD Vaccination Record" subtitle="Add a New Vaccination Record" />

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
                  setselectedchildIDs(e.target.value); anotherFunction();
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
                onChange={(e)=>{setselectedVaccineIDs(e.target.value); anotherFunction();}}
                value={selectedVaccineIDs}
                name="Vaccine_ID"
                select
                // SelectProps={{ native: true }}
                sx={{ gridColumn: "span 2" }}
              >
                {VaccineIDs.map((vacc) => (
                  <MenuItem key={vacc.assigned_vaccine_id} value={vacc.assigned_vaccine_id}>
                    {`${vacc.assigned_vaccine_id} - ${vacc.vaccineName}`}
                  </MenuItem>
                ))}
              </TextField>

              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Vaccine Description"
                onBlur={handleBlur}
                onChange={(e)=>{setVaccine_Description(e.target.value); anotherFunction();}}
                value={Vaccine_Description}
                name="Vaccine_Description"
                sx={{ gridColumn: "span 4" }}
              />
<div className='errorMsg'>{error}</div>
            </Box>
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


export default HCW_Vaccination_Record;
