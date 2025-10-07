import { useEffect, useMemo, useState } from "react"
import CategoryFilters from "../components/CategoryFilters"
import RatingFilters from "../components/RatingFilters"
import ProductList from "../components/ProductList"

const Home = () => {
    let [products,setProducts] = useState([])
    let [selectedCategories,setSelectedCategories] = useState<string[]>([])
    useEffect(() =>{
        fetch('https://dummyjson.com/products?limit=100')
.then(res => res.json())
.then(data =>{
    setProducts(data.products)
},);
    },[])

    const filteredList = useMemo (() =>{
        return  products.filter((product:any) =>{
            if(selectedCategories.length > 0 ){
                if(!selectedCategories.includes(product.category)) return false
            }

            return true
        })
    },[products,selectedCategories]) 

  return (
    <div className="">
        <div>
        <div>
            <span className="text-xl ">Filters</span>
        </div>
      <CategoryFilters selectedCategories={selectedCategories} setSelectedCategories={setSelectedCategories} />
      <RatingFilters />
        </div>
        <div>
            { filteredList.map((item:any) => <li>{item.title}</li>)}
        </div>
    </div>
  )
}

export default Home
