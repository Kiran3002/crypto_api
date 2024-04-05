'use client'
import React, { useState, useEffect } from 'react';
import { CardTitle, CardDescription, CardHeader, CardContent, Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { TableHead, TableRow, TableHeader, TableCell, TableBody, Table } from "@/components/ui/table";

export default function Component() {
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('https://api4.binance.com/api/v3/ticker/24hr');
      const jsonData = await response.json();
      setData(jsonData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const filteredData = data.filter(item => {
    // Case-insensitive search by symbol
    return item.symbol.toLowerCase().includes(searchQuery.toLowerCase());
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Crypto Coins</CardTitle>
        <CardDescription>Change In last 24 Hours</CardDescription>
      </CardHeader>
      <CardContent className="p-0">
        <div className="relative w-full max-w-lg mx-auto grid gap-1.5">
          <SearchIcon className="absolute inset-y-0 left-0 z-10 w-4 h-4 my-2 ml-2 text-gray-400 top-1/2 dark:text-gray-500" />
          <Input
            className="pl-8 w-full rounded-lg"
            placeholder="Search"
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Crypto name</TableHead>
              <TableHead className="w-[100px]">PriceChange</TableHead>
              <TableHead className="w-[100px]">Volume</TableHead>
              <TableHead className="w-[100px]">AvgPriceChange</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredData.map((item, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium text-lg">{item.symbol}</TableCell>
                <TableCell className="text-sm">{item.priceChange}</TableCell>
                <TableCell>{item.volume}</TableCell>
                <TableCell>{item.weightedAvgPrice}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

function SearchIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}
