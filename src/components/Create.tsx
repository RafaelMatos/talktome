"use client"
import { useRef } from "react";
import Button from "./Button";
import { Input } from "./Input";

const Create = () => {
  const name = useRef<HTMLInputElement>(null)
  return (
    <div className="space-y-[6.5rem]">
      <Input type="text" placeholder="Seu nome" ref={name}/>

      <Button title="Entrar" type="submit"/>
    </div> 
    
   );
}
 
export default Create;