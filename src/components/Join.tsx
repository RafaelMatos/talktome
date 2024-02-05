"use client";
import { FormEvent, useRef } from "react";
import Button from "./Button";
import { Input } from "./Input";
import { useRouter } from "next/navigation";

const Join = () => {
  const name = useRef<HTMLInputElement>(null);
  const id = useRef<HTMLInputElement>(null);

  const router = useRouter()

  const handleJoinRoom = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (
      name.current &&
      name.current?.value !== "" &&
      id.current &&
      id.current.value !== ""
    ) {
      sessionStorage.setItem("username", name.current.value);
      const roomId = id.current.value

      window.location.href= `/room/${roomId}`
    }
  };
  return (
    <form onSubmit={(e) => handleJoinRoom(e)}>
      <div className="space-y-8">
        <div className="space-y-8">
          <Input type="text" placeholder="Seu nome" ref={name} />
          <Input type="text" placeholder="Seu ID da reunião" ref={id} />
        </div>

        <Button title="Entrar" type="submit" />
      </div>
    </form>
  );
};

export default Join;
