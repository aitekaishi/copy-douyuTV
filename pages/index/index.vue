<template>
	<view class="index">
		<view class="index-header">
			<view class="index-title">
				<view @click="$common.navigateTo('../index/index')" class="img">
					<image lazy-load src="https://shark2.douyucdn.cn/front-publish/m-douyu-v3-master/assets/images/logo_864f3ef.png" mode="widthFix"></image>
				</view>
				<view @click="toSerach()" class="input"><input type="text" v-model="serachVal" placeholder="搜索" /></view>
				<!-- <view class="pay">充值</view>
				<view class="open-app">打开APP</view> -->
			</view>
			<view class="index-swiper">
				<view class="index-swiper-left">
					<s-tabs effect activeColor="#FF5D23" lineColor="#FF5D23" v-model="activeTab" slot-title @change="swiperChange">
						<s-tab v-if="swiperList.length">推荐</s-tab>
						<s-tab v-for="(item, index) in swiperList" :key="index">{{ item.name }}</s-tab>
					</s-tabs>
				</view>
				<view @click="catePopup" class="index-swiper-right">
					<image lazy-load src="https://shark2.douyucdn.cn/front-publish/m-douyu-v3-master/assets/images/category_0148919.png" mode="widthFix"></image>
				</view>
			</view>
		</view>
		<view class="space"></view>
		<view class="index-swiper-center">
			<view v-if="activeTab == 0" v-for="(item, index) in recommendList" :key="index">
				<view class="index-swiper-center-title">
					<view class="index-swiper-center-title-left">
						<view><image lazy-load :src="item.icon" mode="widthFix"></image></view>
						<view>{{ item.tabName }}</view>
						<view @click="checkTab(item)">{{ item.tabName }}</view>
					</view>
					<view @click="checkTab(item)" class="index-swiper-center-title-right">
						<view>更多</view>
						<view></view>
					</view>
				</view>
				<view class="index-swiper-center-center">
					<view class="list" v-for="(subItem, subIndex) in item.list" @click="toVideo(subItem)" :key="subIndex">
						<view class="hot">
							<image lazy-load src="https://shark2.douyucdn.cn/front-publish/m-douyu-v3-master/assets/images/hotnum_6b05e5d.png" mode="widthFix"></image>
							<text>{{ subItem.hn }}</text>
						</view>
						<view class="room-src"><image lazy-load :src="subItem.roomSrc" mode="widthFix"></image></view>
						<view class="nick-name">
							<image lazy-load src="https://shark2.douyucdn.cn/front-publish/m-douyu-v3-master/assets/images/iconfont-wo_fdcada2.png" mode="widthFix"></image>
							<text>{{ subItem.nickname }}</text>
						</view>
						<view class="room-name">{{ subItem.roomName }}</view>
					</view>
				</view>
			</view>
			<view v-if="activeTab == 0 && recommendList.length">
				<view @click="toTopClick" class="back-top">
					<view></view>
					返回顶部
				</view>
				<view @click="downloadApp()" class="download-app">下载客户端</view>
				<view class="footer">客服热线：027-87750710</view>
				<view class="footer">武汉斗鱼网络科技有限公司</view>
				<view class="footer">湖北省武汉市东湖开发区光谷软件园F4栋8楼</view>
				<view class="footer">版权所有 © www.douyu.com 鄂ICP备15011961号-1</view>
			</view>
			<view v-if="activeTab != 0">
				<view class="no-first-title">
					<image lazy-load src="https://shark2.douyucdn.cn/front-publish/m-douyu-v3-master/assets/images/icon_play_e54a507.png" mode="widthFix"></image>
					<text>{{ name }}</text>
				</view>
				<view class="index-swiper-center-center">
					<view class="list" v-for="(item, index) in otherList" @click="toVideo(item)" :key="index">
						<view class="hot">
							<image lazy-load src="https://shark2.douyucdn.cn/front-publish/m-douyu-v3-master/assets/images/hotnum_6b05e5d.png" mode="widthFix"></image>
							<text>{{ item.hn }}</text>
						</view>
						<view class="room-src"><image lazy-load :src="item.roomSrc" mode="widthFix"></image></view>
						<view class="nick-name">
							<image lazy-load src="https://shark2.douyucdn.cn/front-publish/m-douyu-v3-master/assets/images/iconfont-wo_fdcada2.png" mode="widthFix"></image>
							<text>{{ item.nickname }}</text>
						</view>
						<view class="room-name">{{ item.roomName }}</view>
					</view>
				</view>
				<view v-if="loading" class="loading-more">
					<image lazy-load src="https://shark2.douyucdn.cn/front-publish/m-douyu-v3-master/assets/images/loading_9015c6d.gif" mode="widthFix"></image>
				</view>
			</view>
			<uni-popup ref="popup" type="top">
				<view class="popup-center">
					<view class="popup-title">
						<view @click="$refs.popup.close()"><uni-icons type="closeempty" size="40"></uni-icons></view>
						<view>选择分类</view>
					</view>
					<view class="popup-tab">
						<view v-if="popupLoading" class="loading-more">
							<image lazy-load src="https://shark2.douyucdn.cn/front-publish/m-douyu-v3-master/assets/images/loading_9015c6d.gif" mode="widthFix"></image>
						</view>
						<s-tabs effect activeColor="#FF5D23" lineColor="#FF5D23" v-model="popupActiveTab" slot-title>
							<s-tab v-if="!popupLoading">全部</s-tab>
							<s-tab @click.native="popupSwiperChange(item)" v-for="(item, index) in popopSwiperObj.cate1Info" :key="index">{{ item.cate1Name }}</s-tab>
						</s-tabs>
					</view>
					<view class="popup-swiper">
						<view class="uni-grid">
							<view
								class="uni-grid-item"
								:class="[(index + 1) % 3 == 0 ? 'uni-grid-item-end' : '']"
								v-for="(item, index) in cate2InfoList"
								@click="toIndexClick(item)"
								:key="index"
							>
								<image lazy-load :src="item.icon" mode="widthFix"></image>
								<view class="text">{{ item.cate2Name }}</view>
							</view>
						</view>
					</view>
				</view>
			</uni-popup>
		</view>
	</view>
