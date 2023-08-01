import {Spacer} from '@/components/spacer'
import {Suspense} from 'react'
import Countries from './countries'
import CountrySearchCombobox from '@/components/country-combobox'
export default function Home({
  searchParams,
}: {
  searchParams: {[key: string]: string | string[] | undefined}
}) {
  return (
    <div className="flex-1">
      <Spacer size="lg" />
      <main>
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-body-lg text-night-200">Explore the universe</p>
          <h1 className="text-h1 tracking-wide">
            Find trade data in outer space
          </h1>
        </div>
        <Spacer size="sm" />
        <div className="container m-auto mt-12">
          <Suspense
            fallback={
              <CountrySearchCombobox
                placeholder="Search for a country"
                itemsInitial={[]}
                showSpinner={true}
              />
            }
          >
            <Countries />
          </Suspense>
        </div>
      </main>
    </div>
  )
}
