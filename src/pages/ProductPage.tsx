import { useEffect, useState } from "react";
import {
  Star,
  Heart,
  Share2,
  ThumbsUp,
  ThumbsDown,
  ChevronLeft,
  ChevronRight,
  ShoppingCart,
} from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import type { Product } from "./Home";




const ProductCard = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const navigate = useNavigate();
  console.log(product);

  useEffect(() => {
    setLoading(true);
    fetch("https://dummyjson.com/products/" + id)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching product:", error);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Product not found</div>
      </div>
    );
  }

  const originalPrice = Math.round(
    product.price / (1 - product.discountPercentage / 100)
  );

  const formatDate = (dateString:Date) => {
    const date:any = new Date(dateString);
    const now:any = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays < 30) return `${diffDays} days ago`;
    if (diffDays < 60) return `1 month ago`;
    return `${Math.floor(diffDays / 30)} months ago`;
  };

  const nextImage = () => {
    if (product.images && product.images.length > 0) {
      setCurrentImageIndex((prev) => (prev + 1) % product.images.length);
    }
  };

  const prevImage = () => {
    if (product.images && product.images.length > 0) {
      setCurrentImageIndex(
        (prev) => (prev - 1 + product.images.length) % product.images.length
      );
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Mobile Header */}
      <div className="lg:hidden sticky top-0 z-50 bg-white shadow-sm">
        <div className="flex items-center justify-between px-3 py-2.5">
          <button onClick={() => navigate("/")}>
            <ChevronLeft className="w-6 h-6 text-gray-800" />
          </button>
          <div className="flex gap-5">
            <button onClick={() => setIsWishlisted(!isWishlisted)}>
              <Heart
                className={`w-5 h-5 ${
                  isWishlisted ? "fill-red-500 text-red-500" : "text-gray-700"
                }`}
              />
            </button>
            <button>
              <Share2 className="w-5 h-5 text-gray-700" />
            </button>
          </div>
        </div>
      </div>

      <div className="lg:px-8 lg:py-3">
        <div className="lg:flex lg:gap-6">
          {/* Left Side - Product Images */}
          <div className="lg:flex-1 lg:w-[50vw] lg:sticky lg:top-4 lg:self-start">
            <div className="bg-white lg:border lg:border-gray-200 lg:p-6">
              {/* Desktop Wishlist & Share */}
              <div className="hidden lg:flex justify-end gap-3 mb-4">
                <button
                  onClick={() => setIsWishlisted(!isWishlisted)}
                  className="p-2 rounded-full hover:bg-gray-100"
                >
                  <Heart
                    className={`w-5 h-5 ${
                      isWishlisted
                        ? "fill-red-500 text-red-500"
                        : "text-gray-600"
                    }`}
                  />
                </button>
                <button className="p-2 rounded-full hover:bg-gray-100">
                  <Share2 className="w-5 h-5 text-gray-600" />
                </button>
              </div>

              {/* Main Image */}
              <div className="relative group">
                <img
                  src={product.images?.[currentImageIndex] || product.thumbnail}
                  alt={product.title}
                  className="w-full h-80 sm:h-96 lg:h-[450px] object-contain"
                />

                {/* Navigation Arrows */}
                {product.images && product.images.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/90 rounded-full p-2 shadow opacity-0 group-hover:opacity-100 transition"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/90 rounded-full p-2 shadow opacity-0 group-hover:opacity-100 transition"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </>
                )}
              </div>

              {/* Thumbnail Gallery */}
              {product.images && product.images.length > 1 && (
                <div className="flex gap-2 mt-4 justify-center">
                  {product.images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentImageIndex(idx)}
                      className={`w-12 h-12 border-2 rounded overflow-hidden ${
                        idx === currentImageIndex
                          ? "border-blue-500"
                          : "border-gray-200"
                      }`}
                    >
                      <img
                        src={img}
                        alt=""
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}

              {/* Action Buttons - Desktop */}
              <div className="hidden lg:flex gap-3 mt-6">
                <button className="flex-1 bg-orange-500 text-white py-3 rounded-sm font-medium hover:bg-orange-600 transition flex items-center justify-center gap-2 text-lg">
                  <ShoppingCart className="w-5 h-5" />
                  ADD TO CART
                </button>
                <button className="flex-1 bg-gradient-to-b from-orange-500 to-orange-600 text-white py-3 rounded-sm font-medium transition flex items-center justify-center gap-2 text-lg">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    className="lucide lucide-zap-icon lucide-zap"
                  >
                    <path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z" />
                  </svg>
                  BUY NOW
                </button>
              </div>
            </div>
          </div>

          {/* Right Side - Product Details */}
          <div className="lg:flex-1 w-full lg:border lg:border-gray-200 lg:bg-white">
            <div className="p-4 lg:p-6">
              {/* Breadcrumb - Desktop Only */}
              <div className="hidden lg:flex items-center text-xs text-gray-500 mb-4">
                <span
                  onClick={() => navigate("/")}
                  className="hover:text-blue-600 cursor-pointer"
                >
                  Home
                </span>
                <ChevronRight className="w-3 h-3 mx-1" />
                <span className="hover:text-blue-600 cursor-pointer capitalize">
                  {product.category}
                </span>
                <ChevronRight className="w-3 h-3 mx-1" />
                <span className="text-gray-800">{product.brand}</span>
              </div>

              {/* Title */}
              <h1 className="text-base lg:text-lg text-gray-800 mb-2 leading-relaxed">
                {product.title}
              </h1>

              {/* Rating */}
              <div className="flex items-center gap-3 mb-4">
                <div className="flex items-center gap-1 bg-green-700 text-white px-2 py-0.5 rounded-sm text-xs font-semibold">
                  {product.rating}
                  <Star className="w-3 h-3 fill-white" />
                </div>
                <span className="text-gray-500 text-xs font-medium">
                  {product.reviews?.length || 0} Ratings & Reviews
                </span>
              </div>

              {/* Price */}
              <div className="mb-4">
                <div className="text-green-600 font-medium text-xs mb-1">
                  Extra ${(originalPrice - product.price).toFixed(2)} off
                </div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-3xl font-medium">
                    ${product.price.toLocaleString()}
                  </span>
                  <span className="text-gray-500 line-through text-base">
                    ${originalPrice.toLocaleString()}
                  </span>
                  <span className="text-green-600 font-medium text-sm">
                    {product.discountPercentage}% off
                  </span>
                </div>
                {/* <div className="text-xs text-gray-600">
                  + ₹79 Protect Promise Fee <a href="#" className="text-blue-600 font-medium">Learn more</a>
                </div> */}
              </div>

              {/* Delivery */}
              <div className="text-sm text-gray-700 mb-4">
                Secure delivery by{" "}
                <span className="font-medium">14 Oct, Tuesday</span>
              </div>

  
              <div className="mb-5">
                <h3 className="font-medium text-sm mb-3">Specifications</h3>
                <div className="space-y-2">
                  <div className="flex text-sm">
                    <span className="text-gray-500 w-32">Brand</span>
                    <span className="text-gray-800">
                      {product.brand || "N/A"}
                    </span>
                  </div>
                  <div className="flex text-sm">
                    <span className="text-gray-500 w-32">Warranty</span>
                    <span className="text-gray-800">
                      {product.warrantyInformation || "N/A"}
                    </span>
                  </div>
                  <div className="flex text-sm">
                    <span className="text-gray-500 w-32">Stock</span>
                    <span
                      className={`font-medium ${
                        product.stock < 10
                          ? "text-orange-600"
                          : "text-green-600"
                      }`}
                    >
                      {product.availabilityStatus ||
                        (product.stock > 0 ? "In Stock" : "Out of Stock")}
                    </span>
                  </div>
                  <div className="flex text-sm">
                    <span className="text-gray-500 w-32">Return Policy</span>
                    <span className="text-gray-800">
                      {product.returnPolicy || "N/A"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="mb-5">
                <h3 className="font-medium text-sm mb-2">Description</h3>
                <p className="text-sm text-gray-700 leading-relaxed">
                  {product.description}
                </p>
              </div>

              {/* Reviews */}
              {product.reviews && product.reviews.length > 0 && (
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-medium text-base">Ratings & Reviews</h3>
                    <button className="text-blue-600 text-xs font-medium">
                      Rate Product
                    </button>
                  </div>
                  <div className="space-y-4">
                    {product.reviews.map((review, idx) => (
                      <div
                        key={idx}
                        className="pb-4 border-b border-gray-200 last:border-0"
                      >
                        <div className="flex items-center gap-2 mb-2">
                          <div className="flex items-center gap-1 bg-green-700 text-white px-1.5 py-0.5 rounded-sm">
                            <span className="text-xs font-semibold">
                              {review.rating}
                            </span>
                            <Star className="w-2.5 h-2.5 fill-white" />
                          </div>
                          <span className="font-medium text-sm">
                            {review.comment.substring(0, 30)}
                          </span>
                        </div>
                        <p className="text-sm text-gray-800 mb-3">
                          {review.comment}
                        </p>
                        <div className="flex items-center justify-between text-xs">
                          <div className="text-gray-500">
                            <span className="font-medium text-gray-700">
                              {review.reviewerName}
                            </span>
                            <span className="mx-1">•</span>
                            <span>Certified Buyer</span>
                            <span className="mx-1">•</span>
                            <span>{formatDate(review.date)}</span>
                          </div>
                          <div className="flex items-center gap-4">
                            <button className="flex items-center gap-1 text-gray-500 hover:text-blue-600">
                              <ThumbsUp className="w-3.5 h-3.5" />
                              <span>{Math.floor(Math.random() * 200)}</span>
                            </button>
                            <button className="flex items-center gap-1 text-gray-500 hover:text-blue-600">
                              <ThumbsDown className="w-3.5 h-3.5" />
                              <span>{Math.floor(Math.random() * 40)}</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <button className="text-blue-600 font-medium text-sm mt-4">
                    All {product.reviews.length} reviews
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Bottom Buttons */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg z-50">
        <div className="flex">
          <button className="flex-1 bg-white text-gray-800 py-3.5 font-medium flex items-center justify-center gap-2 border-r border-gray-200">
            <ShoppingCart className="w-5 h-5" />
            ADD TO CART
          </button>
          <button className="flex-1 bg-gradient-to-b from-orange-500 to-orange-600 text-white py-3.5 font-medium flex items-center justify-center gap-2">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                clipRule="evenodd"
              />
            </svg>
            BUY NOW
          </button>
        </div>
      </div>

      <div className="lg:hidden h-16"></div>
    </div>
  );
};

export default ProductCard;
