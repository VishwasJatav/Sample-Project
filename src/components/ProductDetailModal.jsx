import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "./ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Separator } from "./ui/separator";
import { Switch } from "./ui/switch";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Slider } from "./ui/slider";
import { ScrollArea } from "./ui/scroll-area";
import {
  Heart,
  ShoppingCart,
  Bell,
  Share2,
  Star,
  Check,
  X,
  ChevronRight,
  ExternalLink,
} from "lucide-react";
import PriceHistoryChart from "./PriceHistoryChart";

const ProductDetailModal = ({
  open = true,
  onOpenChange = () => {},
  product = {
    id: "prod123",
    name: "Sony WH-1000XM4 Wireless Noise Cancelling Headphones",
    description:
      "Industry-leading noise cancellation with Dual Noise Sensor technology. Next-level music with Edge-AI, co-developed with Sony Music Studios Tokyo. Up to 30-hour battery life with quick charging (10 min charge for 5 hours of playback).",
    imageUrl: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e",
    amazonPrice: 24990,
    flipkartPrice: 26990,
    amazonOriginalPrice: 29990,
    flipkartOriginalPrice: 29990,
    amazonRating: 4.7,
    flipkartRating: 4.5,
    amazonReviewCount: 12453,
    flipkartReviewCount: 8765,
    amazonInStock: true,
    flipkartInStock: true,
    amazonDeliveryDate: "Tomorrow",
    flipkartDeliveryDate: "2-3 days",
    specifications: [
      { name: "Brand", value: "Sony" },
      { name: "Model", value: "WH-1000XM4" },
      { name: "Color", value: "Black" },
      { name: "Connectivity", value: "Bluetooth 5.0" },
      { name: "Battery Life", value: "Up to 30 hours" },
      { name: "Weight", value: "254g" },
    ],
    features: [
      "Industry-leading noise cancellation",
      "Speak-to-chat technology",
      "Wearing detection",
      "Multipoint connection",
      "Touch controls",
    ],
  },
  onAddToWishlist = () => {},
  onSetPriceAlert = () => {},
  onShare = () => {},
  onBuyFromAmazon = () => {},
  onBuyFromFlipkart = () => {},
}) => {
  const [activeTab, setActiveTab] = useState("overview");
  const [priceAlertEnabled, setPriceAlertEnabled] = useState(false);
  const [alertPrice, setAlertPrice] = useState(product.amazonPrice * 0.9); // Default to 10% less than current price

  const bestPrice = Math.min(product.amazonPrice, product.flipkartPrice);
  const bestPlatform =
    product.amazonPrice <= product.flipkartPrice ? "Amazon" : "Flipkart";

  const formatPrice = (price) => {
    return `₹${price.toLocaleString()}`;
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden bg-white p-0">
        <ScrollArea className="h-full max-h-[90vh]">
          <DialogHeader className="px-6 pt-6 pb-2">
            <div className="flex justify-between items-start">
              <DialogTitle className="text-2xl font-bold pr-4">
                {product.name}
              </DialogTitle>
              <div className="flex gap-2">
                <Button variant="outline" size="icon" onClick={onShare}>
                  <Share2 className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon" onClick={onAddToWishlist}>
                  <Heart className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <div className="flex items-center mt-2">
              <Badge
                variant="outline"
                className="bg-green-100 text-green-800 mr-2"
              >
                Best Price: {formatPrice(bestPrice)}
              </Badge>
              <Badge
                variant="outline"
                className={
                  bestPlatform === "Amazon"
                    ? "bg-amber-100 text-amber-800"
                    : "bg-blue-100 text-blue-800"
                }
              >
                Best on {bestPlatform}
              </Badge>
            </div>
          </DialogHeader>

          <div className="px-6">
            <Tabs
              value={activeTab}
              onValueChange={setActiveTab}
              className="w-full"
            >
              <TabsList className="grid grid-cols-3 mb-6">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="comparison">Price Comparison</TabsTrigger>
                <TabsTrigger value="history">Price History</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-gray-50 rounded-lg p-4 flex items-center justify-center">
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      className="max-h-[300px] object-contain"
                    />
                  </div>

                  <div className="space-y-4">
                    <div>
                      <h3 className="text-lg font-semibold mb-2">
                        Description
                      </h3>
                      <p className="text-gray-700">{product.description}</p>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold mb-2">
                        Key Features
                      </h3>
                      <ul className="list-disc pl-5 space-y-1">
                        {product.features.map((feature, index) => (
                          <li key={index} className="text-gray-700">
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="pt-4">
                      <Button
                        className="w-full mb-2"
                        onClick={
                          product.amazonPrice <= product.flipkartPrice
                            ? onBuyFromAmazon
                            : onBuyFromFlipkart
                        }
                      >
                        <ShoppingCart className="mr-2 h-4 w-4" />
                        Buy from {bestPlatform} ({formatPrice(bestPrice)})
                      </Button>

                      <Button
                        variant="outline"
                        className="w-full"
                        onClick={onSetPriceAlert}
                      >
                        <Bell className="mr-2 h-4 w-4" />
                        Set Price Alert
                      </Button>
                    </div>
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="text-lg font-semibold mb-3">Specifications</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2">
                    {product.specifications.map((spec, index) => (
                      <div
                        key={index}
                        className="flex justify-between py-1 border-b border-gray-100"
                      >
                        <span className="text-gray-600">{spec.name}</span>
                        <span className="font-medium">{spec.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="comparison" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Amazon Card */}
                  <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-center mb-3">
                      <span className="text-xl font-bold text-amber-500 mr-2">
                        Amazon
                      </span>
                      {product.amazonPrice <= product.flipkartPrice && (
                        <Badge
                          variant="outline"
                          className="bg-green-100 text-green-800"
                        >
                          Best Price
                        </Badge>
                      )}
                    </div>

                    <div className="space-y-3">
                      <div className="flex justify-between items-baseline">
                        <span className="text-gray-600">Price:</span>
                        <div>
                          <span className="text-2xl font-bold">
                            {formatPrice(product.amazonPrice)}
                          </span>
                          {product.amazonOriginalPrice >
                            product.amazonPrice && (
                            <span className="text-gray-500 text-sm line-through ml-2">
                              {formatPrice(product.amazonOriginalPrice)}
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Rating:</span>
                        <div className="flex items-center">
                          <span className="font-medium mr-1">
                            {product.amazonRating}
                          </span>
                          <Star className="h-4 w-4 text-yellow-400 fill-current" />
                          <span className="text-gray-500 text-sm ml-1">
                            ({product.amazonReviewCount})
                          </span>
                        </div>
                      </div>

                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Availability:</span>
                        <div className="flex items-center">
                          {product.amazonInStock ? (
                            <>
                              <Check className="h-4 w-4 text-green-500 mr-1" />
                              <span className="text-green-600">In Stock</span>
                            </>
                          ) : (
                            <>
                              <X className="h-4 w-4 text-red-500 mr-1" />
                              <span className="text-red-600">Out of Stock</span>
                            </>
                          )}
                        </div>
                      </div>

                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Delivery:</span>
                        <span className="font-medium">
                          {product.amazonDeliveryDate}
                        </span>
                      </div>
                    </div>

                    <Button
                      className="w-full mt-4"
                      onClick={onBuyFromAmazon}
                      variant={
                        product.amazonPrice <= product.flipkartPrice
                          ? "default"
                          : "outline"
                      }
                    >
                      <ShoppingCart className="mr-2 h-4 w-4" />
                      Buy from Amazon
                      <ExternalLink className="ml-2 h-3 w-3" />
                    </Button>
                  </div>

                  {/* Flipkart Card */}
                  <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-center mb-3">
                      <span className="text-xl font-bold text-blue-600 mr-2">
                        Flipkart
                      </span>
                      {product.flipkartPrice <= product.amazonPrice && (
                        <Badge
                          variant="outline"
                          className="bg-green-100 text-green-800"
                        >
                          Best Price
                        </Badge>
                      )}
                    </div>

                    <div className="space-y-3">
                      <div className="flex justify-between items-baseline">
                        <span className="text-gray-600">Price:</span>
                        <div>
                          <span className="text-2xl font-bold">
                            {formatPrice(product.flipkartPrice)}
                          </span>
                          {product.flipkartOriginalPrice >
                            product.flipkartPrice && (
                            <span className="text-gray-500 text-sm line-through ml-2">
                              {formatPrice(product.flipkartOriginalPrice)}
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Rating:</span>
                        <div className="flex items-center">
                          <span className="font-medium mr-1">
                            {product.flipkartRating}
                          </span>
                          <Star className="h-4 w-4 text-yellow-400 fill-current" />
                          <span className="text-gray-500 text-sm ml-1">
                            ({product.flipkartReviewCount})
                          </span>
                        </div>
                      </div>

                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Availability:</span>
                        <div className="flex items-center">
                          {product.flipkartInStock ? (
                            <>
                              <Check className="h-4 w-4 text-green-500 mr-1" />
                              <span className="text-green-600">In Stock</span>
                            </>
                          ) : (
                            <>
                              <X className="h-4 w-4 text-red-500 mr-1" />
                              <span className="text-red-600">Out of Stock</span>
                            </>
                          )}
                        </div>
                      </div>

                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Delivery:</span>
                        <span className="font-medium">
                          {product.flipkartDeliveryDate}
                        </span>
                      </div>
                    </div>

                    <Button
                      className="w-full mt-4"
                      onClick={onBuyFromFlipkart}
                      variant={
                        product.flipkartPrice <= product.amazonPrice
                          ? "default"
                          : "outline"
                      }
                    >
                      <ShoppingCart className="mr-2 h-4 w-4" />
                      Buy from Flipkart
                      <ExternalLink className="ml-2 h-3 w-3" />
                    </Button>
                  </div>
                </div>

                <div className="mt-6 p-4 border rounded-lg bg-gray-50">
                  <h3 className="text-lg font-semibold mb-3">Price Alert</h3>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                      <Switch
                        id="price-alert"
                        checked={priceAlertEnabled}
                        onCheckedChange={setPriceAlertEnabled}
                      />
                      <Label htmlFor="price-alert" className="ml-2">
                        Notify me when price drops
                      </Label>
                    </div>
                    <div className="flex items-center">
                      <Input
                        type="number"
                        value={alertPrice}
                        onChange={(e) => setAlertPrice(Number(e.target.value))}
                        className="w-24 mr-2"
                        disabled={!priceAlertEnabled}
                      />
                      <span className="text-gray-600">or lower</span>
                    </div>
                  </div>

                  {priceAlertEnabled && (
                    <div className="space-y-4">
                      <div>
                        <Label className="mb-2 block">
                          Set your target price
                        </Label>
                        <Slider
                          defaultValue={[alertPrice]}
                          max={product.amazonOriginalPrice}
                          min={product.amazonOriginalPrice * 0.5}
                          step={100}
                          onValueChange={(value) => setAlertPrice(value[0])}
                          className="py-4"
                        />
                        <div className="flex justify-between text-sm text-gray-500">
                          <span>
                            {formatPrice(product.amazonOriginalPrice * 0.5)}
                          </span>
                          <span>
                            {formatPrice(product.amazonOriginalPrice)}
                          </span>
                        </div>
                      </div>

                      <Button className="w-full" onClick={onSetPriceAlert}>
                        <Bell className="mr-2 h-4 w-4" />
                        Save Alert
                      </Button>
                    </div>
                  )}
                </div>
              </TabsContent>

              <TabsContent value="history" className="space-y-6">
                <div className="h-[400px]">
                  <PriceHistoryChart
                    productName={product.name}
                    timeRange="6M"
                  />
                </div>

                <div className="p-4 border rounded-lg bg-gray-50">
                  <h3 className="text-lg font-semibold mb-2">Price Insights</h3>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <ChevronRight className="h-5 w-5 text-blue-500 mr-1 flex-shrink-0 mt-0.5" />
                      <span>
                        Lowest recorded price was{" "}
                        <strong>
                          {formatPrice(product.amazonPrice * 0.8)}
                        </strong>{" "}
                        on Amazon (3 months ago)
                      </span>
                    </li>
                    <li className="flex items-start">
                      <ChevronRight className="h-5 w-5 text-blue-500 mr-1 flex-shrink-0 mt-0.5" />
                      <span>
                        Current price is{" "}
                        <strong>
                          {Math.round(
                            (product.amazonPrice / (product.amazonPrice * 0.8) -
                              1) *
                              100,
                          )}
                          %
                        </strong>{" "}
                        higher than the lowest recorded price
                      </span>
                    </li>
                    <li className="flex items-start">
                      <ChevronRight className="h-5 w-5 text-blue-500 mr-1 flex-shrink-0 mt-0.5" />
                      <span>
                        Based on price trends, best time to buy might be during
                        upcoming sale events
                      </span>
                    </li>
                  </ul>
                </div>
              </TabsContent>
            </Tabs>
          </div>

          <DialogFooter className="px-6 py-4 border-t mt-6">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Close
            </Button>
            <Button
              onClick={
                product.amazonPrice <= product.flipkartPrice
                  ? onBuyFromAmazon
                  : onBuyFromFlipkart
              }
            >
              <ShoppingCart className="mr-2 h-4 w-4" />
              Buy Now ({formatPrice(bestPrice)})
            </Button>
          </DialogFooter>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default ProductDetailModal;
