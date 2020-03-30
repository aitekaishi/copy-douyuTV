import ajax from './api'
import CommonUtils from '@/common/common.js'
let url = 'https://m.douyu.com/'
// #ifdef H5
url = '/api'
// #endif

export default {
	//获取swiperList
    getSwiperList (success, fail, error) {
		ajax.get(`${url}/api/cate/recList?cid=&ct=`,'application/json', null, success, fail, error)
    },
	//获取推荐分类
	getRecommendList (success, fail, error) {
		ajax.get(`${url}/api/home/mix`,'application/json', null, success, fail, error)
	},
	//获取分类详情
	getListDetail (listParams,success, fail, error) {
		ajax.get(`${url}/api/room/list${CommonUtils.json2url(listParams)}`,'application/json', null, success, fail, error)
	},
	//获取热门搜索列表
	getTodayTop (success, fail, error) {
		ajax.get(`${url}/api/search/getTodayTop?count=10&isAjax=1`,'application/json', null, success, fail, error)
	},
	//搜索全部
	getMulti (body,success, fail, error) {
		ajax.post(`${url}/api/search/multi`,'application/json', body, success, fail, error)
	},
	//搜索主播
	getAnchor (body,success, fail, error) {
		ajax.post(`${url}/api/search/anchor`,'application/json', body, success, fail, error)
	},
	//搜索直播间
	getLiveRoom (body,success, fail, error) {
		ajax.post(`${url}/api/search/liveRoom`,'application/json', body, success, fail, error)
	},
	//搜索视频
	getVideo (body,success, fail, error) {
		ajax.post(`${url}/api/search/video`,'application/json', body, success, fail, error)
	},
	//搜索分类列表
	getCateList (success, fail, error) {
		ajax.get(`${url}/api/cate/list`,'application/json', null, success, fail, error)
	},
	//直播接口
	getLive (body,success, fail, error) {
		ajax.post(`${url}/api/room/ratestream`,'application/x-www-form-urlencoded', body, success, fail, error)
	},
}
