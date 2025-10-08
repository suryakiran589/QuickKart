import ProductCard from "./ProductCard"
import type { Product } from "../pages/Home"



const ProductList = ({products}:{products:Product[]}) => {
  return (
    <div className="flex flex-wrap">
      {products.map((item: any) => (
          <ProductCard product={item }/>
        ))}
    </div>
  )
}

export default ProductList
