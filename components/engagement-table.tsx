'use client'

import { ArrowRight } from 'lucide-react'

interface EngagementItem {
  id: string
  page: string
  views: number
  avgTime: string
  bounceRate: string
}

const engagementData: EngagementItem[] = [
  { id: '1', page: '/home', views: 12453, avgTime: '2m 34s', bounceRate: '24%' },
  { id: '2', page: '/products', views: 8932, avgTime: '1m 12s', bounceRate: '31%' },
  { id: '3', page: '/pricing', views: 6541, avgTime: '3m 08s', bounceRate: '18%' },
  { id: '4', page: '/docs', views: 4129, avgTime: '5m 42s', bounceRate: '12%' },
  { id: '5', page: '/blog', views: 3847, avgTime: '4m 19s', bounceRate: '22%' },
]

export function EngagementTable() {
  return (
    <div className="rounded-lg border border-border bg-card p-6">
      <h2 className="text-lg font-semibold text-foreground mb-6">Top Pages</h2>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border">
              <th className="px-4 py-3 text-left font-medium text-muted-foreground">Page</th>
              <th className="px-4 py-3 text-left font-medium text-muted-foreground">Views</th>
              <th className="px-4 py-3 text-left font-medium text-muted-foreground">Avg Time</th>
              <th className="px-4 py-3 text-left font-medium text-muted-foreground">Bounce Rate</th>
            </tr>
          </thead>
          <tbody>
            {engagementData.map((item) => (
              <tr key={item.id} className="border-b border-border last:border-b-0 hover:bg-secondary/50 transition-colors">
                <td className="px-4 py-3 font-medium text-foreground">{item.page}</td>
                <td className="px-4 py-3 text-foreground">{item.views.toLocaleString()}</td>
                <td className="px-4 py-3 text-foreground">{item.avgTime}</td>
                <td className="px-4 py-3 text-foreground">{item.bounceRate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <button className="mt-6 flex items-center gap-2 text-sm font-medium text-primary hover:text-primary/80 transition-colors">
        View all pages <ArrowRight className="h-4 w-4" />
      </button>
    </div>
  )
}
