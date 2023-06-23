import Sidebar from "../../features/ui/sidebar";
import { userContext, contractContext } from "../../features/user/user.context";
import StudentNav from '../../features/student/nav';
import MyRoomDashboard from "../../features/student/dashboard-my-room/index";
import Main from "../../features/layouts/main";
import { useRouter } from "next/router";
import { useEffect, useState, createContext } from "react";
import StdService from "../../pages/api/service/Home-StudentService"
import {studentURL,userURL} from '../../features/utils/links'
import Notification from "../../features/ui/notification-text"
import StudentService from "../../pages/api/service/Contract-StudentService"
import {alertContext} from "../../features/utils/alert.context";
import Alert from "../../features/ui/alert";



export default function Page() {
    
    const router = useRouter();
    const activeNavID = 0;
    const [errorApi, setErrorApi]= useState(undefined)
    const [user, setUser] = useState({})
    const [contract, setContract] = useState({})
    function userInfo(){
        StdService.getStudentDetails().then(res=>{
            setErrorApi(null)
            setUser(res.data)
        }).catch((error)=>{
            if( error.response ){ 
                if(error.response.status===401){
                    setErrorApi("Unauthorized")
                }
                else if(error.response.status==403){
                    router.push(userURL.login)
                }
            }
            else{
                setErrorApi("Network error")
            }
        })
    }

    function contractInfo(){
        StudentService.getViewAfterCreatedContract().then(res=>{
            setContract(res.data)
        }).catch((error)=>{
            if( error.response ){ 
                if(error.response.status==400){
                    setContract({
                        hopDongKTX: {
                            idPhongKTX: '',
                            ngayLamDon: '',
                            trangThai: '',
                        },
                        loaiKTX:{
                            tenLoai: ''
                        },
                        datePayment:'',
                        dateFrom:'',
                        dateEnd: ''
            
                    })
                }
                
            }
        })
    }

    useEffect(()=>{
        userInfo()
        contractInfo()
    },[])
    
    function checkRegister(){
        
    }


    function handleNavigate(nextURL) {
        router.push(nextURL); 
    }
    const [alert, setAlert] = useState({
        type: true,
        message: "Add successfully",
        isShow: false,
    });


    function showAlert(type, message) {
        setAlert({
            type: type,
            message: message,
            isShow: true
        });

        setTimeout(() => {
            setAlert({
                ...alert,
                isShow: false,
            })
        }, 3000);
    }


    if(errorApi===null){
        return(
            <alertContext.Provider value={showAlert}>
                <userContext.Provider value={user}>
                    <contractContext.Provider value={contract}>
                        <Sidebar
                            activeNavID={activeNavID}
                            handleNavigate={handleNavigate}
                        >
                            <StudentNav
                                activeNavID={activeNavID}
                                handleNavigate={handleNavigate}
                            />
                        </Sidebar>

                        <Main>
                            <MyRoomDashboard />
                        </Main>
                    </contractContext.Provider>
                </userContext.Provider>
                <Alert
                    type={alert.type}
                    message={alert.message}
                    isShow={alert.isShow}
                />
                
            </alertContext.Provider>
        )
    }
    else if(errorApi == 'Network error'){
        return(
            <Notification title='Network error' desc="Please check your network or your server!"/>
        )
    }
    else if(errorApi == "Unauthorized"){
        return(
            <Notification title='Unauthorized' desc="Login session expired, please login again!" buttonName="Login" url={userURL.login} />
        )
    }
    else{
        return(
            <></>
        )
    }

}



 