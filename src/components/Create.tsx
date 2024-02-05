"use client"
import { FormEvent, useRef } from "react";
import Button from "./Button";
import { Input } from "./Input";
import { useRouter } from "next/navigation";

const Create = () => {
  const name = useRef<HTMLInputElement>(null)
  const router = useRouter()

  const handleCreateRoom = (e:FormEvent<HTMLFormElement>)=>{
    e.preventDefault()
    if(name.current &&name.current?.value !== ''){
      sessionStorage.setItem('username',name.current.value)
      const roomId = generateRandomString()
      // router.push(`/room/${roomId}`)
      window.location.href= `/room/${roomId}`
    }
  }

  function generateRandomString(){
    const randomString = Math.random().toString(36).substring(2,7)
    return randomString
  }
  return (
    <>
      <form className="space-y-[6.5rem]" onSubmit={(e)=>handleCreateRoom(e)}>
      <Input type="text" placeholder="Seu nome" ref={name}/>

      <Button title="Entrar" type="submit"/>
    </form> 
    </>
    
   );
}
 
export default Create;