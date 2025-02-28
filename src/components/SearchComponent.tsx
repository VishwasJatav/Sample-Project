import React, { useState } from "react";
import {
  Search,
  Filter,
  X,
  Smartphone,
  Laptop,
  Headphones,
  Camera,
  Watch,
} from "lucide-react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Card, CardContent } from "./ui/card";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "./ui/command";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";

interface SearchComponentProps {
  onSearch?: (query: string, categories: string[]) => void;
  recentSearches?: string[];
  popularProducts?: {
    id: string;
    name: string;
    category: string;
  }[];
}

const SearchComponent = ({
  onSearch = () => {},
  recentSearches = [
    "wireless earbuds",
    "smartphone under 15000",
    "gaming laptop",
    "dslr camera",
    "smartwatch",
  ],
  popularProducts = [
    { id: "1", name: "boAt Airdopes 141", category: "Audio" },
    { id: "2", name: "Samsung Galaxy M34", category: "Smartphones" },
    { id: "3", name: "HP Pavilion 15", category: "Laptops" },
    { id: "4", name: "Canon EOS 1500D", category: "Cameras" },
    { id: "5", name: "Apple Watch SE", category: "Wearables" },
  ],
}: SearchComponentProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const categories = [
    { name: "Smartphones", icon: <Smartphone className="h-4 w-4" /> },
    { name: "Laptops", icon: <Laptop className="h-4 w-4" /> },
    { name: "Audio", icon: <Headphones className="h-4 w-4" /> },
    { name: "Cameras", icon: <Camera className="h-4 w-4" /> },
    { name: "Wearables", icon: <Watch className="h-4 w-4" /> },
  ];

  const handleSearch = () => {
    if (searchQuery.trim()) {
      onSearch(searchQuery, selectedCategories);
      setShowSuggestions(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const toggleCategory = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category],
    );
  };

  const handleSelectSuggestion = (suggestion: string) => {
    setSearchQuery(suggestion);
    setShowSuggestions(false);
    onSearch(suggestion, selectedCategories);
  };

  const handleSelectProduct = (product: { name: string; category: string }) => {
    setSearchQuery(product.name);
    if (!selectedCategories.includes(product.category)) {
      setSelectedCategories([...selectedCategories, product.category]);
    }
    setShowSuggestions(false);
    onSearch(product.name, [...selectedCategories, product.category]);
  };

  return (
    <div className="w-full max-w-[1200px] mx-auto bg-white p-6 rounded-lg shadow-md">
      <div className="flex flex-col gap-4">
        {/* Search Bar */}
        <div className="relative">
          <div className="flex">
            <div className="relative flex-grow">
              <Input
                type="text"
                placeholder="Search for products..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setShowSuggestions(e.target.value.length > 0);
                }}
                onKeyDown={handleKeyDown}
                onFocus={() => setShowSuggestions(searchQuery.length > 0)}
                className="pl-10 pr-4 py-2 h-12 rounded-l-md border-r-0 focus-visible:ring-2 focus-visible:ring-offset-0"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              {searchQuery && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => {
                    setSearchQuery("");
                    setShowSuggestions(false);
                  }}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8 w-8 text-gray-400 hover:text-gray-600"
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>
            <Button
              onClick={handleSearch}
              className="h-12 px-6 rounded-l-none bg-blue-600 hover:bg-blue-700"
            >
              Search
            </Button>
          </div>

          {/* Autocomplete Suggestions */}
          {showSuggestions && (
            <Card className="absolute z-10 w-full mt-1 border shadow-lg">
              <CardContent className="p-0">
                <Command>
                  <CommandList>
                    {searchQuery.length > 0 && (
                      <CommandEmpty>No results found.</CommandEmpty>
                    )}
                    {recentSearches.length > 0 && (
                      <CommandGroup heading="Recent Searches">
                        {recentSearches
                          .filter((search) =>
                            search
                              .toLowerCase()
                              .includes(searchQuery.toLowerCase()),
                          )
                          .slice(0, 5)
                          .map((search, index) => (
                            <CommandItem
                              key={index}
                              onSelect={() => handleSelectSuggestion(search)}
                              className="flex items-center cursor-pointer"
                            >
                              <Search className="mr-2 h-4 w-4 text-gray-400" />
                              {search}
                            </CommandItem>
                          ))}
                      </CommandGroup>
                    )}
                    {popularProducts.length > 0 && (
                      <CommandGroup heading="Popular Products">
                        {popularProducts
                          .filter((product) =>
                            product.name
                              .toLowerCase()
                              .includes(searchQuery.toLowerCase()),
                          )
                          .slice(0, 5)
                          .map((product) => (
                            <CommandItem
                              key={product.id}
                              onSelect={() => handleSelectProduct(product)}
                              className="flex items-center justify-between cursor-pointer"
                            >
                              <span>{product.name}</span>
                              <Badge variant="outline">
                                {product.category}
                              </Badge>
                            </CommandItem>
                          ))}
                      </CommandGroup>
                    )}
                  </CommandList>
                </Command>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-sm font-medium text-gray-700 flex items-center">
            <Filter className="h-4 w-4 mr-1" /> Filters:
          </span>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <TooltipProvider key={category.name}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant={
                        selectedCategories.includes(category.name)
                          ? "default"
                          : "outline"
                      }
                      size="sm"
                      onClick={() => toggleCategory(category.name)}
                      className={`flex items-center gap-1 ${selectedCategories.includes(category.name) ? "bg-blue-600 text-white" : ""}`}
                    >
                      {category.icon}
                      <span>{category.name}</span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Filter by {category.name}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            ))}
          </div>

          {selectedCategories.length > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSelectedCategories([])}
              className="text-red-500 hover:text-red-700 hover:bg-red-50"
            >
              Clear filters
            </Button>
          )}

          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" size="sm" className="ml-auto">
                Advanced Filters
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80">
              <div className="grid gap-4">
                <div className="space-y-2">
                  <h4 className="font-medium leading-none">Price Range</h4>
                  <div className="flex items-center gap-2">
                    <Input type="number" placeholder="Min" className="h-8" />
                    <span>to</span>
                    <Input type="number" placeholder="Max" className="h-8" />
                  </div>
                </div>
                <div className="space-y-2">
                  <h4 className="font-medium leading-none">Ratings</h4>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" className="h-8">
                      4★ & above
                    </Button>
                    <Button variant="outline" size="sm" className="h-8">
                      3★ & above
                    </Button>
                  </div>
                </div>
                <div className="flex justify-end">
                  <Button size="sm">Apply Filters</Button>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </div>
  );
};

export default SearchComponent;
