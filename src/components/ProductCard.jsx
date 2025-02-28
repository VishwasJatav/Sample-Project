import React from "react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import { Heart, ShoppingCart, Star, TrendingUp } from "lucide-react";

const ProductCard = ({
  platform = "Amazon",
  productName = "Wireless Bluetooth Headphones with Noise Cancellation",
  price = 1299,
  originalPrice = 1999,
  discount = 35,
  rating = 4.2,
  reviewCount = 1245,
  imageUrl = "https://images.unsplash.com/photo-1505740420928-5e560c06d30e",
  inStock = true,
  deliveryDate = "Tomorrow",
  onViewDetails = () => {},
  onAddToWishlist = () => {},
  onBuyNow = () => {},
}) => {
  const platformColor =
    platform === "Amazon"
      ? "bg-amber-100 text-amber-800"
      : "bg-blue-100 text-blue-800";
  const platformLogo = platform === "Amazon" ? "🛒" : "🛍️";

  return (
    <Card className="w-full max-w-[580px] h-[300px] overflow-hidden bg-white border border-gray-200 shadow-md hover:shadow-lg transition-shadow duration-300">
      <div className="flex h-full">
        {/* Product Image Section */}
        <div className="w-1/3 p-4 flex items-center justify-center bg-gray-50">
          <div className="relative w-full h-full">
            <img
              src={imageUrl}
              alt={productName}
              className="object-contain w-full h-full rounded-md"
            />
            <Badge className={`absolute top-0 left-0 ${platformColor}`}>
              {platformLogo} {platform}
            </Badge>
            {discount > 0 && (
              <Badge className="absolute top-0 right-0 bg-red-100 text-red-800">
                {discount}% OFF
              </Badge>
            )}
          </div>
        </div>

        {/* Product Details Section */}
        <div className="w-2/3 flex flex-col">
          <CardHeader className="pb-2 pt-4">
            <h3 className="text-lg font-semibold line-clamp-2">
              {productName}
            </h3>
            <div className="flex items-center mt-1">
              <div className="flex items-center bg-green-100 text-green-800 rounded px-2 py-0.5">
                <span className="font-medium">{rating}</span>
                <Star className="h-3.5 w-3.5 ml-1 fill-current" />
              </div>
              <span className="text-gray-500 text-sm ml-2">
                ({reviewCount} reviews)
              </span>
            </div>
          </CardHeader>

          <CardContent className="py-2">
            <div className="flex items-baseline mb-2">
              <span className="text-2xl font-bold">
                ₹{price.toLocaleString()}
              </span>
              {originalPrice > price && (
                <span className="text-gray-500 text-sm line-through ml-2">
                  ₹{originalPrice.toLocaleString()}
                </span>
              )}
            </div>

            <div className="flex flex-col gap-1 text-sm">
              <div className="flex items-center">
                <span className={inStock ? "text-green-600" : "text-red-600"}>
                  {inStock ? "In Stock" : "Out of Stock"}
                </span>
              </div>
              {inStock && (
                <div className="flex items-center">
                  <span>Delivery by: {deliveryDate}</span>
                </div>
              )}
              <div className="flex items-center mt-1">
                <TrendingUp className="h-4 w-4 text-blue-500 mr-1" />
                <span className="text-blue-500">Price dropped recently</span>
              </div>
            </div>
          </CardContent>

          <CardFooter className="pt-2 pb-4 mt-auto">
            <div className="flex gap-2 w-full">
              <Button
                variant="outline"
                size="sm"
                className="flex-1"
                onClick={onViewDetails}
              >
                View Details
              </Button>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={onAddToWishlist}
                      className="h-9 w-9"
                    >
                      <Heart className="h-5 w-5" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Add to wishlist</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <Button
                variant="default"
                size="sm"
                className="flex-1 gap-1"
                onClick={onBuyNow}
              >
                <ShoppingCart className="h-4 w-4" />
                Buy Now
              </Button>
            </div>
          </CardFooter>
        </div>
      </div>
    </Card>
  );
};

export default ProductCard;
