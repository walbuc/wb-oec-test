const API_URL = 'https://oec.world/olap-proxy/'
import type {User} from '@prisma/client'
const fetcher = async ({
  url,
  method,
  body,
  json = true,
}: {
  url: string
  method: 'GET' | 'POST'
  body?: any
  json?: boolean
}) => {
  const res = await fetch(url, {
    method,
    body: body && JSON.stringify(body),
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  })

  const data = await res.json()
  if (res.ok) {
    return data
  } else {
    return Promise.reject(data)
  }
}

//List of countries: https://oec.world/olap-proxy/members?cube=trade_i_baci_a_92&level=Country&locale=en
export type Country = {
  ID: string
  ['EN Label']: string | null
}

async function getCountries(): Promise<Country[]> {
  return fetcher({
    url: `${API_URL}members?cube=trade_i_baci_a_92&level=Country&locale=en`,
    method: 'GET',
  }).then(
    res => res.data,
    err => Promise.reject(new Error(err)),
  )
}

// https://oec.world/olap-proxy/data.jsonrecords?Importer+Country=sachl&Year=2020&cube=trade_i_baci_a_92&drilldowns=HS2&measures=Trade+Value&token=6e4305fa8187405a83a49c15de8dac1e
type OperationType = 'Importer' | 'Exporter'

export type Trade = {
  ['HS2 ID']: number
  ['HS2']: string
  ['Trade Value']: number
}

async function getTradeData({
  type = 'Importer',
  id,
  year = '2018',
}: {
  type: OperationType
  id: string
  year?: string | number
}): Promise<Trade[]> {
  return fetcher({
    url: `${API_URL}data.jsonrecords?${type}+Country=${id}&Year=${year}&cube=trade_i_baci_a_92&drilldowns=HS2&measures=Trade+Value&token=6e4305fa8187405a83a49c15de8dac1e`,
    method: 'GET',
  }).then(
    res => res.data,
    err => Promise.reject(new Error(err)),
  )
}

async function register(user: Pick<User, 'password' | 'email'>) {
  return fetcher({
    url: '/api/register',
    method: 'POST',
    body: user,
    json: true,
  })
}

async function signin(user: Pick<User, 'password' | 'email'>) {
  return fetcher({
    url: '/api/signin',
    method: 'POST',
    body: user,
    json: true,
  })
}

async function logout() {
  return fetcher({
    url: '/api/logout',
    method: 'GET',
  })
}

export {fetcher, getCountries, getTradeData, signin, register, logout}
