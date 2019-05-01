import axios from 'axios'
import { adminAPIPrefix } from '../constants'

const types = {
  // 获取标签和分类列表

  START_GET_TAGS_AND_CATEGORIES: 'writeBlog:START_GET_TAGS_AND_CATEGORIES',
  SUCCESS_GET_TAGS_AND_CATEGORIES: 'writeBlog:SUCCESS_GET_TAGS_AND_CATEGORIES',
  FAILURE_GET_TAGS_AND_CATEGORIES: 'writeBlog:FAILURE_GET_TAGS_AND_CATEGORIES'
}

const initState = {
  status: '',
  tags: [],
  categories: []
}

export default (state = initState, action) => {
  switch (action.type) {
    case types.START_GET_TAGS_AND_CATEGORIES:
      return {
        ...state,
        status: 'pending'
      }
    case types.SUCCESS_GET_TAGS_AND_CATEGORIES:
      return {
        status: 'success',
        tags: action.data.tags,
        categories: action.data.categories
      }
    case types.FAILURE_GET_TAGS_AND_CATEGORIES:
      return {
        ...state,
        status: 'failure'
      }
    default:
      return state
  }
}

// 获取标签和分类列表

const startGetTagsAndCategories = () => ({
  type: types.START_GET_TAGS_AND_CATEGORIES
})

const successGetTagsAndCategories = (tags, categories) => ({
  type: types.SUCCESS_GET_TAGS_AND_CATEGORIES,
  data: {
    tags,
    categories
  }
})

const failureGetTagsAndCategories = () => ({
  type: types.FAILURE_GET_TAGS_AND_CATEGORIES
})

const requestGetTagsAndCategories = () => (dispatch, getState) => {
  dispatch(startGetTagsAndCategories())

  // 发送获取请求
  const token = getState().auth.token
  //const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJleHAiOjE1NTcyMTQ4MjEsIm5iZiI6MTU1NjM1MDgyMSwidHRsIjo4NjQwMDAsImlhdCI6MTU1NjM1MDgyMSwiZGF0YSI6eyJ1c2VySWQiOjEsIm5pY2tuYW1lIjoibWluZyJ9LCJmb3JtYXQiOiJ1dGMifQ.d41nTIcs1wCrjauSHhEzjQY7c1xulndFZFLa2BvbU6jS4_f0GqEI6YPtB42pr90kq_XctYi8p6dpTadLw16C0Q'

  // 获取标签列表的请求
  const getTags = axios.get(`${adminAPIPrefix}/tags`, {
    // params: {
    //   token
    // }
    headers: {'User-Token': token}
  })
  // 获取分类列表的请求
  const getCategories = axios.get(`${adminAPIPrefix}/categories`, {
    // params: {
    //   token
    // }
    headers: {'User-Token': token}
  })

  return Promise.all([getTags, getCategories])
    .then(res => {
      const [tagsRes, categoriesRes] = res
      const tags = tagsRes.data.data.tags
      const categories = categoriesRes.data.data.categories
      dispatch(successGetTagsAndCategories(tags, categories))
      return 'success'
    })
    .catch(error => {
      // console.log(error)
      console.log(error.response)
      dispatch(failureGetTagsAndCategories())
      return 'failure'
    })
}

// 发布新博客

const requestCreateBlog = blog => (dispatch, getState) => {
  // 发送获取请求
  const token = getState().auth.token
  //const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJleHAiOjE1NTcyMTQ4MjEsIm5iZiI6MTU1NjM1MDgyMSwidHRsIjo4NjQwMDAsImlhdCI6MTU1NjM1MDgyMSwiZGF0YSI6eyJ1c2VySWQiOjEsIm5pY2tuYW1lIjoibWluZyJ9LCJmb3JtYXQiOiJ1dGMifQ.d41nTIcs1wCrjauSHhEzjQY7c1xulndFZFLa2BvbU6jS4_f0GqEI6YPtB42pr90kq_XctYi8p6dpTadLw16C0Q'

  return axios
    .post(`${adminAPIPrefix}/articles`, {
      //token,
      ...blog
    },{headers: {'User-Token': token}}
    )
    .then(response => {
      return 'success'
    })
    .catch(error => {
      console.log(error.response)
      return 'failure'
    })
}

export { requestGetTagsAndCategories, requestCreateBlog }
