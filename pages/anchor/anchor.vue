<template>
	<view class="anchor">
		<serach-input @serachName="serachName()"></serach-input>
		<view class="weui-tab">
			<view class="weui-navbar">
				<block v-for="(item, index) in tabs" :key="index">
					<view :id="index" :class="{ actived: activeIndex == index }" class="tab-item" @click="tabClick(index)">
						<view class="weui-navbar__title">{{ item }}</view>
					</view>
				</block>
			</view>
			<view class="spance"></view>
			<view class="weui-tab__panel">
				<view class="weui-tab__content" :hidden="activeIndex != 0">
					<view class="list-title">
						<view v-if="multiData.anchor[0].official && !multiData.cate.length" class="list">
							<view class="hot">
								<image src="https://shark2.douyucdn.cn/front-publish/m-douyu-v3-master/assets/images/hotnum_6b05e5d.png" mode="widthFix"></image>
								<text>{{ multiData.anchor[0].hn }}</text>
							</view>
							<view class="room-src" @click="toVideo(multiData.anchor[0].roomId)">
								<image
									:src="
										multiData.anchor[0].roomSrc
											? multiData.anchor[0].roomSrc
											: 'https://shark2.douyucdn.cn/front-publish/m-douyu-v3-master/assets/images/list-item-def-thumb_b10bbe8.png'
									"
									mode="widthFix"
								></image>
							</view>
							<view class="nick-name">
								<image src="https://shark2.douyucdn.cn/front-publish/m-douyu-v3-master/assets/images/iconfont-wo_fdcada2.png" mode="widthFix"></image>
								<text>{{ multiData.anchor[0].nickname }}</text>
							</view>
							<view class="room-classify">
								<view class="room-name">{{ multiData.anchor[0].roomName }}</view>
								<view class="classify">
									分类：
									<text>{{ multiData.anchor[0].cateName }}</text>
								</view>
							</view>
							<view v-if="multiData.anchor[0].vipId" class="vip-id">房间靓号：{{ multiData.anchor[0].vipId }}</view>
							<view v-if="!multiData.anchor[0].vipId" class="vip-id">房间ID：{{ multiData.anchor[0].roomId }}</view>
						</view>
					</view>
					<view v-if="multiData.cate.length">
						<view class="more">
							<view class="left">
								<view></view>
								<view>分类</view>
							</view>
						</view>
						<view class="cate-list">
							<view class="cate-item" v-for="(item, index) in multiData.cate" @click="toIndex(item)" :key="index">
								<image :src="item.smallIconUrl" mode="widthFix"></image>
								<view>{{ item.tagName }}</view>
							</view>
						</view>
					</view>
					<view>
						<view class="more">
							<view class="left">
								<view></view>
								<view>主播</view>
							</view>
							<view class="right">
								<view>更多</view>
								<view></view>
							</view>
						</view>
						<uni-grid :column="4" :show-border="false" :square="false">
							<uni-grid-item class="uni-grid" v-for="(item, index) in multiData.anchor" :key="index">
								<view v-if="!item.isVertical" :style="{ opacity: item.isLive }" class="is-live">
									<image src="https://shark2.douyucdn.cn/front-publish/m-douyu-v3-master/assets/images/playing_9f3b01a.png" mode="widthFix"></image>
								</view>
								<view v-if="item.isVertical" :style="{ opacity: item.isLive }" class="is-live">
									<image src="https://shark2.douyucdn.cn/front-publish/m-douyu-v3-master/assets/images/e-playing_ade1373.png" mode="widthFix"></image>
								</view>
								<view class="img"><image :src="item.avatar" mode="widthFix"></image></view>
								<view class="text">{{ item.nickname }}</view>
							</uni-grid-item>
						</uni-grid>
					</view>
					<view>
						<view class="more">
							<view class="left">
								<view></view>
								<view>直播</view>
							</view>
							<view class="right">
								<view>更多</view>
								<view></view>
							</view>
						</view>
						<view class="index-swiper-center-center">
							<view class="list" v-for="(item, index) in multiData.room" @click="toVideo(item)" :key="index">
								<view v-if="!item.isVertical" :style="{ opacity: item.isLive }" class="is-live">
									<image src="https://shark2.douyucdn.cn/front-publish/m-douyu-v3-master/assets/images/playing_9f3b01a.png" mode="widthFix"></image>
								</view>
								<view v-if="item.isVertical" :style="{ opacity: item.isLive }" class="is-live">
									<image src="https://shark2.douyucdn.cn/front-publish/m-douyu-v3-master/assets/images/e-playing_ade1373.png" mode="widthFix"></image>
								</view>
								<view class="hot">
									<image src="https://shark2.douyucdn.cn/front-publish/m-douyu-v3-master/assets/images/hotnum_6b05e5d.png" mode="widthFix"></image>
									<text>{{ item.hn }}</text>
								</view>
								<view class="room-src">
									<image
										:src="
											item.roomSrc ? item.roomSrc : 'https://shark2.douyucdn.cn/front-publish/m-douyu-v3-master/assets/images/list-item-def-thumb_b10bbe8.png'
										"
										mode="widthFix"
									></image>
								</view>
								<view class="nick-name">
									<image src="https://shark2.douyucdn.cn/front-publish/m-douyu-v3-master/assets/images/iconfont-wo_fdcada2.png" mode="widthFix"></image>
									<text>{{ item.nickname }}</text>
								</view>
								<view class="room-name">{{ item.roomName }}</view>
							</view>
						</view>
					</view>
					<view>
						<view class="more">
							<view class="left">
								<view></view>
								<view>视频</view>
							</view>
							<view class="right">
								<view>更多</view>
								<view></view>
							</view>
						</view>
						<view class="index-swiper-center-center">
							<view class="list" v-for="(item, index) in multiData.video" @click="toVideo(item)" :key="index">
								<view class="room-src">
									<image
										:src="
											item.videoPic
												? item.videoPic
												: 'https://shark2.douyucdn.cn/front-publish/m-douyu-v3-master/assets/images/list-item-def-thumb_b10bbe8.png'
										"
										mode="widthFix"
									></image>
								</view>
								<view class="video">
									<view class="nick-name">
										<text>{{ item.nickname }}</text>
									</view>
									<view class="video-time">
										<text>{{ item.videoDuration | secsToMinSecs }}</text>
									</view>
								</view>
								<view class="room-name">{{ item.title }}</view>
							</view>
						</view>
					</view>
				</view>
				<view class="weui-tab__content" :hidden="activeIndex != 1">
					<view class="line"></view>
					<view v-for="(item, index) in anchorData" :key="index">
						<view class="anchor-list">
							<view class="anchor-list-left">
								<view><image :src="item.avatar" mode="widthFix"></image></view>
								<view class="name">
									<view>{{ item.nickname }}</view>
									<view>热度：{{ item.hn }}</view>
								</view>
							</view>
							<view v-if="item.isLive" class="anchor-list-right">
								<image src="https://shark2.douyucdn.cn/front-publish/m-douyu-v3-master/assets/images/belive_7e2b0eb.png" mode="widthFix"></image>
							</view>
						</view>
						<view class="line"></view>
					</view>
				</view>
				<view class="weui-tab__content" :hidden="activeIndex != 2">
					<view class="index-swiper-center-center">
						<view class="list" v-for="(item, index) in liveRoomData" @click="toVideo(item)" :key="index">
							<view v-if="!item.isVertical" :style="{ opacity: item.isLive }" class="is-live">
								<image src="https://shark2.douyucdn.cn/front-publish/m-douyu-v3-master/assets/images/playing_9f3b01a.png" mode="widthFix"></image>
							</view>
							<view v-if="item.isVertical" :style="{ opacity: item.isLive }" class="is-live">
								<image src="https://shark2.douyucdn.cn/front-publish/m-douyu-v3-master/assets/images/e-playing_ade1373.png" mode="widthFix"></image>
							</view>
							<view class="hot">
								<image src="https://shark2.douyucdn.cn/front-publish/m-douyu-v3-master/assets/images/hotnum_6b05e5d.png" mode="widthFix"></image>
								<text>{{ item.hn }}</text>
							</view>
							<view class="room-src">
								<image
									:src="item.roomSrc ? item.roomSrc : 'https://shark2.douyucdn.cn/front-publish/m-douyu-v3-master/assets/images/list-item-def-thumb_b10bbe8.png'"
									mode="widthFix"
								></image>
							</view>
							<view class="nick-name">
								<image src="https://shark2.douyucdn.cn/front-publish/m-douyu-v3-master/assets/images/iconfont-wo_fdcada2.png" mode="widthFix"></image>
								<text>{{ item.nickname }}</text>
							</view>
							<view class="room-name">{{ item.roomName }}</view>
						</view>
					</view>
				</view>
				<view class="weui-tab__content" :hidden="activeIndex != 3">
					<view class="index-swiper-center-center">
						<view class="list" v-for="(item, index) in videoData" @click="toVideo(item)" :key="index">
							<view class="room-src">
								<image
									:src="
										item.videoPic
											? item.videoPic
											: 'https://shark2.douyucdn.cn/front-publish/m-douyu-v3-master/assets/images/list-item-def-thumb_b10bbe8.png'
									"
									mode="widthFix"
								></image>
							</view>
							<view class="video">
								<view class="nick-name">
									<text>{{ item.nickname }}</text>
								</view>
								<view class="video-time">
									<text>{{ item.videoDuration | secsToMinSecs }}</text>
								</view>
							</view>
							<view class="room-name">{{ item.title }}</view>
						</view>
					</view>
				</view>
				<view v-if="loading" class="loading-more">
					<image src="https://shark2.douyucdn.cn/front-publish/m-douyu-v3-master/assets/images/loading_9015c6d.gif" mode="widthFix"></image>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import uniGrid from '@/components/uni-grid/uni-grid.vue';
