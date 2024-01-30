import Image from "next/image";
import Container from "./Container";
import { Hero } from "@/Icons";

export default function Header(){
  return(
      <div className="bg-gray-1000 p-4">
        <Container>
          <div className="flex justify-between ">
            <Image alt="Talk to Me!" src='/icons/Logo.svg' width={120} height={120}/>
            {/* <Image alt="Hero Code" src='/icons/HeroLogo.svg' width={60} height={60}/> */}
            <Hero width={60} height={60}/>
          </div>
        </Container>
      </div>
  )
}