// localStorage工具类封装
export default {
  set: function (key, obj) {
    uni.setStorageSync(key, JSON.stringify(obj))
  },
  get: function (key) {
    //return !uni.getStorageSync(key) || uni.getStorageSync(key) === 'undefined' ? undefined : JSON.parse(uni.getStorageSync(key))
	return !uni.getStorageSync(key) || uni.getStorageSync(key) === 'undefined' ? undefined : JSON.parse(uni.getStorageSync(key))
  },
  remove: function (key) {
    uni.removeStorageSync(key)
  }
}
