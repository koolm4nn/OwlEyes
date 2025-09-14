"use client";

import BankSummaryCircle from '@/components/BankSummaryCircle';
import { useAccountWithBalances } from '@/hooks/useAccountWithBalances';
import { useBalances } from '@/hooks/useBalance';
import { useBankSummary } from '@/hooks/useBankSummaries';
import { AccountWithBalances, BalanceWithMetaData, BankSummary } from '@/types';
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
function normalizeTs(ts: number) {
  // If clearly in seconds (around 1e9..1e10), convert to ms
  return ts < 1e12 ? ts * 1000 : ts;
}

export function Rechart({ data }: {data: AccountWithBalances[]}){
// Build rows keyed by timestamp (ms)
  const rowsMap = new Map<number, Record<string, any>>();

  data.forEach((acc) => {
    const accountName = acc.account.name;
    acc.balances.forEach((b) => {
      const dateMs = normalizeTs(b.timestamp); // ensure ms
      let row = rowsMap.get(dateMs);
      if (!row) {
        row = { date: dateMs };
        rowsMap.set(dateMs, row);
      }
      // Add accounts value
      row[accountName] = b.amount;
    });
  });

  // Sort rows
  const rows = Array.from(rowsMap.values()).sort((a, b) => a.date - b.date);

  // Get account keys
  const accountKeys = [...new Set(data.map(d => d.account.name))];

  // Every row should has every account key (missing to null)
  rows.forEach(row => {
    accountKeys.forEach(k => {
      if (!(k in row)) row[k] = null;
    });
  });

  // Optional: colors for lines
  const colors = ["#8884d8", "#82ca9d", "#ffc658", "#ff7f50", "#6a5acd"];

  return (
    <ResponsiveContainer className='bg-stone-600' width="100%" height={400}>
      <RechartsLineChart data={rows}>
        <CartesianGrid strokeDasharray="5 5" />
        <XAxis 
          dataKey="date" 
          type='number'
          domain={['dataMin', 'dataMax']}
          tickFormatter={(ts) => new Date(ts).toLocaleDateString("en-NZ", {month: "short"})}
          
          />
        <YAxis />
        <Tooltip 
          labelFormatter={(ts) => new Date(ts).toLocaleDateString("en-NZ", {day: "numeric", month: "short"})}
        />
        <Legend />
        <ReferenceArea y1={-100} y2={0} fill="red" fillOpacity={0.1} />
        <ReferenceLine y={0} stroke="#e1e1e1ff" strokeWidth={1.5} />
        {
          accountKeys.map((key, i) => (
              <Line 
                key={key}
                type="linear"
                dataKey={key}
                stroke={["#8884d8", "#82ca9d", "#ffc658"][i % 3]}
              />)
          )
        }
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
        <Rechart data={accountsWithBalances} />
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
