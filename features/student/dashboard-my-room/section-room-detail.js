import { faDiamond, faBed, faUsers, faWifi, faBox, faFaucetDrip, faBolt,faMoneyBillTransfer, faTv, faIdCardAlt, faEye, faMoneyCheckAlt, faIdCard, faSignature, faPhone, faCakeCandles, faVenusMars, faMobile, faAt, faRightFromBracket, faRightToBracket, faMoneyBill, faMoneyCheck, faXmark } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useRouter } from "next/router";
import { useState, useEffect, useContext } from "react";
import StudentService from "../../../pages/api/service/Contract-StudentService";
const icons = [faBed, faBox, faFaucetDrip, faBolt, faTv];
import StudentSerivce from "../../../pages/api/service/Contract-StudentService"
import { userContext, contractContext } from "../../user/user.context";
import { alertContext } from "../../utils/alert.context";

export default function RoomDetailSection({setHandleConfirm}) {

    const personalInfo= useContext(userContext)
    // const [contractInfo, setContractInfo] = useState(useContext(contractContext))
    const contractInfo = useContext(contractContext)
    const [confirm, setConfirm] = useState(false);
    const showAlert = useContext(alertContext);
    const router = useRouter()

    useEffect(()=>{
        
    },[])

    function handleCancelContract(){
        setConfirm(true)
    }
    function handleConfirm(){ // 
        StudentSerivce.cancelContract().then(res=>{
            setTimeout(showAlert(true, res.data),3000)
            router.reload()
        }).catch(error=>{
            if(error.response){
                showAlert(false, "Can't cancel the contract now")
            }
        })
    }
    function handleExtendContract(){
        StudentService.extendContract().then(res=>{
            setTimeout(showAlert(true, res.data),3000)
            router.reload()
        })
        .catch(error=>{
            if(error.response){
                showAlert(false, error.response.data)
            }
        })
    }
    return (
        <section className="h-full w-full p-5">
            <div className="h-full w-full flex flex-col p-5 border-2 rounded-lg shadow-md">
                <h2 className="text-3xl font-bold text-center ">
                    Contract Detail
                </h2>

                <div className="h-full grid grid-cols-3 pt-10 gap-3 ">
                    <RoomSection contractInfo={contractInfo}/>
                    <PersonalSection personalInfo={personalInfo} />
                    <ActionsSection handleCancelContract={handleCancelContract} handleExtendContract={handleExtendContract}/>
                </div>
            </div>
            {confirm && 
                    <section 
                        className="fixed inset-0 bg-black bg-opacity-0 grid place-items-center"
                        onClick={() => setConfirm(false)}
                    >
                        <ConfirmBox 
                            handleConfirm={handleConfirm}
                            handleCancel={() => setConfirm(false)}    
                        />
                    </section>
                }
        </section>
        
    )
}

function AttributeSection({ title, children }) {
    return (
        <>
            <h4 className="mt-7 mb-2 text-xl font-bold first:mt-0">
                {title}
            </h4>
            <span className="font-medium">{children}</span>
        </>
    )
}

function AttributeValue({ icon, value, status }) {
    return (
        status ?
        <p className="flex items-center gap-2 font-bold text-orange text-xl">
            <FontAwesomeIcon 
                icon={icon}
                className="w-1/12 text-2xl mr-2"
            />
            <span className="truncate">{value}</span>
        </p>:
        <p className="flex items-center gap-2 font-bold text-primary text-xl">
            <FontAwesomeIcon 
                icon={icon}
                className="w-1/12 text-2xl mr-2"
            />
            <span className="truncate">{value}</span>
        </p>
    )
}

function Button({
    title,
    onClick,
}) {
    return (
        <button onClick={onClick} className="mt-3 first:mt-0 w-full h-12 grid place-items-center rounded-md bg-ec text-lg font-bold active:bg-slate-100">
            {title}
        </button>
    )
}

