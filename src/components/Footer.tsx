"use client"
import { Camera, Computer, NoCamera, NoComputer, NoMic, Phone } from "@/Icons";
import Mic from "@/Icons/Mic";
import Container from "./Container";
import { MutableRefObject, RefObject, useState } from "react";

interface IFooterProps{
  videoMediaStream :MediaStream | null
  peerConnections : MutableRefObject<Record<string, RTCPeerConnection>>
  localStream : RefObject<HTMLVideoElement>
}

export default function Footer({videoMediaStream, peerConnections,localStream}:IFooterProps){
  const date = new Date()
  const [isMuted,setIsMuted] = useState(false)
  const [isCameraOff,setIsCameraOff] = useState(false)
  const [isScreenSharing,setIsScreenSharing] = useState(false)
  const hours = date.getHours().toString().padStart(2,'0') + ':'
  const minutes = date.getMinutes().toString().padStart(2,'0')

  const toggleMuted = ()=>{
    videoMediaStream?.getAudioTracks().forEach((track)=>{
      track.enabled = !isMuted
    })
    setIsMuted(!isMuted)
  }
  const toggleVideo = ()=>{
    setIsCameraOff(!isCameraOff)
    videoMediaStream?.getVideoTracks().forEach((track)=>{
      track.enabled = isCameraOff
    })

    Object.values(peerConnections.current).forEach((peerConnection)=>{
      peerConnection.getSenders().forEach((sender)=>{
        if(sender.track?.kind === 'video' && videoMediaStream){
          sender?.replaceTrack(
            videoMediaStream?.getVideoTracks().find((track)=> track.kind === 'video')
          )
        }
      })
    })
    
  }

  const toggleScreenSharing = async ()=>{
    if(!isScreenSharing){
      const videoShareScreen = await navigator.mediaDevices.getDisplayMedia({
        video:true,
        audio:true
      })
  
      if(localStream.current) localStream.current.srcObject = videoShareScreen
  
      Object.values(peerConnections.current).forEach((peerConnection)=>{
        peerConnection.getSenders().forEach((sender)=>{
          if(sender.track?.kind==='video'){
            sender.replaceTrack(videoShareScreen.getVideoTracks()[0])
          }
        })
      })
      
      setIsScreenSharing(true)
      return
    }
    
    if(localStream.current) localStream.current.srcObject = videoMediaStream


    Object.values(peerConnections.current).forEach((peerConnection)=>{
      peerConnection.getSenders().forEach((sender)=>{
        if(sender.track?.kind==='video'){
          sender.replaceTrack(videoMediaStream?.getVideoTracks()[0])
        }
      })
    })
    setIsScreenSharing(false)
  }
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
              onClick={()=>toggleMuted()} 
              className="h-12 w-16 cursor-pointer text-white p-2 bg-red-500 hover:brightness-110 rounded-md"
            />
            ):(
              <Mic 
                onClick={()=>toggleMuted()} 
                className="h-12 w-16 cursor-pointer text-white p-2 bg-gray-950 hover:brightness-110 rounded-md"
              />
            ) }
          {isCameraOff ? (
              <NoCamera
              onClick={()=>toggleVideo()} 
              className="h-12 w-16 cursor-pointer text-white p-2 bg-red-500 hover:brightness-110 rounded-md"
            />
            ):(
              <Camera 
                onClick={()=>toggleVideo()} 
                className="h-12 w-16 cursor-pointer text-white p-2 bg-gray-950 hover:brightness-110 rounded-md"
              />
            ) }
          {isScreenSharing ? (
              <NoComputer
              onClick={()=>toggleScreenSharing()} 
              className="h-12 w-16 cursor-pointer text-white p-2 bg-red-500 hover:brightness-110 rounded-md"
            />
            ):(
              <Computer 
                onClick={()=>toggleScreenSharing()} 
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