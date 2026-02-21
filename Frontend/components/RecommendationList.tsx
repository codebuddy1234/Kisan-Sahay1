'use client'

import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

type Props = {
  data: any[]
  category: 'scheme' | 'insurance' | 'financial'
}

export default function Recommendation({ data, category }: Props) {
  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 capitalize">
        {category.replace('-', ' ')} Recommendations
      </h1>

      <div className="grid gap-6">
        {data.map(item => (
          <Card key={item.id} className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-xl font-semibold">{item.name}</h2>
                <p className="text-muted-foreground mt-2">
                  {item.description}
                </p>
              </div>
              <Badge>{category}</Badge>
            </div>

            <Button className="mt-4">View Details</Button>
          </Card>
        ))}
      </div>
    </div>
  )
}
