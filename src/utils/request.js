import axios from 'axios'
import qs from 'qs'
import jsonp from 'jsonp'
import cloneDeep from 'lodash/cloneDeep'
import pathToRegexp from 'path-to-regexp'
import { error } from 'antd/lib/message'

import { YQL, CORS, appUrl } from './config'

const fetch = (options) => {
  let {
    method = 'get',
    data,
    fetchType,
    url,
    type = '',
  } = options

  const cloneData = cloneDeep(data)
  const AuthToken = localStorage.getItem('token')
  const CandidateToken = localStorage.getItem('candidateToken')

  if (type === 'candidate') {
    axios.defaults.headers.common.Authorization = `Bearer ${CandidateToken}`
  } else {
    axios.defaults.headers.common.Authorization = `Bearer ${AuthToken}`
  }


  try {
    let domin = ''
    if (url.match(/[a-zA-z]+:\/\/[^/]*/)) {
      domin = url.match(/[a-zA-z]+:\/\/[^/]*/)[0]
      url = url.slice(domin.length)
    }
    const match = pathToRegexp.parse(url)
    url = pathToRegexp.compile(url)(data)
    for (let item of match) {
      if (item instanceof Object && item.name in cloneData) {
        delete cloneData[item.name]
      }
    }
    url = domin + url
  } catch (e) {
    error(e.message)
  }

  if (fetchType === 'JSONP') {
    return new Promise((resolve, reject) => {
      jsonp(url, {
        param: `${qs.stringify(data)}&callback`,
        name: `jsonp_${new Date().getTime()}`,
        timeout: 4000,
      }, (err, result) => {
        if (err) {
          reject(err)
        }
        resolve({ statusText: 'OK', status: 200, data: result })
      })
    })
  } else if (fetchType === 'YQL') {
    url = `http://query.yahooapis.com/v1/public/yql?q=select * from json where url='${options.url}?${encodeURIComponent(qs.stringify(options.data))}'&format=json`
    data = null
  }

  switch (method.toLowerCase()) {
    case 'get':
      return axios.get(url, {
        params: cloneData,
      })
    case 'delete':
      return axios.delete(url, {
        data: cloneData,
      })
    case 'post':
      switch (options.upload) {
        case true:
          return axios.post(
            url,
            options.formData,
            options.config
          )
        default:
          return axios.post(url, cloneData)
      }
    case 'put':
      return axios.put(url, cloneData)
    case 'patch':
      return axios.patch(url, cloneData)
    default:
      return axios(options)
  }
}

export default function request (options) {
  if (options.url && options.url.indexOf('//') > -1) {
    const origin = `${options.url.split('//')[0]}//${options.url.split('//')[1].split('/')[0]}`
    if (window.location.origin !== origin) {
      if (CORS && CORS.indexOf(origin) > -1) {
        options.fetchType = 'CORS'
        options.origin = appUrl
      } else if (YQL && YQL.indexOf(origin) > -1) {
        options.fetchType = 'YQL'
      } else {
        options.fetchType = 'JSON'
      }
    }
  }

  return fetch(options).then((response) => {
    const { statusText, status } = response
    let data = options.fetchType === 'YQL' ? response.data.query.results.json : response.data
    return {
      success: true,
      message: statusText,
      statusCode: status,
      rawData: data,
      raw: data,
      ...data,
    }
  }).catch((err) => {
    const { response } = err
    let msg
    let statusCode
    if (response && response instanceof Object) {
      const { data, statusText } = response
      statusCode = response.status
      msg = data.message || statusText
    } else {
      statusCode = 600
      msg = err.message || 'Network Error'
    }
    return { success: false, statusCode, message: msg }
  })
}
