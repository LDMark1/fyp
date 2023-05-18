import React,{useState, useEffect} from 'react';
import { Box, Button, MenuItem, TextField } from "@mui/material";
import { useNavigate} from 'react-router-dom'; 
import { Formik } from "formik";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../Charts/Header";
import Vaccine_Manager_Sidebar from '../Vaccine_Manager_Sidebar/Sidebar';
import axios from 'axios';


const Director_EPI_Vaccine_Assignment = (props) => {
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const [Vaccine_Quantity, setVaccine_Quantity]=useState();

  const [DirectorEPIIDs, setDirectorEPIIDs] = useState([]);
  const [selectedDirectorEPIID, setselectedDirectorEPIID] = useState("");

  const [VaccineIDs, setVaccineIDs] = useState([]);
  const [selectedVaccineIDs, setselectedVaccineIDs] = useState("");

  const [QuantityInStock, setQuantityInStock] = useState("");

  const [check, setCheck] = useState('');
  const [error, setError] = useState('');

  const VM_Email = props.Email;
  
  const history = useNavigate();
  var respons;

  useEffect(() => {
    if (props.Email) {
      fetch(`http://127.0.0.1:8000/CheckAssignmentView/?assigned_vaccine_id=${selectedVaccineIDs}&directorEPI_ID=${selectedDirectorEPIID}`)
        .then((data) => data.json())
        .then((data) => setCheck(data))
    }
  }, [selectedVaccineIDs, selectedDirectorEPIID])
  useEffect(() => {
    if (props.Email) {
      fetch(`http://127.0.0.1:8000/getDEPIforVM/?VM_Email=${props.Email}`)
        .then((data) => data.json())
        .then((data) => setDirectorEPIIDs(data.depis))
    }
  }, [props.Email])

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/Vaccine_IdsView')
      .then(response => {
        setVaccineIDs(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    axios.get(`http://127.0.0.1:8000/getVacForVM/?assigned_vaccine_id=${selectedVaccineIDs}`)
      .then(response => {
        setQuantityInStock(response.data[0].vaccinequantity)
      })
      .catch(error => {
        console.log(error);
      });
  }, [selectedVaccineIDs]);

  const saveData = async (event) => {
    event.preventDefault();
    let QuantityInDEPIStock
    if(check.assignment_exists)
    {
      
      let formField = new FormData()
      formField.append('directorEPI_ID', selectedDirectorEPIID)
      formField.append('assigned_vaccine_id', selectedVaccineIDs)
      formField.append('QuantityInStock', QuantityInStock)
           await axios({
            method: 'put',
            url:'http://127.0.0.1:8000/saveVaccineAssignedToDirectorEPI',
            data: formField
          }).then(response =>{  
             console.log(response.data)
             QuantityInDEPIStock = response.data.Vaccine_Quantity
             return            
            })
      if(QuantityInStock-Vaccine_Quantity >= 0)
      {
        formField.append('newQuantity', parseInt(QuantityInDEPIStock) + parseInt(Vaccine_Quantity));
        formField.append('oldQuantity', parseInt(QuantityInStock) - parseInt(Vaccine_Quantity));
        await axios({
          method: 'put',
          url:'http://127.0.0.1:8000/updatingVacQuantity',
          data: formField
        }).then(response =>{  
           respons=response.status;
           console.log(response.data)            
          })
          if (respons==200)
          {
            history("/Vaccine_Manager_Dashboard", { replace: true })
            return 
            }
      }
      else{
        setError("Assignment Quantity exceeds quantity in stock")
      }
    }
    let formField = new FormData()
    formField.append('directorEPI_ID', selectedDirectorEPIID)
    formField.append('assigned_vaccine_id', selectedVaccineIDs)
    formField.append('Vaccine_Quantity', Vaccine_Quantity)
    formField.append('VM_Email', VM_Email)
         await axios({
          method: 'POST',
          url:'http://127.0.0.1:8000/saveVaccineAssignedToDirectorEPI',
          data: formField
        }).then(response =>{  
           respons=response.status;
            console.log(respons);
          })
      if (respons==200){
        history("/Vaccine_Manager_Dashboard", { replace: true }) 
   }
  };

  return (
    <>
    
    <Vaccine_Manager_Sidebar/>
    <div className="form">
    <Box m="20px">
      <Header title="Assign Vaccine" subtitle="Assign Vaccine To a Director EPI" />

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
                label="Director EPI ID"
                onBlur={handleBlur}
                onChange={(e) => {
                  setselectedDirectorEPIID(e.target.value);
                }}
                value={selectedDirectorEPIID}
                name="DirectorEPI_ID"
                select
                sx={{ gridColumn: "span 4" }}
              >
                {DirectorEPIIDs.map((directorEPI) => (
                  <MenuItem key={directorEPI.id} value={directorEPI.id}>
                    {`${directorEPI.id} - ${directorEPI.directorEPIfullName}`}
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
                type="text"
                label="Vaccine Quantity"
                onBlur={handleBlur}
                onChange={(e)=>{setVaccine_Quantity(e.target.value)}}
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


export default Director_EPI_Vaccine_Assignment;
