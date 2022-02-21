export function makeHeader(token?: string): RequestInit['headers'] {
  return {
    'Content-Type': 'application/json;charset=utf-8',
    Authorization: 'Bearer ' + token
  }
}

export const apiBasePath = 'https://api.themoviedb.org/'

export async function handleResponse(res: Response, keysToReturn?: string | string[]) {
  const json = await res.json()
  if (!res.ok) {
    const code = json.status_code
    const msg = json.status_message
    throw new Error(`${code}: ${msg}`)
  } else if (typeof keysToReturn === 'object') {
    return Object.fromEntries(Object.entries(json).filter(([k]) => keysToReturn.includes(k)))
  } else if (typeof keysToReturn === 'string') {
    return json[keysToReturn]
  } else {
    return json
  }
}
