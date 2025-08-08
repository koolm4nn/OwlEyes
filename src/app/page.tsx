"use client";

import {LineChart} from '@mui/x-charts/LineChart';
//import { Console } from 'console';
import Image from "next/image";

const Chart = () => {
  interface ChartEntity {
    date: string[],
    data: (number)[],
    currency: string,
    title: string
  };

  type ChartData = {
    [key: string]: ChartEntity // Record<string, ChartEntity> ?
  };

  const data : ChartData = {
    "apo": {
      date: ["2024-12-01", "2024-12-02", "2025-01-01", "2025-02-01", "2025-03-02", "2025-04-01", "2025-05-03", "2025-06-01"],
      data: [1500.15, 1456.12, 1500.0, 834.23, 700.12, 1412.11, 1534.12],
      currency: "EUR",
      title: "ApoBank"
    },
    "sparkasse": {
      date: ["2024-11-01", "2024-12-02", "2025-01-03", "2025-02-01", "2025-03-01", "2025-04-02", "2025-05-02", "2025-06-01"],
      data: [4500, 5500.15, 4456.12, 4500.0, 3834.23, 4700.12, 5412.11, 5534.12],
      currency: "EUR",
      title: "Sparkasse Bremen"
    },
    "bnz": {
      date: ["2024-12-02", "2025-01-02", "2025-02-01", "2025-03-03", "2025-04-02", "2025-05-01", "2025-06-02"],
      data: [14000.15, 12056.12, 11300.2, 9834.23, 7700.12, 6412.11, 4534.12],
      currency: "NZ DOLLAR",
      title: "BNZ"
    }
  };

  // Get unique dates
  const dates : string[] = data.apo.date.concat(data.sparkasse.date).concat(data.bnz.date);
  const uniqueDates = new Set(dates).values().toArray().sort();
  
  //.map((d) => {
  //  const splt = d.split("-");
  //  return new Date(parseFloat(splt[0]), parseFloat(splt[1]), parseFloat(splt[2])).toISOString();
  //});

  console.log(uniqueDates);

  //type pair = {date: string, amount: number };
  //const zipped : number[] =  data.apo.data.reduce((acc: number[], curr: number) => {
  //  acc.push(curr);
  //  return acc;
  //}, [])

  /**
   * Series: 
   * [
   * {data: ..., label: ..., connectNulls: true},
   *  ...
   * ]
   * 
  */

  

  type BankAccountSeries = {
    key: string;           // e.g. "bnz", "apo"
    label: string;         // e.g. "BNZ", "ApoBank"
    currency: string;      // e.g. "NZD", "EUR"
    data: { date: string; value: number }[]; // use ISO strings
  };

  const accounts: BankAccountSeries[] = [
    {
      key: "bnz",
      label: "BNZ",
      currency: "NZD",
      data: [
        { date: "2025-01-01", value: 14000 },
        { date: "2025-02-01", value: 13000 },
        { date: "2025-03-01", value: 12500 },
      ],
    },
    {
      key: "apo",
      label: "ApoBank",
      currency: "EUR",
      data: [
        { date: "2025-01-01", value: 1500 },
        { date: "2025-03-01", value: 1600 },
        { date: "2025-06-01", value: 1700 },
      ],
    }
  ];

  //const series = accounts.map((account) => ({
  //  label: account.label,
  //  data: account.data.map((point) => ({
  //    x: new Date(point.date),
  //    y: point.value,
  //  })),
  //  xKey: "x",
  //  yKey: "y",
  //}));

    // Build aligned data per date
    /*
    const series = Object.values(data).map((entity) => ({
      label: entity.title,
      data: uniqueDates.map((date) => {
        const val = entity.date.findIndex(
          (d) => d === date.toISOString().slice(0, 10)
        );
        return val !== -1 ? entity.data[val] : null;
      }),
    }));*/

  type KeyValue = {
    [key: string]: string // Record<string, ChartEntity> ?
  }

    //const keyToLabel : KeyValue = {
    //  "ABC": "ABC-Bank",
    //  "ANZ": "ANZ Bankt",
    //  "BNZ": "BNZet"
    //}

    return (
      <div className='bg-cyan-500 w-full'>
      <LineChart
      series={[
        {data: data.apo.data, label: data.apo.title, connectNulls: true},
        {data: data.sparkasse.data, label: data.sparkasse.title},
        {data: data.bnz.data, label: data.bnz.title},
      ]}
      height={400}
    />

      </div>
    )
}

export default function Home() {
  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-6 sm:p-20">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start w-full">
        {/*<Image
          className="dark:invert"
          src="/next.svg"
          alt="Next.js logo"
          width={180}
          height={38}
          priority
        />*/}
        <Chart />

        <ol className="font-mono list-inside list-decimal text-sm/6 text-center sm:text-left">
          <li className="mb-2 tracking-[-.01em]">
            Get started byyyy editing{" "}
            <code className="bg-black/[.05] dark:bg-white/[.06] font-mono font-semibold px-1 py-0.5 rounded">
              src/app/page.tsx
            </code>
            .
          </li>
          <li className="tracking-[-.01em]">
            Save and see your changes instantly.
          </li>
        </ol>

        <div className="flex gap-4 items-center flex-col sm:flex-row">
          <a
            className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:w-auto"
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              className="dark:invert"
              src="/vercel.svg"
              alt="Vercel logomark"
              width={20}
              height={20}
            />
            Deploy now
          </a>
          <a
            className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 w-full sm:w-auto md:w-[158px]"
            href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            Read our docs
          </a>
        </div>
      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          Learn
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          Examples
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Go to nextjs.org →
        </a>
      </footer>
    </div>
  );
}
