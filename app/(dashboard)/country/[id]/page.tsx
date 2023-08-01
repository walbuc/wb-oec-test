import {Spacer} from '@/components/spacer'
import Trade from './trade'
import {Suspense} from 'react'
import YearCombobox from '@/components/year-combobox'
import {redirect} from 'next/navigation'

type ProjectPageProps = {
  params: {id: string}
  searchParams: {name: string | undefined; year: string | undefined}
}

const items = [2015, 2016, 2017, 2018, 2019, 2020].map(year => ({
  name: String(year),
  value: year,
}))

export default function ProjectPage({params, searchParams}: ProjectPageProps) {
  const name = searchParams['name']
  const year = searchParams['year']

  if (!name) {
    redirect('/home')
  }

  return (
    <div className="mt-12 flex-1">
      <main>
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-body-lg text-night-200">Explore the universe</p>
          <h1 className="text-h1 tracking-wide">National Trade Data</h1>
        </div>
        <Spacer size="sm" />
        <div className="mx-auto w-[80vw]">
          <YearCombobox itemsInitial={items} year={year} />
        </div>
        <Spacer size="sm" />
        <div className="container m-auto">
          <Suspense fallback="Loading Trade Data...">
            <Trade id={params.id} name={name} year={year} />
          </Suspense>
        </div>
      </main>
    </div>
  )
}
