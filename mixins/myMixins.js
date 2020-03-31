export default {
	data() {
		return {
			val: '', //搜索插件input值
			loading: false,//是否正在加载
		}

	},
	watch: {
		val(newVal, oldVal) {
			console.log(newVal)
		}
	},
	methods: {
		//搜索主播
		serachName(item) {
			this.$localstorageFactory.set('serach_val', item)
			this.$common.navigateTo('../anchor/anchor?name=' + item)
		},
		toVideo(item){
			uni.showLoading({
				title:'加载中...',
				mask:true
			})
			this.$common.navigateTo('../video/video?roomId='+item.rid)
		},
		//占位图
		placeholderChart(imgSrc) {
			console.log(imgSrc)
			let src = imgSrc;
			// #ifdef H5
			src = imgSrc.replace('https://rpic.douyucdn.cn/', '/rpic/')
			// #endif
			imgSrc = 'https://shark2.douyucdn.cn/front-publish/m-douyu-v3-master/assets/images/list-item-def-thumb_b10bbe8.png';
			uni.request({
				url: src,
				responseType: 'arraybuffer',
				success: res => {
					imgSrc = 'data:image/jpeg;base64,' + uni.arrayBufferToBase64(res.data);
				}
			});
		}
	}
}
