import React,{useState, useEffect} from 'react';
import { Box, Button, TextField, MenuItem } from "@mui/material";
import { useNavigate} from 'react-router-dom'; 
import { Formik } from "formik";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../Charts/Header";
import HCW_Admin_Sidebar from '../HCW_Admin_Sidebar/Sidebar';
import axios from 'axios';

const baseURL = "http://127.0.0.1:8000/getRegionOf_HCWA";
const baseURL1 = "http://127.0.0.1:8000/get_HCW_For_HCWA";

const HCW_Vaccination_Assignment = (props) => {
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const [HCWIDs, setHCWIDs] = useState([]);
  const [selectedHCWIDs, setselectedHCWIDs] = useState("");

  const [VaccineIDs, setVaccineIDs] = useState([]);
  const [selectedVaccineIDs, setselectedVaccineIDs] = useState("");

  const [region, setRegion] = useState("")

  const [Vaccine_Quantity, setVaccine_Quantity]=useState();

  const [QuantityInStock, setQuantityInStock] = useState("");

  const [check, setCheck] = useState('');
  const [error, setError] = useState('');

  const HCWA_Email = props.Email
  const history = useNavigate();
  var respons;

  useEffect(() => {
    if (props.Email) {
      fetch(`http://127.0.0.1:8000/CheckAssignmentViewForHCW/?assigned_vaccine_id=${selectedVaccineIDs}&HCW_ID=${selectedHCWIDs}`)
        .then((data) => data.json())
        .then((data) => setCheck(data))
    }
  }, [selectedVaccineIDs, selectedHCWIDs])
console.log(check)
  useEffect(() => {
    if (props.Email) {
      fetch(`${baseURL}/?email=${props.Email}`)
      .then((data) => data.json())
      .then((data) => setRegion(data))
    }
  }, [props.Email])

  useEffect(() => {
    if (region) {
      fetch(`${baseURL1}/?region=${region}`)
      .then((data) => data.json())
      .then((data) => setHCWIDs(data))
    }
  }, [region])

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/saveVaccineAssignedToHealthCareWorkerAdmin')
      .then(response => {
        setVaccineIDs(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);
  const anotherFunction=()=>{
    setError("")
    };
  useEffect(() => {
    axios.get(`http://127.0.0.1:8000/getVacForHCWA/?assigned_vaccine_id=${selectedVaccineIDs}&HCWA_Email=${props.Email}`)
      .then(response => {
        setQuantityInStock(response.data[0].Vaccine_Quantity)
      })
      .catch(error => {
        console.log(error);
      });
  }, [selectedVaccineIDs]);
  
  const saveData = async(event) =>
{
    event.preventDefault()
    if(!selectedHCWIDs || !selectedVaccineIDs || !QuantityInStock)
    {
      setError("Please fill all the fields!")
      return;
    }
    let QuantityInHCWStock;
    if(check.assignment_exists)
    {
      let formField = new FormData()
      formField.append('HCW_ID', selectedHCWIDs)
      formField.append('assigned_vaccine_id', selectedVaccineIDs)
      formField.append('QuantityInStock', QuantityInStock)
      await axios({
        method: 'put',
        url:'http://127.0.0.1:8000/saveVaccineAssignedToHCW',
        data: formField
      }).then(response =>{  
         console.log(response.data)
         QuantityInHCWStock = response.data.Vaccine_Quantity
         console.log(QuantityInStock)
         return            
        })
        if(QuantityInStock-Vaccine_Quantity >= 0)
      {
        formField.append('newQuantity', parseInt(QuantityInHCWStock) + parseInt(Vaccine_Quantity));
        formField.append('oldQuantity', parseInt(QuantityInStock) - parseInt(Vaccine_Quantity));
        await axios({
          method: 'put',
          url:'http://127.0.0.1:8000/updatingVacQuantityForHCW',
          data: formField
        }).then(response =>{  
           respons=response.status;
           console.log(response.data)            
          })
          if (respons==200)
          {
            history("/hcw_admin_dashboard", { replace: true })
            return 
            }
      }
      else{
        setError("Assignment Quantity exceeds quantity in stock")
      }
    }
    let formField = new FormData()
    formField.append('assigned_vaccine_id',selectedVaccineIDs)
    formField.append('HCW_ID',selectedHCWIDs)
    formField.append('Vaccine_Quantity',Vaccine_Quantity)
    formField.append('HCWA_Email', HCWA_Email)
         await axios({
          method: 'post',
          url:'http://127.0.0.1:8000/saveVaccineAssignedToHCW',
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
                label="Healthcare Worker ID"
                onBlur={handleBlur}
                onChange={(e) => {
                  setselectedHCWIDs(e.target.value);anotherFunction();
                }}
                value={selectedHCWIDs}
                name="HCW_ID"
                select
                sx={{ gridColumn: "span 4" }}
              >
                {HCWIDs.map((healthcareworker) => (
                  <MenuItem key={healthcareworker.id} value={healthcareworker.id}>
                    {`${healthcareworker.id} - ${healthcareworker.fullName}`}
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
                  <MenuItem key={vaccine.assigned_vaccine_id} value={vaccine.assigned_vaccine_id}>
                    {`${vaccine.assigned_vaccine_id} - ${vaccine.vaccineName}`}
                  </MenuItem>
                ))}
              </TextField>

               <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Vaccine Quantity"
                onBlur={handleBlur}
                onChange={(e)=>{setVaccine_Quantity(e.target.value);anotherFunction();}}
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
    </>
  );
};

export default HCW_Vaccination_Assignment;