</template>

<script>
import { buziAPI } from '@/api';
import sTabs from '@/components/s-tabs';
import sTab from '@/components/s-tab';
import uniIcons from '@/components/uni-icons/uni-icons.vue';
import uniPopup from '@/components/uni-popup/uni-popup.vue';
import mixins from '@/mixins/myMixins';
import uniGrid from '@/components/uni-grid/uni-grid.vue';
import uniGridItem from '@/components/uni-grid-item/uni-grid-item.vue';
export default {
	data() {
		return {
			serachVal: '', //搜索值
			activeTab: 0, //swiper index
			swiperList: [], //swiper数据
			recommendList: [], //推荐列表
			pageCount: 0, //其他分类分页页数
			otherList: [], //其他分类
			index: 1, //当前页数
			shortName: '', //当前分类简称
			name: '', //当前分类名称
			popupLoading: false, //popup的加载
			popupActiveTab: 0, //popup swiper index
			popopSwiperObj: {}, //popup swiper数据
			cate2InfoList: [] //二级分类数据
		};
	},
	components: {
		sTabs,
		sTab,
		uniPopup,
		uniIcons,
		uniGrid,
		uniGridItem
	},
	watch: {
		activeTab(newVal, oldVal) {}
	},
	mixins: [mixins],
	async onLoad(options) {
		if (!options.shortName) {
			this.getRecommendList();
		}
		await this.getSwiperList();
		if (options.shortName) {
			this.shortName = options.shortName;
			this.getListDetail(this.index, this.shortName);
			for (let i = 0; i < this.swiperList.length; i++) {
				if (this.swiperList[i].shortName == options.shortName) {
					this.activeTab = i + 1;
				}
			}
		}
	},
	//上拉加载更多
	async onReachBottom() {
		if (this.activeTab != 0) {
			if (this.pageCount > 2 && this.pageCount > this.index) {
				this.loading = true;
				this.index++;
				await this.getListDetail(this.index, this.shortName);
				this.loading = false;
			}
		}
	},
	methods: {
		//获取分类列表
		getSwiperList() {
			let that = this;
			return new Promise(function(resolve, reject) {
				buziAPI.getSwiperList(res => {
					that.swiperList = res.data;
					resolve();
				});
			});
		},
		//获取分类内容
		getRecommendList () {
			let that = this;
			buziAPI.getRecommendList(res => {
				that.recommendList = res.data;
				for (let i = 0; i < that.recommendList.length; i++) {
					for (let j = 0; j < that.recommendList[i].list.length; j++) {
						that.$common.placeholderChart(that.recommendList[i].list[j],'roomSrc')
					}
				}
			});
		},
		//获取分类详情
		getListDetail(page, type) {
			let that = this;
			return new Promise(function(resolve, reject) {
				buziAPI.getListDetail({ page, type }, res => {
					that.otherList = [...that.otherList, ...res.data.list];
					that.pageCount = res.data.pageCount;
					for (let j = (page - 1) * 8; j < that.otherList.length; j++) {
						that.$common.placeholderChart(that.otherList[j],'roomSrc')
					}
					resolve();
				});
			});
		},
		//activeTab改变
		async swiperChange(index) {
			if (index != 0) {
				this.otherList = [];
				this.index = 1;
				this.shortName = this.swiperList[index - 1].shortName;
				this.name = this.swiperList[index - 1].name;
				await this.getListDetail(this.index, this.shortName);
				if (this.pageCount > 1) {
					this.index++;
					this.getListDetail(this.index, this.shortName);
				}
			} else {
				this.recommendList = [];
				this.getRecommendList();
			}
		},
		//选择swiper
		checkTab(item) {
			for (let i = 0; i < this.swiperList.length; i++) {
				if (this.swiperList[i].name == item.tabName) {
					this.swiperChange(i + 1);
					this.activeTab = i + 1;
				}
			}
		},
		//返回顶部
		toTopClick() {
			uni.pageScrollTo({
				scrollTop: 0,
				duration: 300
			});
		},
		//分类popup显示
		catePopup() {
			let that = this;
			that.$refs.popup.open();
			if (!that.popopSwiperObj.cate1Info) {
				that.popupLoading = true;
				buziAPI.getCateList(res => {
					that.popupLoading = false;
					that.popopSwiperObj = res.data;
					that.cate2InfoList = that.popopSwiperObj.cate2Info;
				});
			}
		},
		//popup swiper切换
		popupSwiperChange(item) {
			let arr = [];
			for (let i = 0; i < this.popopSwiperObj.cate2Info.length; i++) {
				if (item.cate1Id == this.popopSwiperObj.cate2Info[i].cate1Id) {
					arr.push(this.popopSwiperObj.cate2Info[i]);
				}
			}
			this.cate2InfoList = arr;
		},
		toIndexClick(item) {
			this.otherList = [];
			this.index = 1;
			this.activeTab = -1;
			for (var i = 0; i < this.swiperList.length; i++) {
				if (item.shortName == this.swiperList[i].shortName) {
					this.activeTab = i + 1;
				}
			}
			this.name = item.cate2Name;
			this.shortName = item.shortName;
			this.getListDetail(this.index, this.shortName);
			this.$refs.popup.close();
		},
		downloadApp() {
			this.$localstorageFactory.set('download', true);
			this.$common.navigateTo('../video/video');
		},
		toSerach(){
			this.$common.navigateTo('../serach/serach')
			this.$localstorageFactory.remove('serach_val')
		}
	}
};
</script>