import uniGridItem from '@/components/uni-grid-item/uni-grid-item.vue';
import { buziAPI } from '@/api';
import serachInput from '@/components/serach-input/serach-input';
import mixins from '@/mixins/myMixins';
export default {
	components: {
		serachInput,
		uniGrid,
		uniGridItem
	},
	data() {
		return {
			multiData: {}, //全部数据
			anchorData: [], //主播数据
			liveRoomData: [], //直播间数据
			videoData:[],//视频数据
			tabs: ['全部', '主播', '直播', '视频'],
			activeIndex: 0
		};
	},
	mixins: [mixins],
	onLoad(options) {
		this.$localstorageFactory.set('sk',options.name)
		this.activeIndex = this.$localstorageFactory.get('activeIndex');
		this.tabClick(this.activeIndex);
	},
	//上拉加载更多
	async onReachBottom() {
		this.loading = false;
		if (this.activeIndex == 1) {
			if (this.anchorData.length == this.offset + 20) {
				this.loading = true;
				this.offset = this.offset + 20;
				await this.getAnchor(this.offset, 20);
			}
		}
		if (this.activeIndex == 2) {
			if (this.liveRoomData.length == this.offset + 20) {
				this.loading = true;
				this.offset = this.offset + 20;
				await this.getLiveRoom(this.offset, 20);
			}
		}
		if (this.activeIndex == 3) {
			if (this.videoData.length == this.offset + 20) {
				this.loading = true;
				this.offset = this.offset + 20;
				await this.getVideo(this.offset, 20);
			}
		}
		this.loading = false;
	},
	methods: {
		//返回对应的首页
		toIndex(item){
			uni.navigateTo({
				url:'../index/index?shortName='+item.shortName
			})
		},
		//Tab切换
		tabClick(index) {
			this.activeIndex = index;
			this.loading = false;
			this.$localstorageFactory.set('activeIndex', this.activeIndex);
			this.offset = 0;
			this.anchorData = [];
			switch (index) {
				case 0:
					this.getMulti();
					break;
				case 1:
					this.getAnchor(this.offset, 20);
					break;
				case 2:
					this.getLiveRoom(this.offset, 20);
					break;
				case 3:
					this.getVideo(this.offset, 20);
					break;
				default:
					break;
			}
		},
		//activeIndex=0 搜索全部
		getMulti() {
			let that = this;
			buziAPI.getMulti({ sk: that.$localstorageFactory.get('sk'), offset: 0, limit: 10, did: '534849629102e84fb8321a5700031531' }, res => {
				that.multiData = res.data;
			});
		},
		//activeIndex=1 搜索主播
		getAnchor(offset, limit) {
			let that = this;
			return new Promise(function(resolve, reject) {
				buziAPI.getAnchor({ sk: that.$localstorageFactory.get('sk'), offset, limit, did: '534849629102e84fb8321a5700031531' }, res => {
					that.anchorData = [...that.anchorData, ...res.data.list];
					resolve()
				});
			});
		},
		//activeIndex=2 搜索直播间
		getLiveRoom(offset, limit) {
			let that = this;
			return new Promise(function(resolve, reject) {
				buziAPI.getLiveRoom({ sk: that.$localstorageFactory.get('sk'), offset, limit, did: '534849629102e84fb8321a5700031531' }, res => {
					that.liveRoomData = [...that.liveRoomData, ...res.data.list];
					if (res.data.list.length < 20) {
						that.loading = false;
					}
					resolve()
				});
			});
		},
		//activeIndex=3 搜索视频
		getVideo(offset, limit) {
			let that = this;
			return new Promise(function(resolve, reject) {
				buziAPI.getVideo({ sk: that.$localstorageFactory.get('sk'), offset, limit, did: '534849629102e84fb8321a5700031531' }, res => {
					that.videoData = [...that.videoData, ...res.data.list];
					if (res.data.list.length < 20) {
						that.loading = false;
					}
					resolve()
				});
			});
		},
	}
};
</script>

