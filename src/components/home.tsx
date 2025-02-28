import React, { useState } from "react";
import Header from "./Header";
import SearchComponent from "./SearchComponent";
import ResultsGrid from "./ResultsGrid";
import ProductDetailModal from "./ProductDetailModal";
import AlertSettingsForm from "./AlertSettingsForm";

const Home = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedProductId, setSelectedProductId] = useState<string | null>(
    null,
  );
  const [showProductModal, setShowProductModal] = useState(false);
  const [showAlertForm, setShowAlertForm] = useState(false);

  // Mock products data
  const products = [
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
      description:
        "Premium wireless headphones with active noise cancellation, 30-hour battery life, and comfortable over-ear design.",
      specifications: [
        { name: "Brand", value: "SoundMax" },
        { name: "Model", value: "WH-500" },
        { name: "Color", value: "Black" },
        { name: "Connectivity", value: "Bluetooth 5.0" },
        { name: "Battery Life", value: "Up to 30 hours" },
        { name: "Weight", value: "250g" },
      ],
      features: [
        "Active noise cancellation",
        "30-hour battery life",
        "Quick charge (10 min for 5 hours)",
        "Voice assistant support",
        "Touch controls",
      ],
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
      description:
        "Feature-packed smartphone with 128GB storage, 8GB RAM, quad camera setup, and all-day battery life.",
      specifications: [
        { name: "Brand", value: "TechPro" },
        { name: "Model", value: "X5" },
        { name: "Storage", value: "128GB" },
        { name: "RAM", value: "8GB" },
        { name: "Display", value: "6.5-inch AMOLED" },
        { name: "Battery", value: "5000mAh" },
      ],
      features: [
        "Quad camera setup",
        "Fast charging",
        "AMOLED display",
        "Fingerprint sensor",
        "5G connectivity",
      ],
    },
  ];

  const handleSearch = (query: string, categories: string[]) => {
    setSearchQuery(query);
    setSelectedCategories(categories);
    // In a real app, this would trigger an API call to fetch results
  };

  const handleProductSelect = (productId: string) => {
    setSelectedProductId(productId);
    setShowProductModal(true);
  };

  const handleSetPriceAlert = () => {
    setShowProductModal(false);
    setShowAlertForm(true);
  };

  const handleSaveAlert = (settings: any) => {
    // In a real app, this would save the alert settings to the backend
    console.log("Alert settings saved:", settings);
    setShowAlertForm(false);
  };

  const selectedProduct = selectedProductId
    ? products.find((product) => product.id === selectedProductId)
    : products[0];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="container mx-auto py-6 px-4 space-y-6">
        <SearchComponent onSearch={handleSearch} />

        {/* Show results only if there's a search query or on initial load */}
        <ResultsGrid
          products={products}
          onProductSelect={handleProductSelect}
        />
      </main>

      {/* Product Detail Modal */}
      {selectedProduct && (
        <ProductDetailModal
          open={showProductModal}
          onOpenChange={setShowProductModal}
          product={{
            id: selectedProduct.id,
            name: selectedProduct.name,
            description: selectedProduct.description,
            imageUrl: selectedProduct.amazonImageUrl,
            amazonPrice: selectedProduct.amazonPrice,
            flipkartPrice: selectedProduct.flipkartPrice,
            amazonOriginalPrice: selectedProduct.amazonOriginalPrice,
            flipkartOriginalPrice: selectedProduct.flipkartOriginalPrice,
            amazonRating: selectedProduct.amazonRating,
            flipkartRating: selectedProduct.flipkartRating,
            amazonReviewCount: selectedProduct.amazonReviewCount,
            flipkartReviewCount: selectedProduct.flipkartReviewCount,
            amazonInStock: selectedProduct.amazonInStock,
            flipkartInStock: selectedProduct.flipkartInStock,
            amazonDeliveryDate: selectedProduct.amazonDeliveryDate,
            flipkartDeliveryDate: selectedProduct.flipkartDeliveryDate,
            specifications: selectedProduct.specifications,
            features: selectedProduct.features,
          }}
          onSetPriceAlert={handleSetPriceAlert}
        />
      )}

      {/* Alert Settings Form */}
      {selectedProduct && (
        <Dialog open={showAlertForm} onOpenChange={setShowAlertForm}>
          <DialogContent className="sm:max-w-[500px] p-0">
            <AlertSettingsForm
              productName={selectedProduct.name}
              currentPrice={Math.min(
                selectedProduct.amazonPrice,
                selectedProduct.flipkartPrice,
              )}
              onSave={handleSaveAlert}
              onCancel={() => setShowAlertForm(false)}
            />
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default Home;

// Dialog component for the AlertSettingsForm
const Dialog = ({
  children,
  open = false,
  onOpenChange = () => {},
}: {
  children: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}) => {
  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-black/50 ${open ? "" : "hidden"}`}
      onClick={() => onOpenChange(false)}
    >
      <div onClick={(e) => e.stopPropagation()}>{children}</div>
    </div>
  );
};

const DialogContent = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return <div className={`bg-white rounded-lg ${className}`}>{children}</div>;
};
