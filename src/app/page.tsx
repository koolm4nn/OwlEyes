"use client";

import { useBalances } from '@/hooks/useBalance';
import { BalanceWithMetaData } from '@/types';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import {LineChart} from '@mui/x-charts/LineChart';
import { group } from 'console';
//import { Console } from 'console';
import Image from "next/image";
import { useState } from 'react';

interface ChartEntity {
  date: string[],
  data: (number)[],
  currency: string,
  title: string
};

type BankAccountSeries = {
  key: string;           // e.g. "bnz", "apo"
  label: string;         // e.g. "BNZ", "ApoBank"
  currency: string;      // e.g. "NZD", "EUR"
  data: { date: string; value: number }[]; // use ISO strings
};


function groupBalances(balances: BalanceWithMetaData[]){
  // Get unique dates. To be comparable, balances need to be mapped to these dates
  const dates =  Array.from(
    new Set(balances.map(balance => new Date(balance.timestamp * 1000).toISOString().slice(0, 10)))
  ).sort();

  // Group by account
  const accountsMap: Record<string, {label: string, values: (number | null)[] }> = {};

  balances.forEach(balance => {
    const date = new Date(balance.timestamp * 1000).toISOString().slice(0, 10);
    if(!accountsMap[balance.accountId]) {
      accountsMap[balance.accountId] = {
        label: balance.accountName,
        values: Array(dates.length).fill(null)
      }
    }

    const idx = dates.indexOf(date);
    accountsMap[balance.accountId].values[idx] = balance.amount;
  });

  // Convert to MUI format for series
  const series = Object.entries(accountsMap).map(([id, acc]) => ({
    id, 
    label: acc.label,
    data: acc.values,
    connectNulls: true
  }));

  return { dates, series };
}

const Chart = ({ data } : {data: BalanceWithMetaData[]}) => {
  const { dates, series } = groupBalances(data);

    return (
      <div className='bg-cyan-500 w-full'>
        <LineChart
          xAxis={[{ data: dates, scaleType: 'point' }]}
          series={series}
          height={400}
        />
      </div>
    )
}

export default function Home() {
  const {data: balances = [], isLoading, error } = useBalances();

  // Filters
  const [selectedYear, setSelectedYear] = useState<number | "all">("all");
  const [selectedMonth, setSelectedMonth] = useState<number | "all">("all");
  const [selectedAccount, setSelectedAccount] = useState<number | "all">("all");


  if(isLoading) return (<p>Loading</p>);
  if(error) return (<p>Error loading.</p>);

  const filteredBalances = balances.filter(b => {
  const date = new Date(b.timestamp * 1000);
  return (selectedYear === "all" || date.getFullYear() === selectedYear) &&
         (selectedMonth === "all" || date.getMonth() === selectedMonth) &&
         (selectedAccount === "all" || b.accountId === selectedAccount);
  });

  const years = Array.from(
    new Set(balances.map(b => new Date(b.timestamp * 1000).getFullYear()))
  ).sort((a, b) => a - b);

  const months = [
    {key: 0, label: "January"},
    {key: 1, label: "February"},
    {key: 2, label: "March"},
    {key: 3, label: "April"},
    {key: 4, label: "May"},
    {key: 5, label: "June"},
    {key: 6, label: "July"},
    {key: 7, label: "August"},
    {key: 8, label: "September"},
    {key: 9, label: "October"},
    {key: 10, label: "November"},
    {key: 11, label: "December"},
  ]

  // Process data
// Call chart with data


  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-6 sm:p-20">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start w-full">
        <Chart data={filteredBalances} />
      </main>
      <div className='flex flex-item'>
        <FormControl>
            <InputLabel>Year</InputLabel>
            <Select value={selectedYear} onChange={(e) => setSelectedYear(e.target.value)}>
              <MenuItem value="all">All</MenuItem>
              {years.map(y => <MenuItem key={y} value={y}>{y}</MenuItem>)}
            </Select>
        </FormControl>
        <FormControl>
            <InputLabel>Month</InputLabel>
            <Select value={selectedMonth} onChange={(e) => setSelectedMonth(e.target.value)}>
              <MenuItem value="all">All</MenuItem>
              {months.map(m => <MenuItem key={m.key} disabled={m.key > new Date().getMonth()} value={m.key}>{m.label}</MenuItem>)}
            </Select>
        </FormControl>
      </div>  
    </div>
  );
}