function RoomSection({contractInfo}) {
    const [isShow, setIsShow] = useState(false);
    console.log(contractInfo)
    if(Object.keys(contractInfo).length === 0){
        
        contractInfo={
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

        }
    }
    return (
        <section className="flex flex-col">
            <AttributeSection title="Room number">
                <span className="text-3xl text-primary font-bold">
                    {contractInfo.hopDongKTX.idPhongKTX}
                </span>
            </AttributeSection>

            {/* <AttributeSection title="Room Type">
                    <AttributeValue 
                        icon={faDiamond}
                        value={contractInfo.loaiKTX.tenLoai}
                    />
            </AttributeSection> */}

            <AttributeSection title="Application date">
                
                {contractInfo.hopDongKTX.ngayLamDon}
                
            </AttributeSection>

            <AttributeSection title="Expiry date">
                
                {contractInfo.datePayment}
            </AttributeSection>

            <AttributeSection title="Payment amount">
                
                <AttributeValue 
                    icon={faMoneyBill}
                    value={contractInfo.hopDongKTX.tongTien}
                    status={false} 
                />
                
            </AttributeSection> 

            <AttributeSection title="Payment Status">
                {contractInfo.hopDongKTX.trangThai ?
                <AttributeValue 
                    icon={faMoneyCheckAlt}
                    value="Paid"
                    status={false} 
                />:
                <AttributeValue 
                    icon={faMoneyBillTransfer }
                    value="Pending"
                    status={true} 
                />
            
                }
                
            </AttributeSection> 
            <AttributeSection title="Move in and Move out">
                <p className="flex items-center gap-2 font-bold text-green text-xl">
                    <FontAwesomeIcon 
                        icon={faRightToBracket}
                        className="ml-5 w-1/12 text-2xl mr-2"
                    />
                    {contractInfo.dateFrom}
                </p>
                <p className="flex items-center gap-2 font-bold text-red text-xl">
                    <FontAwesomeIcon 
                        icon={faRightFromBracket}
                        className="ml-5 w-1/12 text-2xl mr-2"
                    />
                    {contractInfo.dateEnd}
                </p>
            </AttributeSection>
        </section>
    )
}



function ActionsSection({handleCancelContract, handleExtendContract}) {
    return (
        <section className="flex flex-col">
            <AttributeSection title="Actions">
                <div className="flex flex-col gap-5 border-2 px-5 py-4 rounded-lg ">
                    <Button onClick={handleCancelContract} title="Cancel Your Contract" />
                    <Button onClick={handleExtendContract} title="Extend Your Agreement" />
                    <Button title="Request Room Transfer" />
                    <Button  title="View Room Availability" />
                </div>
            </AttributeSection>
            
        </section>
    )
}

function PersonalSection({personalInfo}) {
    function renderGender(gender){
        if(gender){
            return "Male"
        }
        else{
            return "Female"
        }
    }
    return (
        <section className="flex flex-col">
            <AttributeSection title="Personal Information">
                <div className="flex flex-col gap-6 px-5 py-4 border-2 rounded-lg ">
                    <AttributeValue icon={faIdCard} value={personalInfo.username} />
                    <AttributeValue icon={faSignature} value={personalInfo.hoTen} />
                    <AttributeValue icon={faVenusMars} value={renderGender(personalInfo.gioiTinh) } />
                    <AttributeValue icon={faAt} value={personalInfo.mail} />
                    <AttributeValue icon={faMobile} value={personalInfo.sdt} />
                    <AttributeValue icon={faCakeCandles} value={personalInfo.ngaySinh}/>
                    <AttributeValue icon={faIdCardAlt } value={personalInfo.cmnd}/>
                </div>
            </AttributeSection>

            
        </section>
    )
}

function ConfirmBox({handleConfirm, handleCancel}){
    
    return(
        <form className="w-[250px] shadow-2xl p-10 rounded-xl bg-white">
            <center className="mb-6 text-2xl">Are you sure?</center>
            <div className="flex justify-between">
                <button className="p-4  bg-primary rounded-lg text-white outline-none" onClick={handleConfirm}>Yes</button>
                <button className="p-4 bg-yellow-500 rounded-lg text-white outline-none" onClick={handleCancel}>No</button>
            </div>
        </form>
    )
}


