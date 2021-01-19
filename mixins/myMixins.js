export default {
	data() {
		return {
			val: '', //搜索插件input值
			loading: false,// 是否正在加载吗
		}

	},
	watch: {
		val(newVal, oldVal) {
			this.$localstorageFactory.set('serach_val', newVal)
		}
	},
	onPullDownRefresh() {
		setTimeout(function() {
			uni.stopPullDownRefresh();
			uni.showToast({
				title:'加载完成',
				icon:'none'
				
			})
		}, 1000);
	},
	methods: {
		//搜索主播
		serachName(item) {
			if(item){
				this.$localstorageFactory.set('serach_val', item)
			}
			this.$common.navigateTo('../anchor/anchor?name=' +this.$localstorageFactory.get('serach_val'))
		},
		toVideo(item){
			uni.showLoading({
				title:'加载中...',
				mask:true
			})
			this.$common.navigateTo('../video/video?roomId='+item.rid)
		},
		
	}
}
