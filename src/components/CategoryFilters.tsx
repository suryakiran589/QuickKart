import { useState } from "react"
import { filters } from "../constants"

interface categoryProps{
  selectedCategories:string[],
  setSelectedCategories:any
}

const CategoryFilters = ({selectedCategories,setSelectedCategories}:categoryProps) => {
  const [isOpen,setOpen] = useState(true)
  return (
    <div className="border-b-gray-100 border-b-2 pb-2">
      <div className="cursor-pointer" onClick={() => setOpen(!isOpen)}>

      <span className="text-sm font-bold">CATEGORIES</span>
      </div>
      {isOpen &&<div className="h-60 overflow-y-scroll">

      { filters.categories.map((cat) =>{
        return (<div className="flex items-center">
          <input type="checkbox" name={cat} onChange={(e) =>{
            if(selectedCategories.includes(e.target.name)){
              let categories = selectedCategories.filter(category => category !== e.target.name )
              setSelectedCategories(categories)
            }
              else{
                setSelectedCategories((prev:any) => [...prev,e.target.name])
            }
          } }/>
          <label htmlFor={cat} className="text-xs">{cat}</label>
        </div>)
      })}
      </div>}
    </div>
  )
}

export default CategoryFilters
