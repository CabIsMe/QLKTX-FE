import { useRouter } from "next/router";
import { userContext } from "../../features/user/user.context";
import StudentNav from '../../features/student/nav';
import Main from "../../features/layouts/main";
import Sidebar from "../../features/ui/sidebar";
import InvoiceDashboard from "../../features/student/dashboard-invoice";
import { useEffect, useState } from "react";
import StdService from "../../pages/api/service/Home-StudentService"

export default function Page() {
    const [user, setUser] = useState({})

    function userInfo(){
        StdService.getStudentDetails().then(res=>{
            setUser(res.data)
        }).catch((error)=>{
            if( error.response ){ 
                if(error.response.status===401){
                    console.log("Unauthorized")
                }
                else if(error.response.status==403){
                    router.push(userURL.login)
                }
            }
            
        })
    }
    useEffect(()=>{
        userInfo()
    },[])
    const router = useRouter();
    const activeNavID = 1;

    function handleNavigate(nextURL) {
        router.push(nextURL);
    }

    return (
        <userContext.Provider value={user}>
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
                <InvoiceDashboard />
            </Main>
        </userContext.Provider>
    )
}