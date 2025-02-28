import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Slider } from "./ui/slider";
import { Switch } from "./ui/switch";
import { Button } from "./ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Bell, Mail, Smartphone, Info } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";

const AlertSettingsForm = ({
  productName = "Wireless Bluetooth Headphones",
  currentPrice = 1299,
  onSave = () => {},
  onCancel = () => {},
  isOpen = true,
}) => {
  const [settings, setSettings] = useState({
    priceThreshold: Math.floor(currentPrice * 0.9),
    notificationType: "email",
    email: "",
    phone: "",
    enableNotifications: true,
    frequency: "instant",
  });

  const [sliderValue, setSliderValue] = useState([
    Math.floor(currentPrice * 0.9),
  ]);

  const handleSliderChange = (value) => {
    setSliderValue(value);
    setSettings({
      ...settings,
      priceThreshold: value[0],
    });
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSettings({
      ...settings,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSelectChange = (name, value) => {
    setSettings({
      ...settings,
      [name]: value,
    });
  };

  const handleSave = () => {
    onSave(settings);
  };

  const discountPercentage = Math.round(
    ((currentPrice - sliderValue[0]) / currentPrice) * 100,
  );

  return (
    <Card className="w-full max-w-[500px] bg-white shadow-lg">
      <CardHeader>
        <CardTitle className="text-xl font-semibold flex items-center justify-between">
          <span>Price Alert Settings</span>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Info className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Get notified when the price drops below your threshold</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </CardTitle>
        <p className="text-sm text-gray-500">{productName}</p>
        <div className="flex items-center justify-between mt-2">
          <span className="text-sm font-medium">Current Price:</span>
          <span className="font-semibold">
            ₹{currentPrice.toLocaleString()}
          </span>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="price-threshold">Price Threshold</Label>
            <div className="flex items-center gap-2">
              <span className="text-lg font-bold">
                ₹{sliderValue[0].toLocaleString()}
              </span>
              <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                {discountPercentage}% off
              </Badge>
            </div>
          </div>
          <Slider
            id="price-threshold"
            min={Math.floor(currentPrice * 0.5)}
            max={currentPrice}
            step={10}
            value={sliderValue}
            onValueChange={handleSliderChange}
            className="py-4"
          />
          <div className="flex justify-between text-xs text-gray-500">
            <span>₹{Math.floor(currentPrice * 0.5).toLocaleString()}</span>
            <span>₹{currentPrice.toLocaleString()}</span>
          </div>
        </div>

        <div className="space-y-4 pt-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="enable-notifications">Enable Notifications</Label>
            <Switch
              id="enable-notifications"
              name="enableNotifications"
              checked={settings.enableNotifications}
              onCheckedChange={(checked) =>
                setSettings({ ...settings, enableNotifications: checked })
              }
            />
          </div>

          <Tabs defaultValue="email" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="email" className="flex items-center gap-1">
                <Mail className="h-4 w-4" />
                Email
              </TabsTrigger>
              <TabsTrigger value="sms" className="flex items-center gap-1">
                <Smartphone className="h-4 w-4" />
                SMS
              </TabsTrigger>
              <TabsTrigger value="both" className="flex items-center gap-1">
                <Bell className="h-4 w-4" />
                Both
              </TabsTrigger>
            </TabsList>

            <TabsContent value="email" className="space-y-4 pt-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="your@email.com"
                  value={settings.email}
                  onChange={handleInputChange}
                />
              </div>
            </TabsContent>

            <TabsContent value="sms" className="space-y-4 pt-4">
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  placeholder="+91 9876543210"
                  value={settings.phone}
                  onChange={handleInputChange}
                />
              </div>
            </TabsContent>

            <TabsContent value="both" className="space-y-4 pt-4">
              <div className="space-y-2">
                <Label htmlFor="email-both">Email Address</Label>
                <Input
                  id="email-both"
                  name="email"
                  type="email"
                  placeholder="your@email.com"
                  value={settings.email}
                  onChange={handleInputChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone-both">Phone Number</Label>
                <Input
                  id="phone-both"
                  name="phone"
                  type="tel"
                  placeholder="+91 9876543210"
                  value={settings.phone}
                  onChange={handleInputChange}
                />
              </div>
            </TabsContent>
          </Tabs>

          <div className="space-y-2">
            <Label htmlFor="frequency">Notification Frequency</Label>
            <Select
              value={settings.frequency}
              onValueChange={(value) => handleSelectChange("frequency", value)}
            >
              <SelectTrigger id="frequency">
                <SelectValue placeholder="Select frequency" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="instant">Instant</SelectItem>
                <SelectItem value="daily">Daily Summary</SelectItem>
                <SelectItem value="weekly">Weekly Summary</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardContent>

      <CardFooter className="flex justify-end gap-2 pt-2">
        <Button variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button onClick={handleSave}>Save Alert</Button>
      </CardFooter>
    </Card>
  );
};

const Badge = ({ children, className = "" }) => {
  return (
    <span className={`px-2 py-1 rounded-full text-xs font-medium ${className}`}>
      {children}
    </span>
  );
};

export default AlertSettingsForm;
