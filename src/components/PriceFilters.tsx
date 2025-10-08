

const PriceFilters = ({selectedPriceRange,setSelectedPriceRange}:{selectedPriceRange:string,setSelectedPriceRange:(ele:string) =>void}) => {
  return (
    <div className="border-b-gray-100 mb-2 border-b-2 pb-2 pl-3">
        <p className="text-sm font-bold">PRICE</p>
      <select
  value={selectedPriceRange}
  onChange={(e) => setSelectedPriceRange(e.target.value)}
>
  <option value="">All Prices</option>
  <option value="0-500">$0 - $500</option>
  <option value="500-1000">$500 - $1000</option>
  <option value="1000-2000">$1000 - $2000</option>
  <option value="2000-">$2000+</option>
</select>
    </div>
  )
}

export default PriceFilters
