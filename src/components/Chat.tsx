import Image from "next/image";

export default function Chat(){
  return (
    <div className="relative h-full bg-gray-900 px-4 pt-4 hidden md:flex md:w-[15%] rounded-md m-3">
      <div className="relative h-full w-full">
        <div className="bg-gray-950 rounded p-2">
          <div className="flex items-center text-pink-400 space-x-2">
            <span>Rafael Matos</span>
            <span>09:14</span>
          </div>
          <div className="mt-5 text-sm">
            <p>text</p>
          </div>
        </div>

      <form action="" className="absolute bottom-2 w-full">
        <div className="flex relative">
          <input type="text" name="" id="" className="px-3 py-2 bg-gray-950 rounded-md w-full" />
          <Image src='/icons/send.png' width={20} height={20} alt="send" className="absolute right-2 top-2.5"/>
        </div>
      </form>
      </div>

    </div>

    
  )
}