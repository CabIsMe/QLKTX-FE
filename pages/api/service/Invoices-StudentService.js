import axios from"axios"
import authHeader from '../student-auth/AuthHeader';
const API_URL = "http://localhost:8080/api/student";

const getWaterBills=()=>{
    return axios.get(API_URL + "/bills/water", 
    {
        headers: authHeader()
    }
    )
}
const getElectricBills=()=>{
    return axios.get(API_URL + "/bills/electric", 
    {
        headers: authHeader()
    }
    )
}


const StudentService={
    getWaterBills,
    getElectricBills
}

export default StudentService