// axios的封装
import http from './http' 
//登录
export const login = data => http.PostAxios(`/user/login`,data);
//注册
export const regist = data => http.PostAxios(`/user/register`,data);
//首页banner
const banner = data => http.GetAxios(`/banner/json`,data);
//置顶文章
const articleTopList = data => http.GetAxios(`/article/top/json`,data);
//最新博文
const articleList = data => http.GetAxios(`/article/list/${data.page}/json`); 
//点击添加收藏
const collectItem = data => http.PostAxios(`/lg/collect/${data.id}/json`); 
//项目分类 列表
export const productTree = data => http.GetAxios(`/project/tree/json`,data); 
//项目列表 数据
export const productList = data => http.GetAxios(`/project/list/${data.page}/json`,data);
//广场列表数据
export const user_article = data => http.GetAxios(`/user_article/list/${data.page}/json`,data)
//体系的列表
export const square_tree = data => http.GetAxios(`/tree/json`,data);
//体系的 对应列表数据
export const square_list = data => http.GetAxios(`/article/list/${data.page}/json`,data);
//导航的数据 
export const navi_list = data => http.GetAxios(`/navi/json`,data);
export default {
   banner, articleTopList, articleList,collectItem
}
