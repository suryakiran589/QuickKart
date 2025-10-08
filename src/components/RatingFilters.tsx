import { useState } from "react"
import { filters } from "../constants"


const RatingFilters = ({selectedRating,setSelectedRating}:{selectedRating:string,setSelectedRating:any}) => {
    const [isOpen,setOpen] = useState(true)
  return (
   <div className="border-b-gray-100 border-b-2 pb-2 pl-3 mb-2">
         <div className="cursor-pointer mb-2" onClick={() => setOpen(!isOpen)}>
   
         <span className="text-sm font-bold">RATINGS</span>
         </div>
         {isOpen &&<div className="">
   
         { filters.ratings.map((rating) =>{
           return (<div className="flex items-center pb-2">
             <input type="checkbox" name={rating}  value={rating} onChange={(e)=>setSelectedRating((prev) => prev ==e.target.value ? "" :e.target.value)}/>
             <label htmlFor={rating} className="text-sm font-medium pl-4">{`${rating}★ & Above`}</label>
           </div>)
         })}
         </div>}
       </div>
  )
}

export default RatingFilters
