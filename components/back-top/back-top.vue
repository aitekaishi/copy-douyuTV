<template>
	<view v-if="scrollTop>400" class="backTop" :class="{'mescroll-fade-in':isShowToTop}" @click="toTopClick">
		<i class="iconfont">&#xe61c;</i>
	</view>
</template>

<script>
	export default {
		name: "backTop",
		props: {
			src: {
				type: String,
				default: ''
			},
			id: {
				type: String,
				default: ''
			},
			scrollTop: {
				type: Number,
				default: 0
			},
			tab: {
				type: Boolean,
				default: false
			}
		},
		data() {
			return {
				isShowToTop: true
			}
		},
		methods: {
			toTopClick() {
				this.isShowToTop = false; // 回到顶部按钮需要先隐藏,再执行回到顶部,避免闪动
				if (this.tab) {
					this.$emit('setScrollTop');
				} else {
					uni.pageScrollTo({
						scrollTop: 0,
						duration: 300
					});
				}


			}
		},

	}
</script>

<style>
	@font-face {
	  font-family: 'iconfont';  /* project id 1706238 */
	  src: url('//at.alicdn.com/t/font_1706238_2np31dpslu.eot');
	  src: url('//at.alicdn.com/t/font_1706238_2np31dpslu.eot?#iefix') format('embedded-opentype'),
	  url('//at.alicdn.com/t/font_1706238_2np31dpslu.woff2') format('woff2'),
	  url('//at.alicdn.com/t/font_1706238_2np31dpslu.woff') format('woff'),
	  url('//at.alicdn.com/t/font_1706238_2np31dpslu.ttf') format('truetype'),
	  url('//at.alicdn.com/t/font_1706238_2np31dpslu.svg#iconfont') format('svg');
	}
	.iconfont{
	    font-family:"iconfont" !important;
	    font-size:50upx;font-style:normal;
	    -webkit-font-smoothing: antialiased;
	    -webkit-text-stroke-width: 0.2upx;
	    -moz-osx-font-smoothing: grayscale;
	}
	.mescroll-lazy-in,
	.mescroll-fade-in {
		-webkit-animation: mescrollFadeIn .3s linear forwards;
		animation: mescrollFadeIn .3s linear forwards;
	}

	.backTop {
		z-index: 999;
		position: fixed;
		right: 55upx;
		bottom: 40upx;
		/* #ifdef H5 */
		bottom: 140upx;
		/* #endif */
	}
</style>
