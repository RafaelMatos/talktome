import { SocketContext } from "@/contexts/SocketContext";
import Image from "next/image";
import { FormEvent, useContext, useEffect, useRef, useState } from "react";

interface IChatMessage {
  message: string;
  username: string;
  roomId: string;
  time: string;
}

export default function Chat({roomId}:{roomId:string}){
  
  const [chat,setChat] = useState<IChatMessage[]>([])

  const currentMsg = useRef<HTMLInputElement>(null)

  const {socket} = useContext(SocketContext)

  useEffect(()=>{
    console.log('Effect')
    socket?.on('chat',(data)=>{
      console.log('message:',data)
      setChat((state)=> [...state,data])
    })
  },[socket])

  const sendMessage = (e:FormEvent<HTMLFormElement>)=>{
    e.preventDefault()
    console.log('sendMessage',currentMsg.current?.value)
    if(currentMsg.current && currentMsg.current.value !== ''){
      console.log('sendMessage if')
      const sendMsgToServer = {
        message: currentMsg.current?.value,
        username:'Rafael Matos',
        roomId,
        time: new Date().toLocaleTimeString()
      }

      socket?.emit('chat', sendMsgToServer)

      setChat((state)=> [...state,sendMsgToServer])

      currentMsg.current.value = ''
    }
  }
  
  return (
    <div className="relative min-h-[70vh]  bg-gray-900 px-4 pt-4 hidden md:flex md:w-[15%] rounded-md m-3">
      <div className=" h-full w-full">
        {chat.map((chat, index) => {
          return (
            <div key={index} className="bg-gray-950 rounded p-2 mb-4">
              <div className="flex items-center text-pink-400 space-x-2">
                <span>{chat.username}</span>
                <span>{chat.time}</span>
              </div>
              <div className="mt-5 text-sm">
                <p>{chat.message}</p>
              </div>
            </div>
          );
        })}

        <form
          className="absolute bottom-4 inset-x-3"
          onSubmit={(e) => sendMessage(e)}
        >
          <div className="flex relative">
            <input
              type="text"
              name=""
              id=""
              className="px-3 py-2 bg-gray-950 rounded-md w-full"
              ref={currentMsg}
            />
            <button type="submit">
              <Image
                src="/icons/send.png"
                width={20}
                height={20}
                alt="send"
                className="absolute right-2 top-2.5"
              />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}