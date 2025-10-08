import { useState, type ChangeEvent } from "react"
import { filters } from "../constants"

interface categoryProps{
  selectedCategories:string[],
  setSelectedCategories:React.Dispatch<React.SetStateAction<string[]>>
}

const CategoryFilters = ({selectedCategories,setSelectedCategories}:categoryProps) => {
  const [isOpen,setOpen] = useState(true)
  return (
    <div className="border-b-gray-100 border-b-2 pb-2 pl-3 mb-2">
      <div className="cursor-pointer mb-2" onClick={() => setOpen(!isOpen)}>

      <span className="text-sm font-bold ">CATEGORIES</span>
      </div>
      {isOpen &&<div className="h-60 overflow-y-scroll scrollbar-hide">

      { filters.categories.map((cat) =>{
        return (<div className="flex items-center  pb-2">
          <input type="checkbox" name={cat} onChange={(e:ChangeEvent<HTMLInputElement>) =>{
            if(selectedCategories.includes(e.target.name)){
              let categories = selectedCategories.filter(category => category !== e.target.name )
              setSelectedCategories(categories)
            }
              else{
                setSelectedCategories((prev:any) => [...prev,e.target.name])
            }
          } }/>
          <label htmlFor={cat} className="text-sm font-medium pl-4">{cat}</label>
        </div>)
      })}
      </div>}
    </div>
  )
}

export default CategoryFilters
