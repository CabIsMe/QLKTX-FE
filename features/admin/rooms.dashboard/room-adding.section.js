import {
  faBed,
  faDiamond,
  faMars,
  faMoneyBill,
  faVenus,
} from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import AttributeText from "../../ui/attribute-text";
import AttributeValue from "../../ui/attribute-value";
import ActionButton from "../../ui/button-action";
import { moneyConverter } from "../../utils/convert";
import SectionInfoHeader from "../../layouts/info-header.section";
import SelectEditing from "../../ui/select-editing";
import { useState, useContext } from "react";
import { alertContext } from "../../utils/alert.context";

export default function SectionRoomAdding({
  roomTypeList,
  setSectionId,
  handleAddRoom,
  // roomAlert
}) {
  const [roomTypeId, setRoomTypeId] = useState(roomTypeList[0].id);
  // const showAlert = useContext(alertContext);
  const roomTypeInfo = roomTypeList.find(
    (roomType) => roomType.id == roomTypeId
  ); 
  return (
    <>
      <SectionInfoHeader
        title="Room Addition"
        handleOut={() => setSectionId(0)}
      />

      <main className="flex flex-col justify-between h-full gap-12 p-4 border-2 border-ec  border-t-0 rounded-bl-lg rounded-br-lg">
        <section className="w-full flex gap-3">
          <ImageSection roomTypeInfo={roomTypeInfo} />
          <InfoSection
            roomTypeList={roomTypeList}
            roomTypeInfo={roomTypeInfo}
            setRoomTypeId={setRoomTypeId}
          />
          <ActionsSection>
            <ActionButton 
                title="Save"
                handleClick={() => {
                    const result = confirm("Do you really want to save the changes?");
                    if (result) {
                        handleAddRoom(roomTypeId);
                        // showAlert(roomAlert.type, roomAlert.desc)
                        setSectionId(0);
                    }
                }}    
            />
          </ActionsSection>
        </section>
      </main>
    </>
  );
}

function ImageSection({ roomTypeInfo }) {
  return (
    <section className="w-full">
      <div className="relative w-10/12 aspect-square">
        <img
            className="object-cover rounded-lg"
            src={roomTypeInfo.image}
            alt="A picture of room"
            fill
        />
      </div>
      
    </section>
  );
}

function InfoSection({
  roomTypeList,
  roomTypeInfo,
  setRoomTypeId,
}) {
  return (
    <section className="relative w-full ">
       
      <AttributeText title="Room Type ID">
        <SelectEditing
          icon={faDiamond}
          options={roomTypeList.map((roomType) => ({
            value: roomType.id,
            text:
              roomType.id +
              " " +
              roomType.tenLoai +
              " " +
              (roomType.gioiTinh ? "male" : "female"),
          }))}
          value={roomTypeInfo.id}
          handleChange={(nextRoomTypeId) => {
            setRoomTypeId(nextRoomTypeId);
          }}
        />
      </AttributeText>
      <AttributeText title="Type name">
        <AttributeValue icon={faDiamond} value={roomTypeInfo.tenLoai} />
      </AttributeText>
      <AttributeText title="For gender">
        <AttributeValue
          icon={roomTypeInfo.gioiTinh ? faMars : faVenus}
          value={roomTypeInfo.gioiTinh ? "male" : "female"}
        />
      </AttributeText>
      <AttributeText title="Number of beds">
        <AttributeValue icon={faBed} value={roomTypeInfo.soGiuong} />
      </AttributeText>

      <AttributeText title="Cost">
        <AttributeValue
            icon={faMoneyBill}
            value={moneyConverter(roomTypeInfo.giaPhong)}
        />
      </AttributeText>
    </section>
  );
}

function ActionsSection({ children }) {
  return (
    <section className="w-full flex flex-col">
      <AttributeText title="Actions">
        <div className="flex flex-col h-full gap-3 p-3 border-2 border-ec rounded-md">
          {children}
        </div>
      </AttributeText>
    </section>
  );
}
