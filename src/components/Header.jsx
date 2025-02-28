import React from "react";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "./ui/navigation-menu";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
  Bell,
  HelpCircle,
  Menu,
  Search,
  Settings,
  ShoppingCart,
  User,
} from "lucide-react";

const Header = ({
  userName = "John Doe",
  userAvatar = "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
  notificationCount = 3,
  onSearchClick = () => {},
  onProfileClick = () => {},
  onNotificationsClick = () => {},
  onHelpClick = () => {},
  onSettingsClick = () => {},
}) => {
  return (
    <header className="w-full h-20 bg-white border-b border-gray-200 shadow-sm sticky top-0 z-50">
      <div className="container mx-auto h-full flex items-center justify-between px-4">
        {/* Logo and Navigation */}
        <div className="flex items-center gap-8">
          <div className="flex items-center">
            <ShoppingCart className="h-6 w-6 text-blue-600 mr-2" />
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              PriceCompare
            </span>
          </div>

          {/* Desktop Navigation */}
          <NavigationMenu className="hidden md:flex">
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuLink
                  className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                  href="/"
                >
                  Home
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuTrigger className="text-gray-700 hover:text-gray-900">
                  Categories
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                    {[
                      { name: "Electronics", href: "/category/electronics" },
                      { name: "Clothing", href: "/category/clothing" },
                      {
                        name: "Home & Kitchen",
                        href: "/category/home-kitchen",
                      },
                      { name: "Books", href: "/category/books" },
                      { name: "Beauty", href: "/category/beauty" },
                      { name: "Toys & Games", href: "/category/toys-games" },
                      { name: "Sports", href: "/category/sports" },
                      { name: "Grocery", href: "/category/grocery" },
                    ].map((category) => (
                      <NavigationMenuLink
                        key={category.name}
                        href={category.href}
                        className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-gray-100 hover:text-gray-900"
                      >
                        <div className="text-sm font-medium leading-none">
                          {category.name}
                        </div>
                      </NavigationMenuLink>
                    ))}
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink
                  className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                  href="/deals"
                >
                  Deals
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink
                  className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                  href="/saved"
                >
                  Saved Items
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="text-gray-700 hover:text-gray-900"
            onClick={onSearchClick}
          >
            <Search className="h-5 w-5" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="text-gray-700 hover:text-gray-900 relative"
            onClick={onNotificationsClick}
          >
            <Bell className="h-5 w-5" />
            {notificationCount > 0 && (
              <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white">
                {notificationCount}
              </span>
            )}
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="text-gray-700 hover:text-gray-900"
            onClick={onHelpClick}
          >
            <HelpCircle className="h-5 w-5" />
          </Button>

          {/* User Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="rounded-full h-9 w-9 p-0">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={userAvatar} alt={userName} />
                  <AvatarFallback>
                    {userName
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">{userName}</p>
                  <p className="text-xs leading-none text-gray-500">
                    user@example.com
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={onProfileClick}>
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={onSettingsClick}>
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Log out</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden text-gray-700 hover:text-gray-900"
          >
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
