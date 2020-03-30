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
		}
	}
}
