import { useState } from "react"
import { filters } from "../constants"


const RatingFilters = () => {
    const [isOpen,setOpen] = useState(true)
  return (
   <div className="border-b-gray-100 border-b-2 pb-2">
         <div className="cursor-pointer" onClick={() => setOpen(!isOpen)}>
   
         <span className="text-sm font-bold">RATINGS</span>
         </div>
         {isOpen &&<div className="">
   
         { filters.ratings.map((rating) =>{
           return (<div className="flex items-center">
             <input type="checkbox" name={rating} />
             <label htmlFor={rating} className="text-xs">{`${rating}★ & Above`}</label>
           </div>)
         })}
         </div>}
       </div>
  )
}

export default RatingFilters
