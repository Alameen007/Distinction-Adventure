import { request, baseUrl } from '../utils'

const storage = localStorage.getItem('user')
const user = JSON.parse(storage)


export async function getUser () {
  const url = `${baseUrl}/users/${user._id}`
  return request({
    url,
    method: 'get',
  })
}
export async function getTasks () {
  const url = `${baseUrl}/tasks/${user._id}`
  return request({
    url,
    method: 'get',
  })
}

export async function updateTaskStatus (taskId) {
  const url = `${baseUrl}/tasks/${user._id}/task/${taskId}`
  return request({
    url,
    method: 'get',
  })
}
export async function getTaskData (taskId) {
  const url = `${baseUrl}/tasks/${user._id}/taskData/${taskId}`
  return request({
    url,
    method: 'get',
  })
}

export async function updateTaskData (data) {
  const { tags, taskId } = data
  const url = `${baseUrl}/tasks/${user._id}/updateTaskData/${taskId}`
  return request({
    url,
    method: 'put',
    data: tags,
  })
}
