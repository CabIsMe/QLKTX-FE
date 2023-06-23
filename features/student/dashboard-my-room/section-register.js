import TypeInfoBlock from "./block-type-info"
import { faBed, faFaucetDrip, faBolt, faBox, faTv } from "@fortawesome/free-solid-svg-icons"
import { useEffect, useState } from "react"
import SelectTypeBlock from "./block-select-type";
import ShowRoomsBlock from "./block-show-room"; 
import StudentSevice from "../../../pages/api/service/Home-StudentService"

export default function RegisterSection({}) {
    
    const [typeInfo, setTypeInfo]= useState({})
    const [roomTypes, setRoomTypes] = useState([])
    const [roomDetails, setRoomDetails]= useState([])
    // const [studentDetails, setStudentDetails] = useState({})
    useEffect(()=>{
        StudentSevice.getListTypeRoom().then(res=>{
            // List Type room in combobox   
            setRoomTypes(res.data)
        })
        StudentSevice.getListRoomDetailsById(5).then(res=>{
            // List card 
            setRoomDetails(res.data)
        })
        StudentSevice.getTypeRoom(5).then(res=>{
           // Desc, cost, num beds
            setTypeInfo(res.data)
        })
        
    },[])
    

    function eventSelection(id){
        
        StudentSevice.getListRoomDetailsById(id).then(res=>{
            setRoomDetails(res.data)
        })
        StudentSevice.getTypeRoom(id).then(res=>{
            setTypeInfo(res.data)
        })

    }

    return (
        <>
            <TypeInfoBlock typeInfo={typeInfo}>
                <SelectTypeBlock
                    types={roomTypes}
                    // handleChangeSelectedID={nextID => setSelectedTypeID(nextID)}
                    handleChangeSelectedID={nextID => {eventSelection(nextID)}}
                />
            </TypeInfoBlock>
            <ShowRoomsBlock  roomDetails={roomDetails} />

        </>
    )
}
