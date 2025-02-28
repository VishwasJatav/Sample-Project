import React, { useState } from "react";
import ProductCard from "./ProductCard";
import PriceHistoryChart from "./PriceHistoryChart";
import { Button } from "./ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Pagination } from "./ui/pagination";
import {
  ArrowDownUp,
  Filter,
  RefreshCw,
  SlidersHorizontal,
} from "lucide-react";

interface Product {
  id: string;
  name: string;
  amazonPrice: number;
  amazonOriginalPrice: number;
  amazonDiscount: number;
  amazonRating: number;
  amazonReviewCount: number;
  amazonImageUrl: string;
  amazonInStock: boolean;
  amazonDeliveryDate: string;
  flipkartPrice: number;
  flipkartOriginalPrice: number;
  flipkartDiscount: number;
  flipkartRating: number;
  flipkartReviewCount: number;
  flipkartImageUrl: string;
  flipkartInStock: boolean;
  flipkartDeliveryDate: string;
}

interface ResultsGridProps {
  products?: Product[];
  isLoading?: boolean;
  onSortChange?: (sortOption: string) => void;
  onFilterChange?: (filters: any) => void;
  onProductSelect?: (productId: string) => void;
}

const ResultsGrid = ({
  products = [
    {
      id: "1",
      name: "Wireless Bluetooth Headphones with Noise Cancellation",
      amazonPrice: 1299,
      amazonOriginalPrice: 1999,
      amazonDiscount: 35,
      amazonRating: 4.2,
      amazonReviewCount: 1245,
      amazonImageUrl:
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e",
      amazonInStock: true,
      amazonDeliveryDate: "Tomorrow",
      flipkartPrice: 1399,
      flipkartOriginalPrice: 1899,
      flipkartDiscount: 26,
      flipkartRating: 4.0,
      flipkartReviewCount: 980,
      flipkartImageUrl:
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e",
      flipkartInStock: true,
      flipkartDeliveryDate: "Day after tomorrow",
    },
    {
      id: "2",
      name: "Smartphone 128GB Storage 8GB RAM",
      amazonPrice: 12999,
      amazonOriginalPrice: 15999,
      amazonDiscount: 19,
      amazonRating: 4.5,
      amazonReviewCount: 3245,
      amazonImageUrl:
        "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9",
      amazonInStock: true,
      amazonDeliveryDate: "Tomorrow",
      flipkartPrice: 12499,
      flipkartOriginalPrice: 16999,
      flipkartDiscount: 26,
      flipkartRating: 4.4,
      flipkartReviewCount: 2980,
      flipkartImageUrl:
        "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9",
      flipkartInStock: true,
      flipkartDeliveryDate: "Tomorrow",
    },
    {
      id: "3",
      name: "Smart Watch with Heart Rate Monitor",
      amazonPrice: 2499,
      amazonOriginalPrice: 3499,
      amazonDiscount: 29,
      amazonRating: 4.1,
      amazonReviewCount: 845,
      amazonImageUrl:
        "https://images.unsplash.com/photo-1523275335684-37898b6baf30",
      amazonInStock: true,
      amazonDeliveryDate: "Day after tomorrow",
      flipkartPrice: 2599,
      flipkartOriginalPrice: 3299,
      flipkartDiscount: 21,
      flipkartRating: 4.2,
      flipkartReviewCount: 756,
      flipkartImageUrl:
        "https://images.unsplash.com/photo-1523275335684-37898b6baf30",
      flipkartInStock: false,
      flipkartDeliveryDate: "Out of stock",
    },
  ],
  isLoading = false,
  onSortChange = () => {},
  onFilterChange = () => {},
  onProductSelect = () => {},
}: ResultsGridProps) => {
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null);
  const [sortOption, setSortOption] = useState("price-low-to-high");
  const [viewMode, setViewMode] = useState("grid");

  const handleSortChange = (value: string) => {
    setSortOption(value);
    onSortChange(value);
  };

  const handleProductSelect = (productId: string) => {
    setSelectedProduct(productId);
    onProductSelect(productId);
  };

  // Find the selected product for the price history chart
  const selectedProductData = selectedProduct
    ? products.find((product) => product.id === selectedProduct)
    : products[0];

  // Generate mock price history data for the selected product
  const generatePriceHistoryData = (product: Product) => {
    const today = new Date();
    const data = [];

    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setMonth(today.getMonth() - i);

      // Generate some random price fluctuations
      const amazonVariation = Math.floor(Math.random() * 200) - 100;
      const flipkartVariation = Math.floor(Math.random() * 200) - 100;

      data.push({
        date: date.toISOString().split("T")[0],
        amazon: Math.max(
          product.amazonPrice + amazonVariation,
          product.amazonPrice * 0.8,
        ),
        flipkart: Math.max(
          product.flipkartPrice + flipkartVariation,
          product.flipkartPrice * 0.8,
        ),
      });
    }

    // Ensure the last data point matches the current prices
    data[data.length - 1] = {
      date: today.toISOString().split("T")[0],
      amazon: product.amazonPrice,
      flipkart: product.flipkartPrice,
    };

    return data;
  };

  return (
    <div className="w-full max-w-[1200px] mx-auto bg-white p-4 rounded-lg shadow-sm">
      {/* Controls Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <div className="flex items-center gap-2">
          <h2 className="text-xl font-semibold">Results</h2>
          <span className="text-gray-500 text-sm">
            {products.length} products found
          </span>
        </div>

        <div className="flex flex-wrap gap-2">
          <Button
            variant="outline"
            size="sm"
            className="flex items-center gap-1"
          >
            <Filter className="h-4 w-4" />
            Filters
          </Button>

          <Select value={sortOption} onValueChange={handleSortChange}>
            <SelectTrigger className="w-[180px] h-9">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="price-low-to-high">
                Price: Low to High
              </SelectItem>
              <SelectItem value="price-high-to-low">
                Price: High to Low
              </SelectItem>
              <SelectItem value="discount">Highest Discount</SelectItem>
              <SelectItem value="rating">Highest Rating</SelectItem>
            </SelectContent>
          </Select>

          <Tabs
            value={viewMode}
            onValueChange={setViewMode}
            className="hidden sm:flex"
          >
            <TabsList className="h-9">
              <TabsTrigger value="grid" className="px-3">
                Grid
              </TabsTrigger>
              <TabsTrigger value="list" className="px-3">
                List
              </TabsTrigger>
            </TabsList>
          </Tabs>

          <Button variant="ghost" size="icon" className="h-9 w-9">
            <RefreshCw className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Active Filters (placeholder) */}
      <div className="flex flex-wrap gap-2 mb-6">
        <div className="bg-gray-100 text-gray-700 text-sm px-3 py-1 rounded-full flex items-center gap-1">
          Price: ₹1000 - ₹15000
          <Button variant="ghost" size="icon" className="h-5 w-5 ml-1">
            <span className="sr-only">Remove filter</span>×
          </Button>
        </div>
        <div className="bg-gray-100 text-gray-700 text-sm px-3 py-1 rounded-full flex items-center gap-1">
          Rating: 4★ & above
          <Button variant="ghost" size="icon" className="h-5 w-5 ml-1">
            <span className="sr-only">Remove filter</span>×
          </Button>
        </div>
        <Button variant="link" size="sm" className="text-sm h-7 px-2">
          Clear all filters
        </Button>
      </div>

      {/* Loading State */}
      {isLoading && (
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      )}

      {/* Results Grid */}
      {!isLoading && (
        <div className="mb-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {products.map((product) => (
              <div key={`amazon-${product.id}`} className="flex flex-col gap-6">
                <ProductCard
                  platform="Amazon"
                  productName={product.name}
                  price={product.amazonPrice}
                  originalPrice={product.amazonOriginalPrice}
                  discount={product.amazonDiscount}
                  rating={product.amazonRating}
                  reviewCount={product.amazonReviewCount}
                  imageUrl={product.amazonImageUrl}
                  inStock={product.amazonInStock}
                  deliveryDate={product.amazonDeliveryDate}
                  onViewDetails={() => handleProductSelect(product.id)}
                />

                <ProductCard
                  platform="Flipkart"
                  productName={product.name}
                  price={product.flipkartPrice}
                  originalPrice={product.flipkartOriginalPrice}
                  discount={product.flipkartDiscount}
                  rating={product.flipkartRating}
                  reviewCount={product.flipkartReviewCount}
                  imageUrl={product.flipkartImageUrl}
                  inStock={product.flipkartInStock}
                  deliveryDate={product.flipkartDeliveryDate}
                  onViewDetails={() => handleProductSelect(product.id)}
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Price History Chart */}
      {selectedProductData && (
        <div className="mt-8 border-t pt-6">
          <PriceHistoryChart
            data={generatePriceHistoryData(selectedProductData)}
            productName={selectedProductData.name}
            timeRange="6M"
          />
        </div>
      )}

      {/* Pagination */}
      <div className="mt-8 flex justify-center">
        <Pagination>
          <Button variant="outline" size="sm" className="h-9 w-9 p-0">
            <span className="sr-only">Go to first page</span>
            <span aria-hidden="true">«</span>
          </Button>
          <Button variant="outline" size="sm" className="h-9 w-9 p-0">
            <span className="sr-only">Go to previous page</span>
            <span aria-hidden="true">‹</span>
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="h-9 w-9 p-0 bg-primary text-primary-foreground"
          >
            <span>1</span>
          </Button>
          <Button variant="outline" size="sm" className="h-9 w-9 p-0">
            <span>2</span>
          </Button>
          <Button variant="outline" size="sm" className="h-9 w-9 p-0">
            <span>3</span>
          </Button>
          <Button variant="outline" size="sm" className="h-9 w-9 p-0">
            <span className="sr-only">Go to next page</span>
            <span aria-hidden="true">›</span>
          </Button>
          <Button variant="outline" size="sm" className="h-9 w-9 p-0">
            <span className="sr-only">Go to last page</span>
            <span aria-hidden="true">»</span>
          </Button>
        </Pagination>
      </div>
    </div>
  );
};

export default ResultsGrid;
