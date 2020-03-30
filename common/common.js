export default {
	isEmpty: value => {
	  return value === null || value === undefined || value === ''
	},
	json2url: obj => {
	  let arr = []
	  for (let key in obj) {
	    if (obj[key]) {
	      arr.push(key + '=' + encodeURI(obj[key]))
	    }
	  }
	  return (arr.length ? '?' : '') + arr.join('&')
	},
	//路由跳转
	navigateTo: url => {
		uni.navigateTo({
			url: url
		})
	},
	//返回上一级
	navigateBack:()=>{
		uni.navigateBack({
			delta:1
		})
	},
	//Tab跳转
	switchTab: url => {
		uni.switchTab({
			url: url
		});
	},
	//倒计时
	countDown: (time, endTime) => {
		let timer = setInterval(() => {
			let newDate = new Date(endTime) - new Date()
			if (newDate <= 0) {
				time = '00:00:00'
				clearInterval(timer)
			}
			let hours = Math.floor(newDate / 1000 / 60 / 60) > 9 ? Math.floor(newDate / 1000 / 60 / 60) : '0' + Math.floor(
				newDate / 1000 / 60 / 60);
			let minutes = Math.floor(newDate / 1000 / 60) - hours * 60 > 9 ? Math.floor(newDate / 1000 / 60) - hours * 60 :
				'0' + Math.floor(newDate / 1000 / 60) - hours * 60;
			let seconds = Math.floor(newDate / 1000) - hours * 3600 - minutes * 60 > 9 ? Math.floor(newDate / 1000) - hours *
				3600 - minutes * 60 : '0' + (Math.floor(newDate / 1000) - hours * 3600 - minutes * 60);
			time = `${hours}:${minutes}:${seconds}`;
		}, 1000);
	}
}
