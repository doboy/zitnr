import React from "react";
import { CartesianGrid, Line, LineChart, ReferenceLine, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

export type Transaction = {
  date: string;  // ISO date string
  amount: number; // Positive for credit, negative for debit
};

export interface BalanceChartProps {
  transactions: Transaction[];
}

const formatDate = (date: string) => {
  const dateObj = new Date(date);
  const hours = dateObj.getHours();
  const minutes = dateObj.getMinutes().toString().padStart(2, '0');
  const ampm = hours >= 12 ? 'PM' : 'AM';
  const formattedHours = (hours % 12 || 12).toString().padStart(2, '0');
  return `${(dateObj.getMonth() + 1).toString().padStart(2, '0')}/${dateObj.getDate().toString().padStart(2, '0')} ${formattedHours}:${minutes} ${ampm}`;
};

export const BalanceChart: React.FC<BalanceChartProps> = ({ transactions }) => {
  // Step 1: Sort transactions by date
  const sorted = [...transactions].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  // Step 2: Calculate running balance for each transaction
  let balance = 0;
  const data: Array<{date: string, balance: number}> = [];

  sorted.forEach((t) => {
    balance += (-t.amount);
    if (t.date == data[data.length - 1]?.date) {
      data[data.length - 1].balance = balance;
    } else {
      data.push({
        date: t.date,
        balance,
      });
    }
  });

  return (
    <ResponsiveContainer height={400} style={{margin: "auto"}}>
      <LineChart data={data}>
        <defs>
          <linearGradient id="gradient" x1="0" y1="0" x2="100%" y2="0">
            {data.map((entry, index) => {
              const percent = index / (data.length - 1) * 100;
              return <stop
                key={percent}
                offset={`${percent}%`} stopColor={entry.balance < 0 ? "red" : "black"}
              />
            })}

            <stop
              offset={`100%`} stopColor={balance < 0 ? "red" : "black"}
            />
          </linearGradient>
        </defs>

        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="date"
          tickFormatter={(str) => {return formatDate(str)}}
        />
        <YAxis />
        <Tooltip labelFormatter={(label) => {return formatDate(label)}} />
        <ReferenceLine y={0} stroke="red" strokeDasharray="3 3" />
        <Line
          type="monotone"
          dataKey="balance"
          stroke="url(#gradient)"
          strokeWidth={2}
          dot={false}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default BalanceChart;
