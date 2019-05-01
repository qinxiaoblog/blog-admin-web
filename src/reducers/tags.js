import axios from 'axios'
import { adminAPIPrefix } from '../constants'

const types = {
  // 获取所有标签

  START_GET_TAGS: 'tags/START_GET_TAGS',
  SUCCESS_GET_TAGS: 'tags/SUCCESS_GET_TAGS',
  FAILURE_GET_TAGS: 'tags/FAILURE_GET_TAGS',

  // 新建标签

  SUCCESS_ADD_TAG: 'tags/SUCCESS_ADD_TAG',

  // 删除标签

  SUCCESS_DELETE_TAG: 'tags/SUCCESS_DELETE_TAG'
}

const initState = {
  data: [],
  status: ''
}

export default (state = initState, action) => {
  switch (action.type) {
    case types.START_GET_TAGS:
      return {
        data: [],
        status: 'pending'
      }
    case types.SUCCESS_GET_TAGS:
      return {
        data: action.data,
        status: 'success'
      }
    case types.FAILURE_GET_TAGS:
      return {
        data: [],
        status: 'failure'
      }
    case types.SUCCESS_ADD_TAG:
      return {
        ...state,
        data: [...state.data, action.data]
      }
    case types.SUCCESS_DELETE_TAG:
      return {
        ...state,
        data: state.data.filter(tag => tag !== action.data)
      }
    default:
      return state
  }
}

// 获取所有标签

const startGetTags = () => ({
  type: types.START_GET_TAGS
})

const successGetTags = tags => ({
  type: types.SUCCESS_GET_TAGS,
  data: tags
})

const failureGetTags = () => ({
  type: types.FAILURE_GET_TAGS
})

const requestGetTags = () => (dispatch, getState) => {
  dispatch(startGetTags())

  // 发送获取请求
  const token = getState().auth.token
  //const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJleHAiOjE1NTcyMTQ4MjEsIm5iZiI6MTU1NjM1MDgyMSwidHRsIjo4NjQwMDAsImlhdCI6MTU1NjM1MDgyMSwiZGF0YSI6eyJ1c2VySWQiOjEsIm5pY2tuYW1lIjoibWluZyJ9LCJmb3JtYXQiOiJ1dGMifQ.d41nTIcs1wCrjauSHhEzjQY7c1xulndFZFLa2BvbU6jS4_f0GqEI6YPtB42pr90kq_XctYi8p6dpTadLw16C0Q'

  return axios
    .get(`${adminAPIPrefix}/tags`, {
      // params: {
      //   token
      // }
      headers: {'User-Token': token}
    })
    .then(response => {
      const tags = response.data.data.tags
      dispatch(successGetTags(tags))
      return 'success'
    })
    .catch(error => {
      console.log(error.response)
      dispatch(failureGetTags())
      return 'failure'
    })
}

// 添加新标签

const successAddTag = tag => ({
  type: types.SUCCESS_ADD_TAG,
  data: tag
})

const requestAddTag = tag => (dispatch, getState) => {
  // 发送添加标签请求
  const token = getState().auth.token
  //const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJleHAiOjE1NTcyMTQ4MjEsIm5iZiI6MTU1NjM1MDgyMSwidHRsIjo4NjQwMDAsImlhdCI6MTU1NjM1MDgyMSwiZGF0YSI6eyJ1c2VySWQiOjEsIm5pY2tuYW1lIjoibWluZyJ9LCJmb3JtYXQiOiJ1dGMifQ.d41nTIcs1wCrjauSHhEzjQY7c1xulndFZFLa2BvbU6jS4_f0GqEI6YPtB42pr90kq_XctYi8p6dpTadLw16C0Q'

  return axios
    .post(`${adminAPIPrefix}/tags`,

        {
      // token,

      name: tag
    },
        { headers: {'User-Token': token}}
    )
    .then(() => {
      dispatch(successAddTag(tag))
      return 'success'
    })
    .catch(error => {
      console.log(error.response)
      return 'failure'
    })
}

// 删除标签

const successDeleteTag = tag => ({
  type: types.SUCCESS_DELETE_TAG,
  data: tag
})

const requestDeleteTag = tag => (dispatch, getState) => {
  // 发送删除标签请求
  const token = getState().auth.token
  //const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJleHAiOjE1NTcyMTQ4MjEsIm5iZiI6MTU1NjM1MDgyMSwidHRsIjo4NjQwMDAsImlhdCI6MTU1NjM1MDgyMSwiZGF0YSI6eyJ1c2VySWQiOjEsIm5pY2tuYW1lIjoibWluZyJ9LCJmb3JtYXQiOiJ1dGMifQ.d41nTIcs1wCrjauSHhEzjQY7c1xulndFZFLa2BvbU6jS4_f0GqEI6YPtB42pr90kq_XctYi8p6dpTadLw16C0Q'
  return axios
    .delete(`${adminAPIPrefix}/tags`,{headers: {'User-Token': token},
      data: {
       // token,
        name: tag

      }
    }

    )
    .then(() => {
      dispatch(successDeleteTag(tag))
      return 'success'
    })
    .catch(error => {
      console.log(error.response)
      return 'failure'
    })
}

export { requestGetTags, requestAddTag, requestDeleteTag }
