import ProductCard from "./ProductCard"
import type { Product } from "../pages/Home"



const ProductList = ({products}:{products:Product[]}) => {
  return (
    <div className="flex flex-wrap gap-2 min-h-[800px] min-w-full">
      {products.map((item: any) => (
          <ProductCard product={item }/>
        ))}
    </div>
  )
}

export default ProductList
