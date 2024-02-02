"use client"
import { useRef } from "react";
import Button from "./Button";
import { Input } from "./Input";

const Join = () => {
  const name = useRef<HTMLInputElement>(null)
  const id = useRef<HTMLInputElement>(null)
  return (
    <div className="space-y-8">
      <div className="space-y-8">
        <Input type="text" placeholder="Seu nome" ref={name}/>
        <Input type="text" placeholder="Seu ID da reunião" ref={id} />
      </div>
      

      <Button title="Entrar" type="submit"/>
    </div> 
    
   );
}
 
export default Join;