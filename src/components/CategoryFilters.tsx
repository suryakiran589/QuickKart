import { useState, type ChangeEvent } from "react"
import { filters } from "../constants"

interface categoryProps{
  selectedCategories:string[],
  setSelectedCategories:React.Dispatch<React.SetStateAction<string[]>>
}

const CategoryFilters = ({selectedCategories,setSelectedCategories}:categoryProps) => {
  const [isOpen,setOpen] = useState(true)
  return (
    <div className="border-b-gray-100 border-b-2 pb-3 px-3 sm:px-4 md:pl-3 mb-2">
      <div 
        className="cursor-pointer mb-3 flex items-center justify-between"
        onClick={() => setOpen(!isOpen)}
      >
        <span className="text-sm sm:text-base font-bold">CATEGORIES</span>
        <svg 
          className={`w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>
      
      {isOpen && (
        <div className="max-h-48 sm:max-h-60 md:max-h-72 overflow-y-auto scrollbar-hide">
          {filters.categories.map((cat) => {
            const isChecked = selectedCategories.includes(cat)
            return (
              <div key={cat} className="flex items-center pb-2.5 sm:pb-3 last:pb-0">
                <input 
                  type="checkbox" 
                  id={cat}
                  name={cat}
                  checked={isChecked}
                  onChange={(e:ChangeEvent<HTMLInputElement>) => {
                    if(selectedCategories.includes(e.target.name)){
                      let categories = selectedCategories.filter(category => category !== e.target.name)
                      setSelectedCategories(categories)
                    } else {
                      setSelectedCategories((prev:string[]) => [...prev, e.target.name])
                    }
                  }}
                  className="w-4 h-4 sm:w-5 sm:h-5 cursor-pointer flex-shrink-0"
                />
                <label 
                  htmlFor={cat} 
                  className="text-xs sm:text-sm font-medium pl-3 sm:pl-4 cursor-pointer select-none"
                >
                  {cat}
                </label>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default CategoryFilters