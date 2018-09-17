import { routerRedux } from 'dva/router'
import { message } from 'antd'
import { register, login } from '../services/login'

export default {
  namespace: 'login',
  state: {
    user: [],
    loginVisible: true,
    registerVisible: false,
  },

  reducers: {
    save (state, { payload }) {
      return { ...state, ...payload }
    },
  },

  effects: {
    *login (payload, { call, select, put }) {
      const { values } = payload
      const response = yield call(login, values)
      const { data } = response
      if (data.user) {
        console.log(data.user)
        yield put({
          type: 'save',
          payload: {
            user: data.user,
          },
        })
        localStorage.setItem('token', data.token)
        localStorage.setItem('user', JSON.stringify(data.user))
        yield put(routerRedux.push('/tasks'))
      } else {
        message.error(message)
      }
    },
    *register (payload, { call, select, put }) {
      const { parameter } = payload
      const response = yield call(register, parameter)
      const { data } = response
      if (data.user) {
        yield put({
          type: 'save',
          payload: {
            user: data.user,
          },
        })
        localStorage.setItem('token', data.token)
        localStorage.setItem('user', JSON.stringify(data.user))
        yield put(routerRedux.push('/tasks'))
      } else {
        message.error(message)
      }
    },
  },
}
