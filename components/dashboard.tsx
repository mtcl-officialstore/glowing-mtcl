'use client'

import { MetricCard } from './metric-card'
import { RevenueChart } from './revenue-chart'
import { UserGrowthChart } from './user-growth-chart'
import { ConversionChart } from './conversion-chart'
import { EngagementTable } from './engagement-table'

export function Dashboard() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border">
        <div className="mx-auto max-w-7xl px-6 py-8">
          <h1 className="text-3xl font-semibold text-foreground">Analytics Dashboard</h1>
          <p className="mt-2 text-muted-foreground">Track your key performance metrics</p>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-7xl px-6 py-12">
        {/* KPI Cards */}
        <div className="grid gap-4 md:grid-cols-4 mb-8">
          <MetricCard title="Total Revenue" value="$45,231" change="+12.5%" trend="up" />
          <MetricCard title="Active Users" value="2,847" change="+8.2%" trend="up" />
          <MetricCard title="Conversion Rate" value="3.24%" change="-2.1%" trend="down" />
          <MetricCard title="Avg Order Value" value="$156" change="+4.3%" trend="up" />
        </div>

        {/* Charts Grid */}
        <div className="grid gap-6 lg:grid-cols-3 mb-8">
          {/* Revenue Chart - Spans 2 columns */}
          <div className="lg:col-span-2">
            <RevenueChart />
          </div>

          {/* User Growth Chart */}
          <div>
            <UserGrowthChart />
          </div>
        </div>

        {/* Conversion Chart and Engagement Table */}
        <div className="grid gap-6 lg:grid-cols-2">
          <ConversionChart />
          <EngagementTable />
        </div>
      </main>
    </div>
  )
}
