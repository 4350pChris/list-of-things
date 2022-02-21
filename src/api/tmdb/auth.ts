import { apiBasePath, makeHeader, handleResponse } from './common'

const v4authApiPath = apiBasePath + '4/auth/'
const v3authApiPath = apiBasePath + '3/authentication/'
const options: RequestInit = {
  headers: makeHeader(process.env.VUE_APP_TMDB_TOKEN),
  method: 'POST'
}

export function getRequestToken() {
  return fetch(v4authApiPath + 'request_token', options).then(r => handleResponse(r, 'request_token'))
}

export function generateAuthUrl(requestToken: string) {
  return 'https://www.themoviedb.org/auth/access?request_token=' + requestToken
}

export function getAccessTokenAndAccountId(
  requestToken: string
): Promise<{ access_token: string; account_id: number }> {
  return fetch(v4authApiPath + 'access_token', {
    ...options,
    body: JSON.stringify({ request_token: requestToken })
  }).then(r => handleResponse(r, ['access_token', 'account_id']))
}

export function convertTokenToSession(token: string) {
  return fetch(v3authApiPath + 'session/convert/4', {
    ...options,
    body: JSON.stringify({ access_token: token })
  }).then(r => handleResponse(r, 'session_id'))
}

export function logout(options: { token: string; sessionId: string }) {
  return fetch(v3authApiPath + 'session', {
    headers: makeHeader(options.token),
    method: 'DELETE',
    body: JSON.stringify({ session_id: options.sessionId })
  }).then(res => handleResponse(res))
}
