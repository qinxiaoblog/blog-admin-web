import menus from './menus'

const domainSubDir = '/admin'
const APIPrefix ='http://10.100.0.6:8000/api/v1/user'
const adminAPIPrefix = 'http://10.100.0.6:8000/api/v1/admin'
const commonAPIPrefix = 'http://10.100.0.6:8000/api/v1/admin'
const blogListPerPageCount = 5
const blogPagePrefix = '/blogs'
const blogListQs =
  'embed=tags,categories&fields=_id,title,summary,createTime,viewTimes,tags,category,markdownContent'

export {
  menus,
  domainSubDir,
  adminAPIPrefix,
  commonAPIPrefix,
  blogListPerPageCount,
  blogPagePrefix,
  blogListQs,
  APIPrefix
}
