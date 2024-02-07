"use client"
import Chat from "@/components/Chat";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { SocketContext } from "@/contexts/SocketContext";
import { useContext, useEffect, useRef, useState } from "react";

interface IAnswer {
  sender:string
  description: RTCSessionDescriptionInit
}
interface ICandidate {
  sender:string
  candidate: RTCIceCandidate
}

export default function Room({params}:{params:{id:string}}){
  const {socket} = useContext(SocketContext)
  const localStream = useRef<HTMLVideoElement>(null)
  const peerConnections = useRef<Record<string,RTCPeerConnection>>({})

  const [videoMediaStream,setVideoMediaStream] = useState<MediaStream | null>(null)
  const [remoteStreams,setRemoveStreams] = useState<MediaStream[]>([])

  
  useEffect(()=>{
    socket?.on('connect',async ()=>{
      console.log('Conectado')
      socket.emit('subscribe',{
        roomId:params.id,
        socketId: socket.id
      })
      await initLocalCamera()
    })

    socket?.on('new user',(data)=>{
      console.log("Novo usuário tentando se conectar",data)
      createPeerConnection(data.socketId,false)
      socket.emit('newUserStart',{
        to: data.socketId,
        sender: socket.id
      })
    })

    socket?.on('newUserStart',(data)=>{
      console.log('Usuário conectado na sala: ',data)
      createPeerConnection(data.sender,true)
    })    

    socket?.on('sdp',(data)=>handleAnswer(data))

    socket?.on('ice candidates',(data)=> handleIceCandidates(data))

  },[socket])


  const handleAnswer = async (data:IAnswer)=>{
    const peerConnection = peerConnections.current[data.sender]

    if(data.description.type === 'offer'){
      await peerConnection.setRemoteDescription(data.description)

      const answer = await peerConnection.createAnswer()

      await peerConnection.setLocalDescription(answer)
      console.log("Criando uma resposta")
      socket?.emit('sdp',{
        to: data.sender,
        sender: socket?.id,
        description: peerConnection.localDescription
      })
    }else if(data.description.type === 'answer'){
      console.log('Ouvindo a oferta')
      await peerConnection.setRemoteDescription(new RTCSessionDescription(data.description))
    }

  }

  
  const handleIceCandidates = async(data:ICandidate)=>{
    const peerConnection = peerConnections.current[data.sender]
    if(data.candidate){
      await peerConnection.addIceCandidate(new RTCIceCandidate(data.candidate))
    }
  }

  const createPeerConnection = async (socketId:string, createOffer:boolean)=>{
    const config = {
      iceServers : [
        {
          urls:['stun:stun.l.google.com:19302'],
        }
      ]
    }

    const peer = new RTCPeerConnection(config)
    peerConnections.current[socketId] = peer

    const peerConnection = peerConnections.current[socketId]

    if(videoMediaStream){
      videoMediaStream.getTracks().forEach((track)=>{
        peerConnection.addTrack(track, videoMediaStream)
      })
    }else{
      console.log("initRemoteCamera else")
     const video = await initRemoteCamera()
     video.getTracks().forEach((track)=>{
      peerConnection.addTrack(track,video)
     })

    }

    if(createOffer){
      const peerConnection = peerConnections.current[socketId]

      const offer = await peerConnection.createOffer()
      await peerConnection.setLocalDescription(offer)
      console.log('Criando uma oferta')
      socket?.emit('sdp',{
        to:socketId,
        sender: socket?.id,
        description: peerConnection.localDescription
      })
    }

    peerConnection.ontrack = (event)=>{
      const remoteStream = event.streams[0]

      // const dataStream = {
      //   id: socketId,
      //   stream: remoteStream
      // }
      // setRemoveStreams(state => [...state,remoteStream])
      setRemoveStreams([...remoteStreams,remoteStream])
    }

    peer.onicecandidate = (event) =>{
      if(event.candidate){
        socket?.emit('ice candidates',{
          to: socketId,
          sender: socket?.id,
          candidate: event.candidate
        })
      }
    }
  } 

  const initLocalCamera = async ()=>{
    const video = await navigator.mediaDevices.getUserMedia({
      video:true,
      audio:{
        noiseSuppression:true,
        echoCancellation:true
      }
    })
    setVideoMediaStream(video)
    if(localStream.current){
      localStream.current.srcObject = video
    }
  }
  const initRemoteCamera = async ()=>{
    const video = await navigator.mediaDevices.getUserMedia({
      video:true,
      audio:{
        noiseSuppression:true,
        echoCancellation:true
      }
    })
    return video
  }

  return (
    <div className="h-screen">
      <Header/>
      <div className="flex h-[70%]">
        <div className="md:w-[85%] w-full m-3">
            <div className="grid md:grid-cols-2 grid-cols-1 gap-8">
              <div className="bg-gray-950 w-full rounded-md h-ful p-2 relative">
                <video src="" className="h-full w-full rounded-sm mirror-mode" autoPlay playsInline ref={localStream}/>
                <span className="absolute bottom-3">Criador</span>
              </div>
              {remoteStreams.map((stream,index)=>{
                return(
                  <div key={index} className="bg-gray-950 w-full rounded-md h-ful p-2 relative">
                    <video src="" className="h-full w-full" autoPlay playsInline ref={(video)=>{
                      if(video && video.srcObject !== stream ) video.srcObject = stream
                    }}/>
                    <span className="absolute bottom-3">Convidado</span>
                  </div>
                )
              })}
            </div>
            
        </div>
        <Chat roomId={params.id}/>
      </div>
        <Footer videoMediaStream={videoMediaStream} peerConnections={peerConnections} localStream={localStream} />
    </div>
  )
}