'use client'
import {useCallback} from 'react'
import {SearchCombobox, type SearchComboboxProps} from './search-combobox'
import {useSearchParams, usePathname} from 'next/navigation'
import {useRouter} from 'next/navigation'

export type YearItem = {
  name: string
  value: number
}

export type BaseOptions = Pick<
  SearchComboboxProps<YearItem>,
  'selectedItem' | 'exclude' | 'placeholder' | 'itemsInitial'
> & {year?: string}

function getYear(inputValue: string = '') {
  const lowerCasedInputValue = inputValue.toLowerCase()
  return function filterSearch(year: YearItem) {
    return (
      !inputValue ||
      (year.name && year.name.toLowerCase().includes(lowerCasedInputValue))
    )
  }
}

export default function YearCombobox({year, ...props}: BaseOptions) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams?.toString())
      params.set(name, value)
      return params.toString()
    },
    [searchParams],
  )

  return (
    <SearchCombobox
      {...props}
      filter={getYear}
      onChange={item =>
        router.push(
          pathname + '?' + createQueryString('year', String(item?.value)),
        )
      }
      defaultSelectedItem={{name: year || '2018', value: Number(year) || 2018}}
      label="Select a Year"
      itemToKey={item => item.name}
      itemToString={item => item?.name ?? ''}
      additionalSearchParams={null}
      renderItemInList={item => (
        <div className="flex items-center gap-4" data-testid="year-display">
          {item.name}
          <span className="rounded-full bg-accent-yellow px-4 py-2 text-xs text-night-700">
            {item.value}
          </span>
        </div>
      )}
    />
  )
}
