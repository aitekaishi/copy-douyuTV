<template>
	<view>
		 <web-view :src="src"></web-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				src:''
			};
		},
		onLoad(option) {
			uni.hideLoading()
			if(this.$localstorageFactory.get('download')){
				this.src = 'https://www.douyu.com/client/mobile'
				return
			}
			this.src = 'https://m.douyu.com/'+option.roomId
		}
	}
</script>

<style lang="scss">

</style>
