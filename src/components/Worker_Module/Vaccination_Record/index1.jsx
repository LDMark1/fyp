import React,{useState, useEffect} from 'react';
import { useNavigate} from 'react-router-dom'; 
import { Box, Button, TextField, MenuItem } from "@mui/material";
import { Formik } from "formik";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../Charts/Header";
import OS_Sidebar from "../OS_Sidebar/Sidebar";
import axios from 'axios';

const baseURL = "http://127.0.0.1:8000/getHospitalIDofOS";

const OS_Vaccination_Record = (props) => {
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const [Vaccine_Description, setVaccine_Description]=useState("");

  const [childIDs, setchildIDs] = useState([]);
  const [selectedchildIDs, setselectedchildIDs] = useState("");

  const [VaccineIDs, setVaccineIDs] = useState([]);
  const [selectedVaccineIDs, setselectedVaccineIDs] = useState("");

  const [Vaccine_Quantity, setVaccine_Quantity]=useState('');


  const [Hospital_ID, setHospital_ID] = useState("")


  const OS_Email = props.Email
  const history = useNavigate();
  var respons;


  useEffect(() => {
    if (props.Email) {
      fetch(`${baseURL}/?OS_Email=${props.Email}`)
      .then((data) => data.json())
      .then((data) => setHospital_ID(data.id))
    }
  }, [props.Email])


  useEffect(() => {
    if (props.Email) {
      fetch(`http://127.0.0.1:8000/getVaccQuantityOfHosp/?assigned_vaccine_id=${selectedVaccineIDs}&Hospital_ID=${Hospital_ID}`)
        .then((data) => data.json())
        .then((data) => setVaccine_Quantity(data.Vaccine_Quantity))
    }
  }, [selectedVaccineIDs])

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
    axios.get('http://127.0.0.1:8000/saveVaccineAssignedToHospital')
      .then(response => {
        setVaccineIDs(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  const saveData = async(event) =>
{
    event.preventDefault()
    let QuantityInHospitalStock;
    console.log(selectedchildIDs)
    console.log(selectedVaccineIDs)
    let formField = new FormData()
    formField.append('childId',selectedchildIDs)
    formField.append('VaccineId',selectedVaccineIDs)
    formField.append('Description',Vaccine_Description)
    formField.append('RegisteredBy',OS_Email)
    formField.append('hospital_id',Hospital_ID)
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
        history("/OS_Dashboard", { replace: true }) 
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
                  setselectedchildIDs(e.target.value);
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
                onChange={(e)=>{setselectedVaccineIDs(e.target.value)}}
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
                onChange={(e)=>{setVaccine_Description(e.target.value)}}
                value={Vaccine_Description}
                name="Vaccine_Description"
                sx={{ gridColumn: "span 4" }}
              />

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
    </>
  );
};

export default OS_Vaccination_Record;
