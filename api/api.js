function axiosApi(method, header, url, params, success, fail, error) {
	uni.showLoading({
		title:'加载中...',
		mask:true
	})
	uni.request({
		url: url,
		method: method,
		header: {
			'Content-Type': header
		},
		data: params,
		success: (res) => {
			uni.hideLoading()
			success(res.data)
		},
		fail(res) {
			fail(res.data)
		}
	})
}
// 提供再次封装的GET、POST、PUT、DELETE方法
export default {
	get: (url,header, params, success, fail, error) => {
		return axiosApi('GET',header, url, params, success, fail, error)
	},
	post: (url,header, params, success, fail, error) => {
		return axiosApi('POST',header, url, params, success, fail, error)
	},
	put: (url,header, params, success, fail, error) => {
		return axiosApi('PUT',header, url, params, success, fail, error)
	},
	delete: (url,header, params, success, fail, error) => {
		return axiosApi('DELETE',header, url, params, success, fail, error)
	}
}
