import {type SearchComboboxProps} from './search-combobox'

export type BaseOptions<Item> = Pick<
  SearchComboboxProps<Item>,
  'selectedItem' | 'exclude' | 'onChange' | 'placeholder'
>

export {SearchCombobox as BasicSearchCombobox} from './search-combobox'