<style lang="scss">
@import '../../uni.scss';
.anchor {
	padding: 20upx;
	.weui-navbar {
		position: fixed;
		top: 70upx;
		border-bottom: none;
		background: #fff;
	}
	.tab-item {
		margin: 10upx 20upx;
	}
	.actived {
		color: $douyu-bg-color;
		transform: scale(1.3);
		font-weight: 600;
	}
	.cate-list {
		@include flex();
		flex-wrap: wrap;
		.cate-item {
			@include wh(150upx, 200upx);
			text-align: center;
			font-size: $uni-font-size-sm;
			image {
				width: 120upx;
			}
		}
	}
	.list-title {
		.list {
			width: 100%;
			margin-bottom: 10upx;
			.hot,
			.nick-name {
				position: relative;
				@include relative(0, 0, 0, calc(100% - 310upx)) text-align: right;
				@include wh(300upx, 0);
				image {
					width: 24upx;
				}
				text {
					margin-left: 5upx;
					@include sc($uni-font-size-sm, #fff);
				}
			}
			.nick-name {
				@include relative(-60upx, 0, 0, 10upx);
				text-align: left;
			}
			.room-src {
				image {
					width: 100%;
					@include borderRadius(10upx);
				}
			}
			.room-classify {
				@include flex(space-between);
				@include sc($uni-font-size-base, #000);
				.room-name {
					width: 55%;
					@include line-clamp(1, 40upx);
				}
				.classify {
					text {
						color: $douyu-bg-color;
					}
				}
			}
			.vip-id {
				@include sc($uni-font-size-sm, $uni-text-color-disable);
			}
		}
	}
	.more {
		margin: 10upx 0;
		@include flex(space-between);
		.left,
		.right {
			@include flex();
			view {
				margin-right: 20upx;
			}
		}
		.left {
			view:nth-of-type(1) {
				width: 8upx;
				height: 35upx;
				background: $douyu-bg-color;
				@include borderRadius(5upx);
			}
		}
		.right {
			view:nth-of-type(1) {
				@include relative(-3upx, -20upx);
				@include sc($uni-font-size-sm, $uni-text-color-disable);
			}
			view:nth-of-type(2) {
				@include background-image-position('https://shark2.douyucdn.cn/front-publish/m-douyu-v3-master/assets/images/icon-v2_ed53f03.png', -88upx, 0, 60upx, 60upx, 0.7);
			}
		}
	}
	.uni-grid {
		text-align: center;
		image {
			width: 140upx;
			@include borderRadius(5upx);
		}
		.text {
			font-size: $uni-font-size-sm;
			margin-bottom: 20upx;
		}
		.is-live {
			text-align: right;
			@include wh(300upx, 0);
			@include relative(-10upx, 0, 0, calc(47vw - 552upx));
			image {
				width: 100upx;
			}
		}
	}
}
.spance {
	height: 40upx;
}
.anchor-list {
	@include flex(space-between);
	.anchor-list-left {
		@include flex();
		image {
			width: 120upx;
			@include borderRadius(50%);
			margin-right: 30upx;
		}
		.name {
			view:nth-of-type(1),
			view:nth-of-type(2) {
				font-size: $uni-font-size-base;
			}
			view:nth-of-type(2) {
				color: $uni-bg-color-main;
			}
		}
	}
	.anchor-list-right {
		image {
			width: 120upx;
		}
	}
}
</style>
