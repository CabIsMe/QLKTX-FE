import Container from "../../user/layouts/db-container";
import FilterBlock from "./block-filter";
import {SectionContext} from '../../utils/section.context';
import {DataContext} from '../../utils/data.context';
import InvoiceListSection from "./section-invoice-list";
import { useState, useEffect, useContext } from "react";
import StudentSerivce from "../../../pages/api/service/Invoices-StudentService"



export default function InvoiceDashboard() {
    const [textFilter, setTextFilter] = useState("");
    const [category, setCategory] = useState("all");
    const [status, setStatus] = useState("all");
    const [invoices, setInvoices] = useState([])
    function mapping(objects){
        let arr=[]
        for(let i=0; i<objects.length; i++){
            const invoice = {
                id :"",
                date: "",
                amount: "",
                cost: "",
                total: "",
                status: "",
            }
            if('luongNuocTieuThu' in objects[i]){
                invoice.id= 'W-'+objects[i].id
                invoice.amount= objects[i].luongNuocTieuThu
                invoice.date=objects[i].giaNuocTheoThang.thang + "/" + objects[i].giaNuocTheoThang.nam
                invoice.cost= objects[i].giaNuocTheoThang.giaNuoc
            }
            else{
                invoice.id= 'E-'+objects[i].id
                invoice.amount= objects[i].soDienTieuThu
                invoice.date=objects[i].giaDienTheoThang.thang + "/" + objects[i].giaDienTheoThang.nam
                invoice.cost= objects[i].giaDienTheoThang.giaDien
            }
            invoice.total= objects[i].total
            invoice.status= objects[i].trangThai
            arr.push(invoice)
            
        }
        return arr
    }

    useEffect(()=>{
        if (category =='Water'){
            StudentSerivce.getWaterBills().then(res=>{
                setInvoices(mapping(res.data))
            }).catch(error=>{
                if(error.response){
                    console.log(error.response.data)
                }
            })
        }

        else if (category=='Electricity'){
            StudentSerivce.getElectricBills().then(res=>{
                setInvoices(mapping(res.data))
            }).catch(error=>{
                if(error.response){
                    console.log(error.response.data)
                }
            })
        }
        
        else{
            
            StudentSerivce.getWaterBills().then(res=>{
                
                StudentSerivce.getElectricBills().then(res2=>{
                    setInvoices(mapping(res.data.concat(res2.data)))
                    
                    
                })
            }).catch(error=>{
                if(error.response){
                    console.log(error.response.data)
                }
            })
        }
    },[category])

    

    const [section, setSection] = useState(<InvoiceListSection />)
    return (
        <>
            <FilterBlock
                textValue={textFilter}
                category={category}
                status={status}
                setCategory={setCategory}
                setTextFilter={setTextFilter}
                setStatus={setStatus}
            />
            <div className="invoice-dashboard relative h-full flex flex-col">
                <Container>
                    <div className="h-full w-full p-5 flex flex-col">
                        <SectionContext.Provider value={setSection}>
                        <DataContext.Provider value={invoices}>
                            {section} 
                        </DataContext.Provider>
                        </SectionContext.Provider>
                    </div>
                </Container>
            </div>
        </>
    )
}

