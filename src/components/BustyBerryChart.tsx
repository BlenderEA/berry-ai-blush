
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { 
  ChartContainer, 
  ChartTooltip, 
  ChartTooltipContent,
} from '@/components/ui/chart';
import { 
  Line, 
  LineChart, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer,
  CartesianGrid
} from 'recharts';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ChartLine } from 'lucide-react';

// Sample data - in a real app, this would come from an API
const generateSampleData = (days: number, startPrice: number, volatility: number) => {
  const data = [];
  let currentPrice = startPrice;

  for (let i = days; i >= 0; i--) {
    // Create a date object for each day
    const date = new Date();
    date.setDate(date.getDate() - i);
    
    // Random price movement with trend
    const changePercent = (Math.random() - 0.3) * volatility; // Slight upward bias
    currentPrice = currentPrice * (1 + changePercent);
    
    data.push({
      date: date.toISOString().split('T')[0],
      price: currentPrice,
      volume: Math.floor(Math.random() * 1000000) + 500000,
    });
  }
  
  return data;
};

const timeframes = [
  { id: '24h', label: '24H', days: 1, volatility: 0.03 },
  { id: '7d', label: '7D', days: 7, volatility: 0.05 },
  { id: '30d', label: '30D', days: 30, volatility: 0.08 },
  { id: 'all', label: 'ALL', days: 90, volatility: 0.12 }
];

const formatPrice = (value: number) => {
  return `$${value.toFixed(6)}`;
};

const formatDate = (dateStr: string) => {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
};

const BustyBerryChart = () => {
  const [activeTimeframe, setActiveTimeframe] = React.useState('7d');
  const currentTimeframe = timeframes.find(t => t.id === activeTimeframe) || timeframes[1];
  
  // Generate sample data for the selected timeframe
  const chartData = React.useMemo(() => {
    return generateSampleData(
      currentTimeframe.days,
      0.000072, // Starting price
      currentTimeframe.volatility
    );
  }, [currentTimeframe.days, currentTimeframe.volatility]);
  
  // Calculate price change
  const priceChange = React.useMemo(() => {
    if (chartData.length < 2) return { value: 0, percentage: 0 };
    
    const firstPrice = chartData[0].price;
    const lastPrice = chartData[chartData.length - 1].price;
    const change = lastPrice - firstPrice;
    const percentage = (change / firstPrice) * 100;
    
    return { value: change, percentage };
  }, [chartData]);
  
  const currentPrice = chartData.length ? chartData[chartData.length - 1].price : 0;

  return (
    <Card className="glass-card border-dark-border">
      <CardHeader>
        <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <CardTitle className="text-xl sm:text-2xl flex items-center gap-2">
              <ChartLine className="h-5 w-5 text-berry" />
              $BUSTYBERRY Price Chart
            </CardTitle>
            <CardDescription>
              Current Price: <span className="font-bold">${currentPrice.toFixed(8)}</span>
              <span className={`ml-2 ${priceChange.percentage >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                {priceChange.percentage >= 0 ? '↑' : '↓'} {Math.abs(priceChange.percentage).toFixed(2)}%
              </span>
            </CardDescription>
          </div>
          <Tabs defaultValue={activeTimeframe} value={activeTimeframe} onValueChange={setActiveTimeframe}>
            <TabsList className="grid grid-cols-4 w-full sm:w-auto">
              {timeframes.map((timeframe) => (
                <TabsTrigger 
                  key={timeframe.id} 
                  value={timeframe.id}
                  className={activeTimeframe === timeframe.id ? 'bg-berry text-white' : ''}
                >
                  {timeframe.label}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-[350px] w-full mt-4">
          <ChartContainer
            config={{
              price: {
                label: "Price",
                theme: {
                  light: "#f43f5e",
                  dark: "#ff6b98", 
                }
              }
            }}
          >
            <LineChart data={chartData} margin={{ top: 5, right: 5, left: 5, bottom: 25 }}>
              <defs>
                <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.2}/>
                  <stop offset="95%" stopColor="#f43f5e" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <XAxis 
                dataKey="date" 
                tickFormatter={formatDate}
                tickMargin={10}
                minTickGap={30}
              />
              <YAxis 
                domain={['dataMin', 'dataMax']}
                tickFormatter={formatPrice}
                width={80}
              />
              <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
              <Tooltip 
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="bg-dark-lighter border border-dark-border rounded-md p-3 shadow-md">
                        <p className="text-gray-300">{formatDate(payload[0].payload.date)}</p>
                        <p className="font-bold text-white">Price: ${typeof payload[0].value === 'number' ? payload[0].value.toFixed(8) : payload[0].value}</p>
                        <p className="text-sm text-gray-300">Volume: ${payload[0].payload.volume.toLocaleString()}</p>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Line 
                type="monotone" 
                dataKey="price" 
                stroke="#f43f5e" 
                strokeWidth={2} 
                dot={false}
                activeDot={{ r: 4 }}
                fill="url(#colorPrice)"
              />
            </LineChart>
          </ChartContainer>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-4 text-center">
          <div className="p-3 bg-dark-lighter rounded-lg">
            <p className="text-sm text-gray-300">24h Volume</p>
            <p className="font-bold">$734,281</p>
          </div>
          <div className="p-3 bg-dark-lighter rounded-lg">
            <p className="text-sm text-gray-300">Market Cap</p>
            <p className="font-bold">$72,000</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BustyBerryChart;
