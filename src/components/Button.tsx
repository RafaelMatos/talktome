import { ButtonHTMLAttributes } from "react"

interface IButton {
  title : string
  type: "submit" | "reset" | "button"
}

export default function Button({title, type} :IButton){
  return(
    <button type={type} className="bg-primary w-full rounded-md py-2 text-black font-medium">
      {title}
    </button>
  )
}