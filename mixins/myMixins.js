/*
 * @Descripttion: your project
 * @version: 1.0
 * @Author: Liu_Pan
 * @Date: 2021-01-06 16:54:57
 * @LastEditors: Liu_Pan
 * @LastEditTime: 2021-01-19 09:58:20
 */
export default {
	data() {
		return {
			val: '', //搜索插件input值
			loading: false,// 是否正在加载1
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
