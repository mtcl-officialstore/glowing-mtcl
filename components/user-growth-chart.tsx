'use client'

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'

const data = [
  { month: 'Jan', users: 400 },
  { month: 'Feb', users: 520 },
  { month: 'Mar', users: 780 },
  { month: 'Apr', users: 680 },
  { month: 'May', users: 920 },
  { month: 'Jun', users: 1100 },
  { month: 'Jul', users: 1420 },
]

export function UserGrowthChart() {
  return (
    <div className="rounded-lg border border-border bg-card p-6">
      <h2 className="text-lg font-semibold text-foreground mb-6">User Growth</h2>
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={data}>
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
          <Area type="monotone" dataKey="users" stroke="var(--primary)" fill="var(--accent)" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}
