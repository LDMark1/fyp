import React,{useState} from 'react';
import './login.css'
import { useNavigate} from 'react-router-dom'; 
import axios from 'axios';

let access = 'normaluser';
let respons = [];
const eventListeners = [];

function Login() {

  const [Email,setEmail]=useState("");
  const [Password,setPassword]=useState("");
  const [error,setError]=useState("");
  const history = useNavigate();
const anotherFunction=()=>{
setError("")
};
  const handleSubmit = async(event) =>
{
    event.preventDefault();
    if(!Email || !Password)
    {
      setError("Please fill all the fields!")
      return;
    }
    let formField = new FormData()
    formField.append('email',Email)
    formField.append('password',Password)
         await axios({
          method: 'post',
          url:'http://127.0.0.1:8000/signin',
          data: formField
        }).then(function(data){ 
          console.log(data)
          respons = data;
          access = respons.data.access;
          notifyListeners();
          }).catch(error=> console.error(error.response.status))
if (respons.status==200){
        if(access == 'admin'){
          history('/dashboard')
        }

        else if(access == 'MedicalSuperIntendent'){
          history('/msi_dashboard')
        }
    
        else if(access == 'directorEPI'){
          history('/director_epi_dashboard')
        }

        else if(access == 'HealthCareWorkerAdmin'){
          history('/HCW_Admin_Dashboard')
        }

        else if(access == 'OperatingStaff'){
          history('/OS_dashboard')
        }
    
    
        else if(access == 'HealthCareWorker'){
          history('/hcw_dashboard')
        }
    
        else if(access == 'parent'){
          history('/parent_dashboard')
        }
        else if(access == 'VaccineManager')
        {
          history('/Vaccine_Manager_Dashboard')
        }
        else if(access == 'Parent')
        {
          history('/Parent_Dashboard')
        }
    }
    else {
    window.alert('Wrong Credentials')
    }
}
 
  return (
    <div className='lol'>
    <div className='ca'>
    <form className='bgClr'>
        <h1 className='header1'><b>Sign In </b></h1> 
        <h3 className='f1'>Enter your Email</h3>
      <input className='i1' type="text" name="Email" value={Email} onChange={(e) => {
  setEmail(e.target.value);
  anotherFunction();
}}  /> 
      <h3 className='f1'>Enter your Password</h3>
      <input className='i1' type="password" name="Password" value={Password}onChange={(e) => {
  setPassword(e.target.value);
  anotherFunction();
}}
 /> <br/><br/>
      <br/>
      <div className='errorMsg'>{error}</div>
      <button className='b' type="button" onClick={handleSubmit}  >Log In</button>
      </form>
    </div>
    </div>
  );
}

function getLoggedIn() {
  return access;
}

function addListener(listener) {
  eventListeners.push(listener);
}

function removeListener(listener) {
  const index = eventListeners.indexOf(listener);
  if (index > -1) {
    eventListeners.splice(index, 1);
  }
}

function notifyListeners() {
  eventListeners.forEach((listener) => {
    listener(access);
  });
}

export default Login;
export {respons};
export { getLoggedIn, addListener, removeListener };