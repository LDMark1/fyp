import React,{useState, useEffect} from 'react';
import { Box, Button, TextField, MenuItem } from "@mui/material";
import { useNavigate} from 'react-router-dom'; 
import { Formik } from "formik";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../Charts/Header";
import Director_EPI_Sidebar from '../Director_EPI_Sidebar/Sidebar';
import axios from 'axios';
import Topbar from '../../../scenes/global/Topbar';

const baseURL = "http://127.0.0.1:8000/saveHCWAdmin";

const HCW_Admin_Vaccination_Assignment = (props) => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [isSidebar, setIsSidebar] = useState(true);

  const [Vaccine_Quantity, setVaccine_Quantity]=useState();

  const [HCWAIDs, setHCWAIDs] = useState([]);
  const [selectedHCWAIDs, setselectedHCWAIDs] = useState("");

  const [VaccineIDs, setVaccineIDs] = useState([]);
  const [selectedVaccineIDs, setselectedVaccineIDs] = useState("");

  const [QuantityInStock, setQuantityInStock] = useState("");
  const anotherFunction=()=>{
    setError("")
    };
  const [check, setCheck] = useState('');
  const [error, setError] = useState('');

  const email = props.Email
  const history = useNavigate();
  var respons;
 
  useEffect(() => {
    if (props.Email) {
      fetch(`http://127.0.0.1:8000/CheckAssignmentViewForHCWA/?assigned_vaccine_id=${selectedVaccineIDs}&HCWA_ID=${selectedHCWAIDs}`)
        .then((data) => data.json())
        .then((data) => setCheck(data))
    }
  }, [selectedVaccineIDs, selectedHCWAIDs])

  useEffect(() => {
    fetch(baseURL)
      .then((data) => data.json())
      .then((data) => setHCWAIDs(data))
  }, [])

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/saveVaccineAssignedToDirectorEPI')
      .then(response => {
        setVaccineIDs(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);


  useEffect(() => {
    axios.get(`http://127.0.0.1:8000/getVacForDEPI/?assigned_vaccine_id=${selectedVaccineIDs}&directorEPIEmail=${props.Email}`)
      .then(response => {
        setQuantityInStock(response.data[0].Vaccine_Quantity)
      })
      .catch(error => {
        console.log(error);
      });
  }, [selectedVaccineIDs]);

  const saveData = async(event) =>
{
    event.preventDefault();
    if(!selectedHCWAIDs || !selectedVaccineIDs  || !QuantityInStock)
    {
      setError("Please fill all the fields!")
      return;
    }
    let QuantityInHCWAStock;
    if(check.assignment_exists)
    {
      let formField = new FormData()
      formField.append('hcwAdminID', selectedHCWAIDs)
      formField.append('assigned_vaccine_id', selectedVaccineIDs)
      formField.append('QuantityInStock', QuantityInStock)
      await axios({
        method: 'put',
        url:'http://127.0.0.1:8000/saveVaccineAssignedToHealthCareWorkerAdmin',
        data: formField
      }).then(response =>{  
         console.log(response.data)
         QuantityInHCWAStock = response.data.Vaccine_Quantity
         console.log(QuantityInStock)
         return            
        })
        if(QuantityInStock-Vaccine_Quantity >= 0)
      {
        formField.append('newQuantity', parseInt(QuantityInHCWAStock) + parseInt(Vaccine_Quantity));
        formField.append('oldQuantity', parseInt(QuantityInStock) - parseInt(Vaccine_Quantity));
        await axios({
          method: 'put',
          url:'http://127.0.0.1:8000/updatingVacQuantityForHCWA',
          data: formField
        }).then(response =>{  
           respons=response.status;
           console.log(response.data)            
          })
          if (respons==200)
          {
            history("/Director_EPI_Dashboard", { replace: true })
            return 
            }
      }
      else{
        setError("Assignment Quantity exceeds quantity in stock")
      }
    }
    let formField = new FormData()
    formField.append('hcwAdminID',selectedHCWAIDs)
    formField.append('assigned_vaccine_id',selectedVaccineIDs)
    formField.append('Vaccine_Quantity',Vaccine_Quantity)
    formField.append('directorEPI_Email', email)
         await axios({
          method: 'POST',
          url:'http://127.0.0.1:8000/saveVaccineAssignedToHealthCareWorkerAdmin',
          data: formField
        }).then(response =>{  
           respons=response.status;
            console.log(respons);
          })
if (respons==200){
        history("/director_epi_dashboard", { replace: true }) 
   }
   else{ 
    history("/signup")
}
}

  return (
    <>
    <div className="app">
    <Director_EPI_Sidebar isSidebar={isSidebar} />
    <main className="content">
    <Topbar setIsSidebar={setIsSidebar}/>
    <div className="form">
    <Box m="20px">
      <Header title="Assign Vaccine" subtitle="Assign Vaccine To a Healthcare Worker Admin" />

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
                label="Healthcare Worker Admin ID"
                onBlur={handleBlur}
                onChange={(e) => {
                  setselectedHCWAIDs(e.target.value);
                  anotherFunction();
                }}
                value={selectedHCWAIDs}
                name="HCW_Admin_ID"
                select
                sx={{ gridColumn: "span 4" }}
                >
                {HCWAIDs.map((HealthCareWorkerAdmin) => (
                  <MenuItem key={HealthCareWorkerAdmin.id} value={HealthCareWorkerAdmin.id}>
                    {`${HealthCareWorkerAdmin.id} - ${HealthCareWorkerAdmin.fullName}`}
                  </MenuItem>
                ))}
              </TextField>

              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Vaccine ID"
                onBlur={handleBlur}
                onChange={(e) => {
                  setselectedVaccineIDs(e.target.value);
                  anotherFunction();
                }}
                value={selectedVaccineIDs}
                name="Vaccine_ID"
                select
                sx={{ gridColumn: "span 2" }}
                >
                {VaccineIDs.map((vaccine) => (
                  <MenuItem key={vaccine.id} value={vaccine.id}>
                    {`${vaccine.id} - ${vaccine.vaccineName}`}
                  </MenuItem>
                ))}
              </TextField>


               <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Vaccine Quantity"
                onBlur={handleBlur}
                onChange={(e)=>{setVaccine_Quantity(e.target.value);
                  anotherFunction();}}
                value={Vaccine_Quantity}
                name="Vaccine_Quantity"
                sx={{ gridColumn: "span 2" }}
              />
                
            </Box>
            <div className='errorMsg'>{error}</div>
            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" color="secondary" variant="contained">
                Assign 
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


export default HCW_Admin_Vaccination_Assignment;
