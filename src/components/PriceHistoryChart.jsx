import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { Button } from "../components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../components/ui/tooltip";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Calendar, Info } from "lucide-react";

const PriceHistoryChart = ({
  data = [
    { date: "2023-01-01", amazon: 499, flipkart: 525 },
    { date: "2023-02-01", amazon: 489, flipkart: 510 },
    { date: "2023-03-01", amazon: 499, flipkart: 499 },
    { date: "2023-04-01", amazon: 479, flipkart: 489 },
    { date: "2023-05-01", amazon: 459, flipkart: 479 },
    { date: "2023-06-01", amazon: 449, flipkart: 459 },
    { date: "2023-07-01", amazon: 469, flipkart: 449 },
  ],
  productName = "Wireless Earbuds",
  timeRange = "6M",
  onTimeRangeChange = () => {},
}) => {
  const [selectedTimeRange, setSelectedTimeRange] = useState(timeRange);
  const [chartView, setChartView] = useState("line");

  const handleTimeRangeChange = (range) => {
    setSelectedTimeRange(range);
    onTimeRangeChange(range);
  };

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return `${date.getDate()}/${date.getMonth() + 1}`;
  };

  return (
    <Card className="w-full h-full bg-white shadow-md">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-xl font-semibold">
            {productName} - Price History
          </CardTitle>
          <div className="flex items-center space-x-2">
            <Select
              value={selectedTimeRange}
              onValueChange={handleTimeRangeChange}
            >
              <SelectTrigger className="w-[100px]">
                <SelectValue placeholder="Time Range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1M">1 Month</SelectItem>
                <SelectItem value="3M">3 Months</SelectItem>
                <SelectItem value="6M">6 Months</SelectItem>
                <SelectItem value="1Y">1 Year</SelectItem>
                <SelectItem value="ALL">All Time</SelectItem>
              </SelectContent>
            </Select>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="outline" size="icon">
                    <Calendar className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Select custom date range</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="outline" size="icon">
                    <Info className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Price history information is updated daily</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="line" onValueChange={setChartView}>
          <TabsList className="mb-4">
            <TabsTrigger value="line">Line Chart</TabsTrigger>
            <TabsTrigger value="comparison">Comparison</TabsTrigger>
          </TabsList>
          <TabsContent value="line" className="h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={data}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                <XAxis dataKey="date" tickFormatter={formatDate} />
                <YAxis />
                <RechartsTooltip
                  formatter={(value) => [`₹${value}`, ""]}
                  labelFormatter={(label) => formatDate(label)}
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="amazon"
                  stroke="#FF9900"
                  strokeWidth={2}
                  activeDot={{ r: 8 }}
                  name="Amazon"
                />
                <Line
                  type="monotone"
                  dataKey="flipkart"
                  stroke="#2874F0"
                  strokeWidth={2}
                  activeDot={{ r: 8 }}
                  name="Flipkart"
                />
              </LineChart>
            </ResponsiveContainer>
          </TabsContent>
          <TabsContent value="comparison" className="h-[250px]">
            <div className="flex flex-col h-full justify-center items-center">
              <div className="text-center mb-4">
                <h3 className="text-lg font-medium">Price Comparison</h3>
                <p className="text-sm text-gray-500">
                  Current lowest price:{" "}
                  <span className="font-bold text-green-600">
                    ₹
                    {Math.min(
                      ...data.map((d) => Math.min(d.amazon, d.flipkart)),
                    )}
                  </span>
                </p>
              </div>
              <div className="grid grid-cols-2 gap-8 w-full max-w-2xl">
                <div className="flex flex-col items-center p-4 border rounded-lg">
                  <div className="text-amber-500 font-bold text-xl mb-2">
                    Amazon
                  </div>
                  <div className="text-2xl font-bold">
                    ₹{data[data.length - 1].amazon}
                  </div>
                  <div className="text-sm text-gray-500 mt-2">
                    {data[data.length - 1].amazon <=
                    data[data.length - 1].flipkart ? (
                      <span className="text-green-600">Lowest Price</span>
                    ) : (
                      <span className="text-red-500">
                        ₹
                        {data[data.length - 1].amazon -
                          data[data.length - 1].flipkart}{" "}
                        more expensive
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex flex-col items-center p-4 border rounded-lg">
                  <div className="text-blue-600 font-bold text-xl mb-2">
                    Flipkart
                  </div>
                  <div className="text-2xl font-bold">
                    ₹{data[data.length - 1].flipkart}
                  </div>
                  <div className="text-sm text-gray-500 mt-2">
                    {data[data.length - 1].flipkart <=
                    data[data.length - 1].amazon ? (
                      <span className="text-green-600">Lowest Price</span>
                    ) : (
                      <span className="text-red-500">
                        ₹
                        {data[data.length - 1].flipkart -
                          data[data.length - 1].amazon}{" "}
                        more expensive
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default PriceHistoryChart;
