import Sidebar from "../../features/ui/sidebar";
import { userContext } from "../../features/user/user.context";
import AdminNav from '../../features/admin/nav';
import Main from "../../features/layouts/main";
import { useRouter } from "next/router";
import ContractDashboard from "../../features/admin/contracts.dashboard";
import { useState, useEffect } from "react";
import {alertContext} from "../../features/utils/alert.context";
import Alert from "../../features/ui/alert";
import { managerURL } from "../../features/utils/links";
import Authorities from "../api/admin-auth/AuthRoles"

export default function Page() {
    const router = useRouter(); 
    const [authority, setAuthority]= useState(null)
    const [auth, setAuth] = useState(false)
    function getAuthorities(){
        Authorities().then(res=>{
            console.log(res.data[0])
            setAuth(true)
            setAuthority(res.data[0]['authority']) 
        }).catch(error=>{
            console.log("error", error);
            if(error.response.status==401){
                router.push(managerURL.login)
            }
        })
    }

    useEffect(()=>{
        getAuthorities()
    },[authority])

    const user = {
        id: "N19DCCN018", 
        name: "Ho Duc Trung", 
        role: true, 
        gender: true,
        dateOfBirth: '01-01-2001',
    };
    const activeNavID = 3;

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

    return (
        auth &&
        <>
            <userContext.Provider value={user}>
            <alertContext.Provider value={showAlert}>
                <Sidebar
                    activeNavID={activeNavID}
                    handleNavigate={handleNavigate}
                >
                    <AdminNav
                        key={authority}

                        activeNavID={activeNavID}
                        handleNavigate={handleNavigate}
                        authority={authority}
                    />
                </Sidebar>

                <Main> 
                    <ContractDashboard />
                </Main>

                <Alert
                    type={alert.type}
                    message={alert.message}
                    isShow={alert.isShow}
                />
            </alertContext.Provider>
            </userContext.Provider>
        </>
        
    )
}

 