<template>
	<view>
		<view class="serach-input">
			<view class="serach-title">
				<view><input type="text" v-model="val" placeholder="搜索房间/主播/分类" /></view>
				<view class="serach-click" @click="serachName(val)">搜索</view>
			</view>
		</view>
	</view>
</template>

<script>
	import mixins from '@/mixins/myMixins'
	export default {
		name:'serach-input',
		props: {},
		mixins:[mixins],
		data() {
			return {
			};
		},
		created() {
			if(this.$localstorageFactory.get('serach_val')){
				this.val = this.$localstorageFactory.get('serach_val')
			}
		},
		methods:{
			serachName(input){
				this.$emit('serachName',input)
			}
		}
	}
</script>

<style lang="scss" scoped>
.serach-title {
		display: flex;
		display: -webkit-flex;
		justify-content: space-between;
		align-items: center;
		margin: 15upx 0;
		position: fixed;
		top: -15upx;
		/* #ifdef APP-PLUS */
		padding-top: 50upx;
		/* #endif */
		height: 80upx;
		background: #FFF;
		z-index: 100;
		width: calc(100% - 15px);
		view:nth-of-type(1) {
			padding: 5upx 20upx;
			background: #f8f8f8;
			flex: 1;
		}
		.serach-click{
			width: 70upx;
			margin-left: 20upx;
			font-size: $uni-font-size-base !important;
			color: red                                            ;
		}
	}
</style>
