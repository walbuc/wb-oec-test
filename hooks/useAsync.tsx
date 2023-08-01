import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useReducer,
  useRef,
} from 'react'

type Statuses = 'success' | 'error' | 'pending' | 'idle'

type State<T> = {
  status: Statuses
  data: T | null
  error: any
}

type Props<T> = Partial<State<T>>

const reducer = <T,>(prev: State<T>, next: Partial<State<T>>): State<T> => ({
  ...prev,
  ...next,
})

function useSafeDispatch<T>(dispatch: React.Dispatch<Partial<State<T>>>) {
  const mounted = useRef(true)
  useLayoutEffect(() => {
    mounted.current = true
    return () => {
      mounted.current = false
    }
  }, [])

  return useCallback(
    (args: Partial<State<T>>) => (mounted.current ? dispatch(args) : void 0),
    [dispatch],
  )
}

function useAsync<T>(initialState: Props<T> = {}) {
  const defaultState: State<T> = {
    status: 'idle',
    data: null,
    error: null,
  }

  const initialRef = useRef<State<T>>({...defaultState, ...initialState})
  const [state, dispatch] = useReducer(reducer<T>, initialRef.current)
  const {data, error, status} = state
  const safeDispatch = useSafeDispatch(dispatch)

  const setData = useCallback(
    (data: T) => safeDispatch({data, status: 'success'}),
    [safeDispatch],
  )
  const setError = useCallback(
    (error: Error) => safeDispatch({error, status: 'error'}),
    [safeDispatch],
  )
  const reset = useCallback(
    () => safeDispatch(initialRef.current),
    [safeDispatch],
  )
  const setStatus = useCallback(
    (status: Statuses) => safeDispatch({status}),
    [safeDispatch],
  )

  const run = useCallback(
    function run(promise: Promise<T>) {
      if (!promise || !promise.then) {
        throw new Error('argument must be a promise')
      }
      setStatus('pending')
      return promise.then(
        result => {
          setData(result)
          return result
        },
        error => {
          setError(error)
          return Promise.reject(error)
        },
      )
    },
    [setError, setData, setStatus],
  )

  return {
    run,
    state,
    error,
    data,
    status,
    setData,
    setError,
    reset,
    setStatus,
  }
}

export {useAsync}

type PatientType = {
  name: string
}

// how to use it.
function Component() {
  const {run, data} = useAsync<PatientType>()
  useEffect(() => {
    const p = fetchData('endpoint')
    run(p)
  }, [run])
}

//ver data fetch
function fetchData(endpoint: string): Promise<PatientType> {
  return window.fetch(`/${endpoint}`).then(async response => {
    const responseData = await response.json()
    if (response.ok) {
      return responseData
    } else {
      return Promise.reject(responseData)
    }
  })
}
