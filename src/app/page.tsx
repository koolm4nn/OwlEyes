"use client";

import BankSummaryCircle from '@/components/BankSummaryCircle';
import { useAccountWithBalances } from '@/hooks/useAccountWithBalances';
import { useBalances } from '@/hooks/useBalance';
import { useBankSummary } from '@/hooks/useBankSummaries';
import { BalanceWithMetaData, BankSummary } from '@/types';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import {LineChart} from '@mui/x-charts/LineChart';
import { useState } from 'react';

import {
  LineChart as RechartsLineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceLine,
  ReferenceArea,
} from "recharts";


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
    connectNulls: true,
    curve: "linear" as const
  }));

  console.log(series);

  return { dates, series };
}

const Chart = ({ data } : {data: BalanceWithMetaData[]}) => {
  const { dates, series } = groupBalances(data);

  console.log(series);

    return (
      <div className='w-full'>
        <LineChart
          xAxis={[{ data: dates, scaleType: 'point' }]}
          series={series}
          height={400}
        />
      </div>
    )
}

export function Rechart(){
  // Generate a fixed timeline (e.g. Jan–Dec 2025)
  const allDates = Array.from({ length: 12 }, (_, i) => `2025-${String(i + 1).padStart(2, "0")}-01`);

  // Example balances for two accounts with gaps in the data
  const accountAData = [
    { date: "2025-01-15", amount: -100 },
    { date: "2025-03-03", amount: 150 },
    { date: "2025-06-07", amount: 200 },
  ];

  const accountBData = [
    { date: "2025-02-01", amount: 80 },
    { date: "2025-05-02", amount: 60 },
    { date: "2025-09-03", amount: 120 },
  ];

  // convert to timestamps
  const parseDate = (d: string) => new Date(d).getTime();

  const allData = [
    ...accountAData.map(d => ({ date: parseDate(d.date), accountA: d.amount})),
    ...accountBData.map(d => ({ date: parseDate(d.date), accountB: d.amount}))
  ]

  // Merge into fixed timeline with nulls for missing dates
  const mergedData = allDates.map(date => {
    const accA = accountAData.find(d => d.date === date);
    const accB = accountBData.find(d => d.date === date);
    return {
      date,
      accountA: accA ? accA.amount : null,
      accountB: accB ? accB.amount : null,
    };
  })

  console.log(mergedData);

  return (
    <ResponsiveContainer className='bg-stone-600' width="100%" height={400}>
      <RechartsLineChart data={allData}>
        <CartesianGrid strokeDasharray="5 5" />
        <XAxis 
          dataKey="date" 
          type='number'
          domain={[parseDate("2025-01-01"), parseDate("2025-12-31")]}
          tickFormatter={(ts) => new Date(ts).toLocaleDateString("en-NZ", {month: "short"})}
          
          />
        <YAxis />
        <Tooltip 
          labelFormatter={(ts) => new Date(ts).toLocaleDateString("en-NZ", {day: "numeric", month: "short"})}
        />
        <Legend />
        <ReferenceArea y1={-100} y2={0} fill="red" fillOpacity={0.1} />
        <ReferenceLine y={0} stroke="#e1e1e1ff" strokeWidth={1.5} />
        <Line type="linear" dataKey="accountA" stroke="#8884d8" connectNulls />
        <Line type="linear" dataKey="accountB" stroke="#82ca9d" connectNulls />
      </RechartsLineChart>
    </ResponsiveContainer>
  );
}

export default function Home() {
  const {data: balances = [], isLoading, error } = useBalances();
  const { data: banks, isLoading: isLoadingSummary } = useBankSummary();
  const { data: accountsWithBalances, isLoading: isLoadingAccounts } = useAccountWithBalances();
  // Filters
  const [selectedYear, setSelectedYear] = useState<number | "all">("all");
  const [selectedMonth, setSelectedMonth] = useState<number | "all">("all");
  const [selectedAccount, setSelectedAccount] = useState<number | "all">("all");

  //console.log(banks);

  if(isLoadingSummary) return (<p>Is loading summary</p>);
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

    <div className="font-sans grid grid-rows items-center justify-items-center md:px-6 py-2 md:py-6">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start w-full">
        <div className='grid grid-cols-2 md:grid-cols-6 gap-2 md:gap-6'>
        {banks.map((bank: BankSummary) => (
          (
          <div key={bank.id} className=''>
            <BankSummaryCircle bank={bank} />
          </div>
          )
        ))}
        </div>

        <Chart data={filteredBalances} />
        <Rechart />
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
      </main> 
    </div>
  );
}
