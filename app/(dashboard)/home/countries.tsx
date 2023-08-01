import {getCountries} from '@/lib/client'
import CountrySearchCombobox from '@/components/country-combobox'
import {delay} from '@/lib/async'

export default async function Countries() {
  await delay(2000)
  const items = await getCountries()

  return (
    <CountrySearchCombobox
      placeholder="Search for a country"
      itemsInitial={items}
    />
  )
}
