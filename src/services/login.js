import { request, baseUrl } from '../utils'

export async function login (data) {
  const url = `${baseUrl}/login`
  return request({
    url,
    method: 'post',
    data,
  })
}
export async function register (data) {
  const url = `${baseUrl}/register`
  return request({
    url,
    method: 'post',
    data,
  })
}
