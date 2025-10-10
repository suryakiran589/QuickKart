import { useEffect, useMemo, useState } from "react";
import CategoryFilters from "../components/CategoryFilters";
import RatingFilters from "../components/RatingFilters";
import ProductList from "../components/ProductList";
import PriceFilters from "../components/PriceFilters";
import { sortings } from "../constants";

export interface Product{
    category:string,
    price:number,
    rating:number,
    id:number,
    discountPercentage:number
}

const ITEMS_PER_PAGE = 10;

const Home = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedPriceRange,setSelectedPriceRange] = useState("")
  const [selectedRating,setSelectedRating] = useState("")
  const [currentPage,setCurrentPage] = useState(1)
  const [selectedSort,setSelectedSort] = useState(0)
  const [showFilters, setShowFilters] = useState(true)
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  
  useEffect(() => {
    setIsLoading(true);
    fetch("https://dummyjson.com/products?limit=150")
    .then((res) => res.json())
    .then((data) => {
      setProducts(data.products);
      setIsLoading(false);
    })
    .catch((err) => {
      setError(err.message);
      setIsLoading(false);
    });
  }, []);

    useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategories, selectedPriceRange, selectedRating, selectedSort]);
  
    
  const filteredList = useMemo(() => {
    const [minPrice, maxPrice] = selectedPriceRange 
      ? selectedPriceRange.split("-").map(Number) 
      : [0, Infinity];
    const minRating = selectedRating ? Number(selectedRating) : 0;
    
    let filtered = products.filter((product) => {
      // Category filter
      if (selectedCategories.length > 0 && !selectedCategories.includes(product.category)) {
        return false;
      }
      
      // Price filter
      if (selectedPriceRange && (product.price < minPrice || product.price > maxPrice)) {
        return false;
      }
      
      // Rating filter
      if (selectedRating && product.rating < minRating) {
        return false;
      }
      
      return true;
    });
    
    // Sorting
    return filtered.sort((a, b) => {
      switch(selectedSort) {
        case 1: return b.rating - a.rating;
        case 2: return a.price - b.price;
        case 3: return b.price - a.price;
        case 4: return b.discountPercentage - a.discountPercentage;
        default: return a.id - b.id;
      }
    });
  }, [products, selectedCategories, selectedPriceRange, selectedRating, selectedSort]);

 const totalPages = Math.ceil(filteredList.length / ITEMS_PER_PAGE);
  const paginatedProducts = filteredList.slice(
    (currentPage - 1) * ITEMS_PER_PAGE, 
    currentPage * ITEMS_PER_PAGE
  );

    if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <p className="text-red-600 font-semibold mb-2">Error loading products</p>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    );
  }
  
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen w-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#2874f0] mx-auto mb-4"></div>
          <p className="text-gray-600">Loading products...</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="flex flex-col lg:flex-row min-h-screen">
      {/* Mobile Filter Toggle Button */}
      <button
        onClick={() => setShowFilters(!showFilters)}
        className="lg:hidden fixed bottom-4 right-4 z-50 bg-[#2874f0] text-white px-4 py-3 rounded-full shadow-lg flex items-center gap-2 text-sm font-semibold"
        aria-label="Toggle filters"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
        </svg>
        Filters
      </button>

      {/* Overlay for mobile filters */}
      {showFilters && (
        <div 
            className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={() => setShowFilters(false)}
          />
        )} 

      {/* Filters Sidebar */}
      <aside 
        className={`
          fixed lg:sticky top-0 left-0 h-screen lg:h-auto
          w-64 sm:w-80 lg:w-auto
          bg-white shadow-lg 
          px-3 sm:px-4 lg:pl-3 lg:pr-10 py-3 
          overflow-y-auto
          z-50 lg:z-0
          transform transition-transform duration-300 ease-in-out
          ${showFilters ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
        aria-label="Filters"
      >
        {/* Close button for mobile */}
        <button
          onClick={() => setShowFilters(false)}
          className="lg:hidden absolute top-3 right-3 p-2 text-gray-500 hover:text-gray-700"
          aria-label="Close filters"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="border-b-gray-100 border-b-2 pl-3 pb-2 mb-2">
          <span className="text-lg sm:text-xl font-bold">Filters</span>
        </div>
        <CategoryFilters
          selectedCategories={selectedCategories}
          setSelectedCategories={setSelectedCategories}
        />
        <RatingFilters 
          selectedRating={selectedRating} 
          setSelectedRating={setSelectedRating}
        />
        <PriceFilters 
          selectedPriceRange={selectedPriceRange} 
          setSelectedPriceRange={setSelectedPriceRange}
        />
      </aside>

      {/* Main Content */}
      <main className="flex-1 w-full lg:w-auto">
        {/* Sort Bar */}
        <div className="flex px-2 sm:px-3 pt-3 sm:pt-4 text-sm items-center border-b-slate-300 border-b-2 overflow-x-auto scrollbar-hide">
          <span className="font-bold pr-2 sm:pr-3 md:pt-2 md:pr-2.5 md:pb-1 whitespace-nowrap flex-shrink-0">
            Sort By
          </span>
          <div className="flex gap-1 sm:gap-2 md:gap-0">
            {sortings.map((sort, i) => (
              <button
                key={i} 
                onClick={() => setSelectedSort(i)} 
                className={`pt-0.5 pb-2 px-2 sm:px-3 text-xs sm:text-sm md:pt-2 md:pb-1 md:mx-2.5 cursor-pointer whitespace-nowrap border-none bg-transparent ${
                  i === selectedSort 
                    ? "font-bold text-[#2874f0] border-[#2874f0] border-b-2"
                    : ""
                }`}
              >
                {sort}
              </button>
            ))}
          </div>
        </div>

        {/* Products */}
        <div className="shadow-lg">
          {filteredList.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              <p className="text-lg font-semibold mb-2">No products found</p>
              <p className="text-sm">Try adjusting your filters</p>
            </div>
          ) : (
            <ProductList products={paginatedProducts} />
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <nav 
            className="flex justify-center items-center w-full px-2 pb-20 lg:pb-5"
            aria-label="Pagination"
          >
            <div className="py-5 flex flex-wrap gap-2 justify-center">
              {Array.from({ length: totalPages }, (_, i) => (
                <button 
                  key={i}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`content-center text-center ${
                    currentPage === i + 1 
                      ? "bg-[#2874f0] text-white" 
                      : "text-black bg-gray-100"
                  } h-8 w-8 sm:h-10 sm:w-10 rounded-full p-0 border-none text-sm sm:text-base font-medium hover:bg-[#2874f0] hover:text-white transition-colors`}
                  aria-label={`Go to page ${i + 1}`}
                  aria-current={currentPage === i + 1 ? "page" : undefined}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          </nav>
        )}
      </main>
    </div>
  );
};

export default Home;
