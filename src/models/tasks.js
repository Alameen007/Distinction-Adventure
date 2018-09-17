import { routerRedux } from 'dva/router'
import { message } from 'antd'
import { getTasks, getUser, updateTaskStatus, getTaskData, updateTaskData } from '../services/user'


export default {
  namespace: 'tasks',
  state: {
    tasks: [],
    user: {},
    tags: [],
    currentTask: {},
    modalVisible: true,
    profileVisible: false,
    settingVisible: false,
  },

  reducers: {
    save (state, { payload }) {
      return { ...state, ...payload }
    },
    hideModal (state) {
      return {
        ...state,
        modalVisible: false,
      }
    },
  },

  subscriptions: {
    setup ({ dispatch }) {
      dispatch({ type: 'query' })
      dispatch({ type: 'getTasks' })
    },
  },

  effects: {
    * query ({ payload = {} }, { call, put }) {
      console.log('user')
      const data = yield call(getUser, payload)
      if (data.success) {
        yield put({
          type: 'save',
          payload: {
            user: data,
          },
        })
      } else {
        message.error('Error fetching User')
      }
    },
    * getTasks ({ payload = {} }, { call, put }) {
      const data = yield call(getTasks, payload)
      if (data.success) {
        yield put({
          type: 'save',
          payload: {
            tasks: data.raw,
          },
        })
      } else {
        message.error('Error fetching Tasks')
      }
    },
    *getTaskData (payload, { call, put }) {
      const { id } = payload
      const response = yield call(getTaskData, id)
      if (response.success) {
        if (response.raw.data === undefined) {
          yield put({
            type: 'save',
            payload: {
              tags: [],
            },
          })
        } else {
          yield put({
            type: 'save',
            payload: {
              tags: response.raw.data.data,
            },
          })
        }
      } else {
        message.error('Error fetching Tasks')
      }
    },

    * updateTaskStatus (payload, { call, put }) {
      const { id } = payload
      const data = yield call(updateTaskStatus, id)
      if (data.success) {
        yield put({
          type: 'save',
          payload: {
            currentTask: data.raw,
          },
        })
        const currentTask = data.raw
        localStorage.setItem('currentTask', JSON.stringify(currentTask))
        yield put({ type: 'hideModal' })
      } else {
        message.error('Error fetching Tasks')
      }
    },

    * updateTaskData (payload, { select, call, put }) {
      const { tags, taskId } = payload
      const data = {
        tags,
        taskId,
      }
      const response = yield call(updateTaskData, data)
      if (response.success) {
        // yield put({ type: 'getTaskData' })
      } else {
        message.error('Error Updating Tasks')
      }
    },
    * logout ({ payload = {} }, { call, put }) {
      console.log('logout')
      // const data = yield call(getCategories, payload)
      localStorage.setItem('user', JSON.stringify({}))
      localStorage.setItem('currentTask', JSON.stringify({}))
      localStorage.setItem('token', '')
      let from = location.pathname
      window.location = `${location.origin}/#/login`
    },
  },
}
