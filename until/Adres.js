import http from './http' // axios的封装
//置顶文章
const articleTopList = data => http.GetAxios("/article/top/json");
//最新博文
const articleList = data => http.GetAxios("/article/list/1/json");
export default {
  articleTopList,
  articleList,
}
