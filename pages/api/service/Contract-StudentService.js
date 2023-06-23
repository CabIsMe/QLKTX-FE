import axios from"axios"
import authHeader from '../student-auth/AuthHeader';
const API_URL = "http://localhost:8080/api/student/contract/";

const getViewBeforeCreateContract=(idPhong)=>{
    return axios.get(API_URL + 'view-create/'+idPhong, { 
      headers: authHeader() 
    });
  }

const getViewAfterCreatedContract=()=>{
  return axios.get(API_URL ,{
    headers: authHeader()
  })
}
  
const createContract=(idPhong)=>{
    return axios.get(API_URL + 'create/'+idPhong,{
        headers: authHeader()
    })
}


const checkForRegistration=()=>{
    return axios.get(API_URL + 'check-registration', { 
      headers: authHeader() 
    });
  }

const cancelContract=()=>{
    return axios.get(API_URL +"cancel",
    {
      headers: authHeader()
    }
    )
}
const extendContract=()=>{
  return axios.get(API_URL + "extend",
  {
      headers: authHeader()
  })
}
const StudentService={
    getViewBeforeCreateContract,
    createContract,
    checkForRegistration,
    getViewAfterCreatedContract,
    cancelContract,
    extendContract,
}


export default StudentService
