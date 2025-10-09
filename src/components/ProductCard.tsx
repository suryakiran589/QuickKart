

const ProductCard = ({product}:{product:any}) => {
    function generatePurchases() {
        return Math.floor(Math.random() * (5000 - 50 + 1)) + 50; // 50 to 5000
    }
 
  return (
    <div className="group flex-1 max-h-[400px] min-w-[260px] max-w-[300px] w-72 py-4 px-6 hover:shadow-lg hover:cursor-pointer">
      <div>
        <img src={product.images[0]} className="h-64" alt="" />
      </div>
      <div>
        <p className="text-sm font-normal group-hover:text-[#2874f0]">{product.title}</p>
        <div className="text-xs text-[#878787]">{product.description.substring(0,60) + "..."}</div >
        <div>
            <span className={`text-xs ${product.rating < 3 ? "bg-[#ff9f00]" :"bg-[#4c9950]"} font-bold px-1 py-0.5 rounded-[3px] text-white`}>{product.rating.toFixed(1)} ★</span>
            <span className="text-[#878787] font-bold pl-2 text-sm">({generatePurchases()})</span>
        </div>
        <div>
            <div className="inline-block font-bold text-base">${product.price}</div>
            <div className="inline-block font-medium text-sm text-[#878787] ml-2 line-through">${(product.price + ((product.price / 100)*product.discountPercentage)).toFixed(2)}</div>
            <div className="inline-block text-xs ml-2 font-bold text-[#388e3c]">{product.discountPercentage}% off</div>
        </div>
      </div>

    </div>
  )
}

export default ProductCard
