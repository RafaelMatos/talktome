"use client"
import { Camera, NoCamera, NoMic, Phone } from "@/Icons";
import Mic from "@/Icons/Mic";
import Container from "./Container";
import { useState } from "react";

export default function Footer(){
  const date = new Date()
  const [isMuted,setIsMuted] = useState(false)
  const [isCameraOff,setIsCameraOff] = useState(false)
  const [isScreenSharing,setIsScreenSharing] = useState(false)
  const hours = date.getHours().toString().padStart(2,'0') + ':'
  const minutes = date.getMinutes().toString().padStart(2,'0')
  return(
    <div className="fixed bottom-0 bg-black py-2 w-full">
      <Container>
      <div className=" grid grid-cols-3">
        <div className="flex items-center">
          <span className="text-xl">{hours}{minutes}</span>
        </div>
        <div className="flex space-x-6 justify-center">
          {isMuted ? (
              <NoMic 
              onClick={()=>setIsMuted(!isMuted)} 
              className="h-12 w-16 cursor-pointer text-white p-2 bg-red-500 hover:brightness-110 rounded-md"
            />
            ):(
              <Mic 
                onClick={()=>setIsMuted(!isMuted)} 
                className="h-12 w-16 cursor-pointer text-white p-2 bg-gray-950 hover:brightness-110 rounded-md"
              />
            ) }
          {isCameraOff ? (
              <NoCamera
              onClick={()=>setIsCameraOff(!isCameraOff)} 
              className="h-12 w-16 cursor-pointer text-white p-2 bg-red-500 hover:brightness-110 rounded-md"
            />
            ):(
              <Camera 
                onClick={()=>setIsCameraOff(!isCameraOff)} 
                className="h-12 w-16 cursor-pointer text-white p-2 bg-gray-950 hover:brightness-110 rounded-md"
              />
            ) }
          
          
          <Phone className="h-12 w-16 cursor-pointer hover:bg-red-500 text-white p-2 bg-primary rounded-md"/>
        </div>
      </div>
      </Container>
    </div>
  )
}