<style lang="scss" scoped>
@import '../../uni.scss';
.index {
	padding: 10upx;
	.popup-center {
		background: #fff;
		/* #ifndef MP-WEIXIN */
		padding-top: 110upx;
		/* #endif */
		.popup-title {
			@include flex(center);
			background: #fff;
			view:nth-of-type(1) {
				z-index: 10;
			}
			view:nth-of-type(2) {
				flex: 1;
				text-align: center;
				@include relative(0, 0, 0, -30upx);
			}
		}
		.popup-tab {
			background: #fff;
		}
		.popup-swiper {
			background: #fff;
			max-height: 70vh;
			overflow-y: scroll;
			.uni-grid {
				// @include flex(space-between);
				background: $uni-bg-color-grey;
				.uni-grid-item {
					text-align: center;
					@include wh(33vw, 33vw);
					display: inline-block;
					border-bottom: 1upx dashed $uni-bg-color-main;
					border-right: 1upx dashed $uni-bg-color-main;
					image {
						margin-top: 50upx;
						@include wh(50%, 50%);
						@include borderRadius(50%);
					}
					.text {
						font-size: $uni-font-size-sm;
						margin-bottom: 20upx;
					}
				}
				.uni-grid-item-end {
					border-right: none;
				}
			}
		}
	}
	.index-header {
		position: fixed;
		top: 0;
		/* #ifdef APP-PLUS */
		padding-top: 60upx;
		/* #endif */
		background: #fff;
		z-index: 100;
		.index-title {
			@include flex();
			height: 80upx;
			font-size: $uni-font-size-sm;
			view {
				margin: 0 10upx;
				@include flex();
			}
			image {
				@include wh(140upx, 80upx);
			}
			.input {
				flex: 1;
				background: #f2f2f2;
				height: 60upx;
				padding: 0 30upx;
				margin-right: 60upx;
				@include borderRadius(50upx);
			}
			.pay,
			.open-app {
				@include borderRadius(50upx);
				@include flex(center);
				height: 50upx;
			}
			.pay {
				width: 15vw;
				border: 1upx solid $uni-border-color;
			}
			.open-app {
				width: 20vw;
				color: #fff;
				background: $douyu-bg-color;
			}
		}
		.index-swiper {
			@include flex();
			.index-swiper-left {
				width: 85vw;
			}
			.index-swiper-right {
				image {
					@include wh(15vw, 15vw);
				}
			}
		}
	}
	.space {
		height: 200upx;
		/* #ifndef MP-WEIXIN */
		height: 260upx;
		/* #endif */
	}
	.index-swiper-center {
		.index-swiper-center-title {
			margin: 10upx 0;
			@include flex(space-between);
			.index-swiper-center-title-left,
			.index-swiper-center-title-right {
				@include flex();
				view {
					margin-right: 20upx;
				}
				image {
					@include wh(35upx, 35upx);
				}
			}
			.index-swiper-center-title-left {
				view:nth-of-type(2) {
					@include relative(-5upx);
				}
				view:nth-of-type(3) {
					@include relative(-3upx);
					@include sc($uni-font-size-sm, $douyu-bg-color);
					border: 1upx solid $douyu-bg-color;
					@include borderRadius(50upx);
					padding: 0 10upx;
				}
			}
			.index-swiper-center-title-right {
				view:nth-of-type(1) {
					@include relative(-3upx, -20upx);
					@include sc($uni-font-size-sm, $uni-text-color-disable);
				}
				view:nth-of-type(2) {
					@include background-image-position(
						'https://shark2.douyucdn.cn/front-publish/m-douyu-v3-master/assets/images/icon-v2_ed53f03.png',
						-88upx,
						0,
						60upx,
						60upx,
						0.7
					);
				}
			}
		}
		.no-first-title {
			@include flex();
			margin: 20upx 0;
			image {
				@include wh(35upx, 30upx) margin-right: 20upx;
			}
			text {
				font-size: $uni-font-size-base;
			}
		}
	}
	.back-top {
		@include flex(center);
		view {
			@include background-image-position('https://shark2.douyucdn.cn/front-publish/m-douyu-v3-master/assets/images/icon-v2_ed53f03.png', -790upx, 0, 60upx, 60upx, 0.7);
		}
	}
	.download-app {
		background-color: $douyu-bg-color;
		width: 80vw;
		margin: 30upx auto;
		padding: 20upx;
		text-align: center;
		@include sc($uni-font-size-base, #fff);
		@include borderRadius($uni-border-radius-base);
	}
	.footer {
		text-align: center;
		@include sc($uni-font-size-sm, $uni-text-color-disable);
	}
}
</style>
