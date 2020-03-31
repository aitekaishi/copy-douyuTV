<template>
	<view class="serach">
		<serach-input @serachName='serachName()'></serach-input>
		<view class="serach-center">
			<view class="title">近期热搜</view>
			<view class="list">
				<view class="list-left">
					<view class="list-view" v-for="(item, index) in todayTopListTop" @click="serachName(item)" :key="index">
						<view :class="[index == 0 ? 'one' : index == 1 ? 'two' : index == 2 ? 'three' : 'other']">{{ index + 1 }}</view>
						<view>{{ item }}</view>
					</view>
				</view>
				<view class="list-right">
					<view class="list-view" v-for="(item, index) in todayTopListBottom" @click="serachName(item)" :key="index">
						<view class="other">{{ index + 6 }}</view>
						<view>{{ item }}</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import { buziAPI } from '@/api';
import serachInput from '@/components/serach-input/serach-input';
import mixins from '@/mixins/myMixins'
export default {
	data() {
		return {
			todayTopListTop: [],
			todayTopListBottom: []
		};
	},
	components:{
		serachInput
	},
	mixins:[mixins],
	onLoad() {
		let that = this;
		that.$localstorageFactory.set('activeIndex',0)
		buziAPI.getTodayTop(res => {
			that.todayTopListTop = res.data.slice(0, 5);
			that.todayTopListBottom = res.data.slice(5, 10);
		});
	},
	methods: {
		
	}
};
</script>

<style lang="scss" scoped>
@import '../../uni.scss';
.serach {
	padding: 20upx;
	/* #ifndef MP-WEIXIN */
	padding-top: 60upx;
	/* #endif */
	.serach-center{
		margin-top: 60upx;
	}
	.title {
		font-weight: 600;
		font-size: $uni-font-size-base;
		margin: 25upx 0;
	}
	.list {
		@include flex(space-between);
		.list-left,
		.list-right {
			flex: 1;
			.list-view {
				margin: 0 0 30upx 0;
				font-size: $uni-font-size-base;
				@include flex();
				view:nth-of-type(1) {
					font-size: $uni-font-size-sm;
					margin-right: 10upx;
					@include wh(30upx, 30upx);
					@include flex(center);
				}
				.one,
				.two,
				.three {
					color: #fff;
				}
				.one {
					background: #ff0528;
				}
				.two {
					background: #ff6f19;
				}
				.three {
					background: #ffac00;
				}
				.other {
					background: #f8f8f8;
					color: #a2a2a2;
				}
			}
		}
	}
}
</style>
