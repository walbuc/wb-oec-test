'use client'
import {SearchCombobox, type SearchComboboxProps} from './search-combobox'
import {useRouter} from 'next/navigation'

export type CountryItem = {
  ID: string
  ['EN Label']: string | null
}

export type BaseOptions = Pick<
  SearchComboboxProps<CountryItem>,
  'selectedItem' | 'exclude' | 'placeholder' | 'itemsInitial' | 'showSpinner'
>
// TS is Awesome
function getCountryFilter(inputValue: string = '') {
  const lowerCasedInputValue = inputValue.toLowerCase()

  return function filterSearch(country: CountryItem) {
    return (
      !inputValue ||
      (country['EN Label'] &&
        country['EN Label'].toLowerCase().includes(lowerCasedInputValue))
    )
  }
}

export default function CountrySearchCombobox(props: BaseOptions) {
  const router = useRouter()

  return (
    <SearchCombobox
      {...props}
      filter={getCountryFilter}
      onChange={country =>
        router.push(`country/${country?.ID}?name=${country?.['EN Label']}`)
      }
      label="Country"
      itemToKey={item => item.ID}
      itemToString={item => item?.['EN Label'] ?? ''}
      additionalSearchParams={null}
      renderItemInList={country => (
        <div
          className="flex items-center gap-4"
          onMouseEnter={() =>
            router.prefetch(
              `country/${country?.ID}?name=${country?.['EN Label']}`,
            )
          }
        >
          {country['EN Label']}
          <span className="rounded-full  bg-accent-yellow px-4 py-2 text-xs text-night-700">
            {country.ID}
          </span>
        </div>
      )}
    />
  )
}
