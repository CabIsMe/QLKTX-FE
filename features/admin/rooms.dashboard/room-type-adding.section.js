import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBed, faDiamond,  faL,  faMarsAndVenus, faMoneyBill, faWarning  } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import AttributeText from '../../ui/attribute-text';
import ActionButton from "../../ui/button-action";
import SectionInfoHeader from "../../layouts/info-header.section";
import InputEditing from "../../ui/input-editing";
import { useState, useEffect } from "react";
import SelectEditing from "../../ui/select-editing";
import TextareaEditing from "../../ui/textarea-editing";
import InputImageEditing from "../../ui/input-image-editing";

export default function SectionRoomTypeEditing({
    handleAddingRoomType,
    setSectionId,
}) {
    const [tempInfo, setTempInfo] = useState({
        tenLoai: "",
        gioiTinh: true,
        soGiuong: 0,
        giaPhong: 100_000,
        description: "",
        file: ""
    });
    
    return (
        <>
            <SectionInfoHeader 
                title="Room Detail Editing" 
                handleOut={() => setSectionId(0)} />

            <main className="flex flex-col h-full gap-12 p-4 border-2 border-ec  border-t-0 rounded-bl-lg rounded-br-lg">
                <section className="w-full flex gap-3">
                    <ImageSection info={tempInfo} handleChangeInfo={setTempInfo} />
                    <InfoSection info={tempInfo}  handleChangeInfo={setTempInfo}/>
                    <ActionsSection>
                        <ActionButton 
                            title="Save"
                            handleClick={() => {
                                let result = confirm("Do you really want to save the changes?");
                                if (result) {
                                    handleAddingRoomType(tempInfo);
                                    
                                }
                            }}
                        />
                     
                    </ActionsSection>
                </section>

                <section className="grid grid-cols-3 gap-3 w-full h-full ">
                    <DescriptionSection
                        info={tempInfo.description}
                        handleChangeDesc={nextDesc => setTempInfo({
                            ...tempInfo,
                            description: nextDesc,
                        })}
                    />
                    
                </section>
            </main>
        </>
    )
}

function ImageSection({ 
    info,
    handleChangeInfo,
}) {
    return (
        <section className="w-full h-full flex justify-center items-center">
            <div className="relative w-10/12 aspect-square">
                <InputImageEditing handleChange={nextFile => handleChangeInfo({
                        ...info,
                        file: nextFile.target.files[0],
                    })}/>
            </div>
        </section>
    )
}

function InfoSection({
    info,
    handleChangeInfo,
}) {
    return (
        <section className="relative w-full ">
            
            <AttributeText title="Type name">
                <InputEditing 
                    icon={faDiamond} 
                    value={info.tenLoai}
                    handleChange={nextTypeName => handleChangeInfo({
                        ...info,
                        tenLoai: nextTypeName,
                    })} />
            </AttributeText>
            <AttributeText title="For gender">
                <SelectEditing
                    icon={faMarsAndVenus}
                    options={[
                        {text: "Male", value: true},
                        {text: "Female", value: false},
                    ]}
                    value={info.gioiTinh}
                    handleChange={nextGender => handleChangeInfo({
                        ...info,
                        gioiTinh: nextGender
                    })}
                />
            </AttributeText>
            <AttributeText title="Number of beds">
                <InputEditing 
                    icon={faBed} 
                    value={info.soGiuong} type="number"
                    handleChange={nextBeds => handleChangeInfo({
                        ...info,
                        soGiuong: nextBeds,
                    })} />
            </AttributeText>
            <AttributeText title="Cost">
                <InputEditing 
                    icon={faMoneyBill} 
                    value={info.giaPhong} 
                    type="number"
                    handleChange={nextCost => handleChangeInfo({
                        ...info, 
                        giaPhong: nextCost,
                    })}    
                />
            </AttributeText>
        </section>
    )
}

function ActionsSection({
    children,
}) {
    return (
        <section className="w-full flex flex-col">
            <AttributeText title="Actions">
                <div className="flex flex-col h-full gap-3 p-3 border-2 border-ec rounded-md">
                    {children}
                </div>
            </AttributeText>
        </section>
    )
}

function DescriptionSection({
    desc,
    handleChangeDesc,
}) {
    return (
        <>
        <div className="col-span-2 flex flex-col">
            <AttributeText title="Description" />
            {/* <p className="h-full flex flex-col gap-2 border-2 rounded-md p-2">
                A standard room is a basic dormitory room that includes essential furnishings such as a bed, desk, and storage space. This option is typically the most affordable and may include access to shared common areas such as kitchens, lounges, and study spaces.
            </p> */}
            <TextareaEditing
                value={desc}
                handleChange={handleChangeDesc} 
            />
        </div>
        </>
    )
}

 