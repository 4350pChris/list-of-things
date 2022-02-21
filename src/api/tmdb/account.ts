import { apiBasePath, makeHeader, handleResponse } from './common'
import { BaseList } from './models'

const accountPath = apiBasePath + '4/account/'

export function getLists(options: { token: string; accountId: number }): Promise<BaseList[]> {
  return fetch(accountPath + options.accountId + '/lists', { headers: makeHeader(options.token) }).then(r =>
    handleResponse(r, 'results')
  )
}
