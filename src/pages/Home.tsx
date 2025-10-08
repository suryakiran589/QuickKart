import { useEffect, useMemo, useState } from "react";
import CategoryFilters from "../components/CategoryFilters";
import RatingFilters from "../components/RatingFilters";
import ProductList from "../components/ProductList";
import PriceFilters from "../components/PriceFilters";

export interface Product{
    category:string,
    price:number,
    rating:number
}

const Home = () => {
  let [products, setProducts] = useState<Product[]>([]);
  let [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  let [selectedPriceRange,setSelectedPriceRange] = useState("")
  let [selectedRating,setSelectedRating] = useState("")
  useEffect(() => {
    fetch("https://dummyjson.com/products?limit=150")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.products);
      });
  }, []);

  const filteredList = useMemo(() => {
    return products.filter((product: Product) => {
      if (selectedCategories.length > 0) {
        if (!selectedCategories.includes(product.category)) return false;
      }

      return true;
    })
    .filter((product:Product) => {
        const [min,max] = selectedPriceRange.split("-")
        if(product.price >= Number(min) && 
    (max ? product.price <= Number(max) : true)){
            return true
        }

        return false
    })
    .filter((product)=>{
        if(product.rating >= Number(selectedRating)) return true
        return false
    } );
  }, [products, selectedCategories,selectedPriceRange,selectedRating]);

  return (
    <div className="flex">
      <div className="shadow-lg pl-3 pr-10 py-3 ml-2 h-[600px] ">
        <div className="border-b-gray-100 border-b-2 pl-3 pb-2 mb-2">
          <span className="text-xl font-bold ">Filters</span>
        </div>
        <CategoryFilters
          selectedCategories={selectedCategories}
          setSelectedCategories={setSelectedCategories}
        />
        <RatingFilters selectedRating={selectedRating} setSelectedRating={setSelectedRating}/>
        <PriceFilters selectedPriceRange={selectedPriceRange} setSelectedPriceRange={setSelectedPriceRange}/>
      </div>
      <div className="flex-1 shadow-lg ml-2">
        
        <ProductList products={filteredList}/>
      </div>
    </div>
  );
};

export default Home;
