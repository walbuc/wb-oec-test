'use client'
import {clsx} from 'clsx'
import {useCombobox} from 'downshift'
import {useState, useId} from 'react'
import {Spinner} from './spinner'

// This is a Polymorphic Component
export type SearchComboboxProps<Item> = {
  selectedItem?: Item | null | undefined
  exclude?: Array<string> | null
  onChange: (selectedHost: Item | null | undefined) => void
  itemToString: (item: Item | null | undefined) => string
  itemToKey: (item: Item) => string
  label: string
  renderItemInList: (item: Item) => React.ReactNode
  additionalSearchParams?: Record<string, string | Array<string>> | null
  placeholder?: string
  itemsInitial: Item[]
  filter: (input: string | undefined) => (country: Item) => boolean | '' | null
  defaultSelectedItem?: Item
  showSpinner?: boolean
}

export function SearchCombobox<Item>({
  selectedItem,
  exclude,
  onChange,
  itemToString,
  itemToKey,
  label,
  renderItemInList,
  additionalSearchParams,
  placeholder,
  itemsInitial,
  filter,
  defaultSelectedItem,
  showSpinner = false,
}: SearchComboboxProps<Item>) {
  const id = useId()
  const [items, setItems] = useState(itemsInitial || [])

  const cb = useCombobox<Item>({
    id,
    onSelectedItemChange: ({selectedItem}) => onChange(selectedItem),
    onInputValueChange: ({inputValue}) =>
      setItems(itemsInitial.filter(filter(inputValue))),
    items,
    selectedItem,
    itemToString,
    defaultSelectedItem,
  })

  //poc
  const searchParams = new URLSearchParams()
  searchParams.set('query', cb.inputValue)

  for (const ex of exclude ?? []) {
    searchParams.append('exclude', ex)
  }

  for (const [key, value] of Object.entries(additionalSearchParams ?? {})) {
    for (const v of Array.isArray(value) ? value : [value]) {
      searchParams.append(key, v)
    }
  }

  const displayMenu = cb.isOpen && items.length > 0

  const menuClassName =
    'absolute z-10 mt-4  min-w-[448px] max-h-[336px] bg-white text-night-400 shadow-lg rounded-3xl w-full overflow-scroll divide-solid divide-night-100 divide-y'

  return (
    <div className="relative mx-4 sm:mx-8 lg:mx-24">
      <div className="group relative">
        <label
          htmlFor={id}
          className="absolute left-8 top-5 text-xs text-white group-focus-within:text-black"
        >
          {label}
        </label>
        <input
          className="h-[88px] w-full rounded-full bg-night-500 pl-8 pr-5 pt-8 text-body-xs caret-black outline-none placeholder:text-night-300 focus:border-accent-purple focus:bg-white focus:text-night-500 focus:placeholder:text-night-500"
          {...cb.getInputProps({id, placeholder})}
        />
        <div className="absolute right-4 top-[44px]">
          <Spinner showSpinner={showSpinner} />
        </div>
      </div>
      <ul
        {...cb.getMenuProps({
          className: clsx(menuClassName, {hidden: !displayMenu}),
        })}
      >
        {displayMenu
          ? items.map((item, index) => (
              <li
                className="mx-6 cursor-pointer py-2"
                key={itemToKey(item)}
                {...cb.getItemProps({item: item, index})}
              >
                <div
                  className={`flex w-full items-center gap-2 rounded-full px-2 py-2 ${
                    cb.highlightedIndex === index ? 'bg-night-100' : ''
                  }`}
                >
                  {renderItemInList(item)}
                </div>
              </li>
            ))
          : null}
      </ul>
    </div>
  )
}
