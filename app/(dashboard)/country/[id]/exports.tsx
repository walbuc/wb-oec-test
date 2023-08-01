import TreeMap from '@/components/tree-map'
import {delay} from '@/lib/async'
export type Export = {
  ['HS2 ID']: number
  ['HS2']: string
  ['Trade Value']: number
}

type ExportProps = {promise: Promise<Export[]>}

async function Exports(props: ExportProps) {
  const {promise} = props
  const exports = await promise
  //await delay(4000)
  return <TreeMap data={exports} />
}

export default Exports
