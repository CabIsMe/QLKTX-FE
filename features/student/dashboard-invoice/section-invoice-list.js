import {moneyConverter} from '../../utils/convert';
import { useContext, useState } from "react";
import InvoiceDetailSection from "./section-invoice-detail";
import {SectionContext} from '../../utils/section.context';
import { DataContext } from '../../utils/data.context';

function InvoiceRow({
    invoice = {
        id :"",
        date: "",
        amount: "",
        cost: "",
        total: "",
        status: "",
    }
}) {
    const handleChangeSection = useContext(SectionContext);
    
    return (
        <div 
            className="grid grid-cols-5 items-center w-full h-14 border-b-2 cursor-pointer hover:bg-fa"
            onClick={() => handleChangeSection(<InvoiceDetailSection invoice={invoice}/>)}
        >
            <div className="p-4">{invoice.id}</div>
            <div className="p-4">{invoice.date}</div>
            <div className="p-4">{invoice.amount}</div>
            <div className={'p-4 font-bold ' + (invoice.status?" text-green":" text-orange")}>{invoice.status ? "Paid" : "Unpaid"}</div>
            <div className="p-4">{moneyConverter(invoice.total)}</div>
        </div>
    )
}

export default function InvoiceListSection({
    handleChangeSection,
}) {
    const invoices = useContext(DataContext);
    return (
        <>
            <header className=" grid grid-cols-5 items-center w-full h-14 font-bold bg-ec rounded-tl-lg rounded-tr-lg shadow-sm">
                <div className="p-4">Invoice</div>
                <div className="p-4">Date</div>
                <div className="p-4">Amount</div>
                <div className="p-4">Status</div>
                <div className="p-4">Total Cost</div>
            </header>
            <div className="h-full w-full flex flex-col overflow-auto">
            {
                invoices.map(invoice => <InvoiceRow key={invoice.id} invoice={invoice} handleClick={handleChangeSection } />)
            }
            </div> 
        </>
    )
}