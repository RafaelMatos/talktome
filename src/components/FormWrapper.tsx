"use client"
import { useState } from "react";
import Join from "./Join";
import Create from "./Create";

type typeRoom = 'join'| 'create' 

export default function FormWrapper () {
  const [selectedRoom,setSelectedRoom] = useState<typeRoom>('join')
  const handleSelectedRoom = (room: typeRoom) => {
    setSelectedRoom(room)
  }
   
  return ( 
    <div className="w-full" >
      <div className="flex items-center text-center">
        <span className={` w-1/2 p-4 cursor-pointer ${ selectedRoom === 'join' && "bg-secondary rounded-t-lg text-primary"} `} onClick={()=>handleSelectedRoom('join')}>Ingressar</span>
        <span className={` w-1/2 p-4 cursor-pointer ${ selectedRoom === 'create' && "bg-secondary rounded-t-lg text-primary"} `} onClick={()=>handleSelectedRoom('create')}>Nova reunião</span>
      </div>
      <div className=" h-[15rem] bg-secondary rounded-b-lg  space-y-8 p-10">
        <RoomSelector selectedRoom={selectedRoom}/>
      </div>
    </div>
  );
}

const RoomSelector  = ({selectedRoom}: {selectedRoom : typeRoom})=>{
  switch (selectedRoom){
    case 'join' :
      return <Join/>
    case 'create':
      return <Create/>
    default:
      return <Join/>
  }
}
 
// export default FormWrapper;