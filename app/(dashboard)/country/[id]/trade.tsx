import {getTradeData} from '@/lib/client'
import type {Trade} from '@/lib/client'
import Link from 'next/link'
import TreeMap from '@/components/tree-map'
import {Spacer} from '@/components/spacer'
import Exports from './exports'
import {Suspense} from 'react'

type TradeProps = {
  id: string
  name: string
  year?: string
}

export default async function Trade({id, name, year}: TradeProps) {
  // Parallel execution
  const importsPromise: Promise<Trade[]> = getTradeData({
    type: 'Importer',
    id,
    year,
  })
  const exportsPromise: Promise<Trade[]> = getTradeData({
    type: 'Exporter',
    id,
    year,
  })
  const [imports] = await Promise.all([importsPromise])

  return (
    <div className="h-[400px] flex-1">
      <div className="flex items-center justify-around">
        <div className="text-3xl">{name}</div>
        <div className="text-2xl">
          <Link href="/home">Go Back</Link>
        </div>
      </div>
      <Spacer size="4xs" />
      <div className="relative flex h-full flex-wrap gap-7">
        <div className="h-full min-w-[400px] flex-1">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-body-lg text-night-200">Imports</p>
          </div>
          <Spacer size="3xs" />
          <TreeMap data={imports} />
        </div>
        <div className="h-full min-w-[400px] flex-1">
          <Suspense fallback={null}>
            <div className="mx-auto max-w-3xl text-center">
              <p className="text-body-lg text-night-200">Exports</p>
            </div>
            <Spacer size="3xs" />
            <Exports promise={exportsPromise} />
          </Suspense>
        </div>
      </div>
    </div>
  )
}
