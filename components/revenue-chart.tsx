'use client'

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'

const data = [
  { month: 'Jan', revenue: 4000, target: 3500 },
  { month: 'Feb', revenue: 3000, target: 3800 },
  { month: 'Mar', revenue: 2000, target: 2500 },
  { month: 'Apr', revenue: 2780, target: 3200 },
  { month: 'May', revenue: 1890, target: 3000 },
  { month: 'Jun', revenue: 2390, target: 3100 },
  { month: 'Jul', revenue: 3490, target: 3400 },
]

export function RevenueChart() {
  return (
    <div className="rounded-lg border border-border bg-card p-6">
      <h2 className="text-lg font-semibold text-foreground mb-6">Revenue Trend</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
          <XAxis stroke="var(--muted-foreground)" />
          <YAxis stroke="var(--muted-foreground)" />
          <Tooltip
            contentStyle={{
              backgroundColor: 'var(--card)',
              border: '1px solid var(--border)',
              borderRadius: '0.375rem',
            }}
            textStyle={{ color: 'var(--foreground)' }}
          />
          <Legend />
          <Line type="monotone" dataKey="revenue" stroke="var(--primary)" strokeWidth={2} dot={{ r: 4 }} />
          <Line type="monotone" dataKey="target" stroke="var(--muted-foreground)" strokeWidth={2} strokeDasharray="5 5" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
