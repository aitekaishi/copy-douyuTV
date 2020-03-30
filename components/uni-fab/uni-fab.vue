<template>
	<view>
		<view v-if="popMenu && (leftBottom||rightBottom||leftTop||rightTop)" :class="{
        'uni-fab--leftBottom': leftBottom,
        'uni-fab--rightBottom': rightBottom,
        'uni-fab--leftTop': leftTop,
        'uni-fab--rightTop': rightTop
      }"
		 class="uni-fab">
			<view :class="{
          'uni-fab__content--left': horizontal === 'left',
          'uni-fab__content--right': horizontal === 'right',
          'uni-fab__content--flexDirection': direction === 'vertical',
          'uni-fab__content--flexDirectionStart': flexDirectionStart,
          'uni-fab__content--flexDirectionEnd': flexDirectionEnd,
		  'uni-fab__content--other-platform': !isAndroidNvue
        }"
			 :style="{ width: boxWidth, height: boxHeight, backgroundColor: styles.backgroundColor }" class="uni-fab__content"
			 elevation="5">
				<view v-if="flexDirectionStart || horizontalLeft" class="uni-fab__item uni-fab__item--first" />
				<view v-for="(item, index) in content" :key="index" :class="{ 'uni-fab__item--active': isShow }" class="uni-fab__item"
				 @click="_onItemClick(index, item)">
					<i v-if='index==0' class="iconfont">&#xe699;</i>
					<i v-if='index==1' class="iconfont">&#xe61b;</i>
					<text class="uni-fab__item-text">{{item.text}}</text>
				</view>
				<view v-if="flexDirectionEnd || horizontalRight" class="uni-fab__item uni-fab__item--first" />
			</view>
		</view>
		<view :class="{
		  'uni-fab__circle--leftBottom': leftBottom,
		  'uni-fab__circle--rightBottom': rightBottom,
		  'uni-fab__circle--leftTop': leftTop,
		  'uni-fab__circle--rightTop': rightTop,
		  'uni-fab__content--other-platform': !isAndroidNvue
		}"
		 class="uni-fab__circle uni-fab__plus" :style="{ 'background-color': styles.buttonColor }" @click="_onClick">
			<i class="iconfont">&#xe6ef;</i>
		</view>
	</view>
</template>

<script>
	let platform = 'other'
	// #ifdef APP-NVUE
	platform = uni.getSystemInfoSync().platform
	// #endif

	/**
	 * Fab 悬浮按钮
	 * @description 点击可展开一个图形按钮菜单
	 * @tutorial https://ext.dcloud.net.cn/plugin?id=144
	 * @property {Object} pattern 可选样式配置项
	 * @property {Object} horizontal = [left | right] 水平对齐方式
	 * 	@value left 左对齐
	 * 	@value right 右对齐
	 * @property {Object} vertical = [bottom | top] 垂直对齐方式
	 * 	@value bottom 下对齐
	 * 	@value top 上对齐
	 * @property {Object} direction = [horizontal | vertical] 展开菜单显示方式
	 * 	@value horizontal 水平显示
	 * 	@value vertical 垂直显示
	 * @property {Array} content 展开菜单内容配置项
	 * @property {Boolean} popMenu 是否使用弹出菜单
	 * @event {Function} trigger 展开菜单点击事件，返回点击信息
	 * @event {Function} fabClick 悬浮按钮点击事件
	 */
	export default {
		name: 'UniFab',
		props: {
			pattern: {
				type: Object,
				default () {
					return {}
				}
			},
			horizontal: {
				type: String,
				default: 'right'
			},
			vertical: {
				type: String,
				default: 'bottom'
			},
			direction: {
				type: String,
				default: 'vertical'
			},
			content: {
				type: Array,
				default () {
					return [{text:'药师咨询'},{text:'意见反馈'}]
				}
			},
			show: {
				type: Boolean,
				default: false
			},
			popMenu: {
				type: Boolean,
				default: true
			}
		},
		data() {
			return {
				fabShow: false,
				isShow: false,
				isAndroidNvue: platform === 'android',
				styles: {
					color: '#3c3e49',
					selectedColor: '#007AFF',
					backgroundColor: '#fff',
					buttonColor: '#007AFF'
				}
			}
		},
		computed: {
			contentWidth(e) {
				return (this.content.length + 1) * 55 + 10 + 'px'
			},
			contentWidthMin() {
				return 55 + 'px'
			},
			// 动态计算宽度
			boxWidth() {
				return this.getPosition(3, 'horizontal')
			},
			// 动态计算高度
			boxHeight() {
				return this.getPosition(3, 'vertical')
			},
			// 计算左下位置
			leftBottom() {
				return this.getPosition(0, 'left', 'bottom')
			},
			// 计算右下位置
			rightBottom() {
				return this.getPosition(0, 'right', 'bottom')
			},
			// 计算左上位置
			leftTop() {
				return this.getPosition(0, 'left', 'top')
			},
			rightTop() {
				return this.getPosition(0, 'right', 'top')
			},
			flexDirectionStart() {
				return this.getPosition(1, 'vertical', 'top')
			},
			flexDirectionEnd() {
				return this.getPosition(1, 'vertical', 'bottom')
			},
			horizontalLeft() {
				return this.getPosition(2, 'horizontal', 'left')
			},
			horizontalRight() {
				return this.getPosition(2, 'horizontal', 'right')
			}
		},
		watch: {
			pattern(newValue, oldValue) {
				//console.log(JSON.stringify(newValue))
				this.styles = Object.assign({}, this.styles, newValue)
			}
		},
		created() {
			this.isShow = this.show
			if (this.top === 0) {
				this.fabShow = true
			}
			// 初始化样式
			this.styles = Object.assign({}, this.styles, this.pattern)
		},
		methods: {
			_onClick() {
				this.$emit('fabClick')
				if (!this.popMenu) {
					return
				}
				this.isShow = !this.isShow
			},
			open() {
				this.isShow = true
			},
			close() {
				this.isShow = false
			},
			/**
			 * 按钮点击事件
			 */
			_onItemClick(index, item) {
				this.$emit('trigger', {
					index,
					item
				})
			},
			/**
			 * 获取 位置信息
			 */
			getPosition(types, paramA, paramB) {
				if (types === 0) {
					return this.horizontal === paramA && this.vertical === paramB
				} else if (types === 1) {
					return this.direction === paramA && this.vertical === paramB
				} else if (types === 2) {
					return this.direction === paramA && this.horizontal === paramB
				} else {
					return this.isShow && this.direction === paramA ? this.contentWidth : this.contentWidthMin
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	@font-face {
	  font-family: 'iconfont';  /* project id 1706238 */
	  src: url('//at.alicdn.com/t/font_1706238_p7xnhbwesn.eot');
	  src: url('//at.alicdn.com/t/font_1706238_p7xnhbwesn.eot?#iefix') format('embedded-opentype'),
	  url('//at.alicdn.com/t/font_1706238_p7xnhbwesn.woff2') format('woff2'),
	  url('//at.alicdn.com/t/font_1706238_p7xnhbwesn.woff') format('woff'),
	  url('//at.alicdn.com/t/font_1706238_p7xnhbwesn.ttf') format('truetype'),
	  url('//at.alicdn.com/t/font_1706238_p7xnhbwesn.svg#iconfont') format('svg');
	}
	.iconfont{
	    font-family:"iconfont" !important;
	    font-size:80upx;font-style:normal;
	    -webkit-font-smoothing: antialiased;
	    -webkit-text-stroke-width: 0.2upx;
	    -moz-osx-font-smoothing: grayscale;
		color: #dd524d;
	}
	.uni-fab {
		position: fixed;
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		justify-content: center;
		align-items: center;
		z-index: 10;
	}

	.uni-fab--active {
		opacity: 1;
	}

	.uni-fab--leftBottom {
		left: 5px;
		bottom: 20px;
		/* #ifdef H5 */
		bottom: calc(20px + var(--window-bottom));
		/* #endif */
		padding: 10px;
	}

	.uni-fab--leftTop {
		left: 5px;
		top: 30px;
		/* #ifdef H5 */
		top: calc(30px + var(--window-top));
		/* #endif */
		padding: 10px;
	}

	.uni-fab--rightBottom {
		right: 5px;
		bottom: 50px;
		/* #ifdef H5 */
		bottom: calc(50px + var(--window-bottom));
		/* #endif */
		padding: 10px;
	}

	.uni-fab--rightTop {
		right: 5px;
		top: 30px;
		/* #ifdef H5 */
		top: calc(30px + var(--window-top));
		/* #endif */
		padding: 10px;
	}

	.uni-fab__circle {
		position: fixed;
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		justify-content: center;
		align-items: center;
		width: 55px;
		height: 55px;
		background-color: #3c3e49;
		border-radius: 55px;
		z-index: 11;
	}

	.uni-fab__circle--leftBottom {
		left: 15px;
		bottom: 60px;
		/* #ifdef H5 */
		bottom: calc(60px + var(--window-bottom));
		/* #endif */
	}

	.uni-fab__circle--leftTop {
		left: 15px;
		top: 40px;
		/* #ifdef H5 */
		top: calc(40px + var(--window-top));
		/* #endif */
	}

	.uni-fab__circle--rightBottom {
		right: 15px;
		bottom: 60px;
		/* #ifdef H5 */
		bottom: calc(60px + var(--window-bottom));
		/* #endif */
	}

	.uni-fab__circle--rightTop {
		right: 15px;
		top: 40px;
		/* #ifdef H5 */
		top: calc(40px + var(--window-top));
		/* #endif */
	}

	.uni-fab__circle--left {
		left: 0;
	}

	.uni-fab__circle--right {
		right: 0;
	}

	.uni-fab__circle--top {
		top: 0;
	}

	.uni-fab__circle--bottom {
		bottom: 0;
	}

	.uni-fab__plus {
		font-weight: bold;
	}

	// .fab-circle-v {
	// 	position: absolute;
	// 	width: 3px;
	// 	height: 31px;
	// 	left: 26px;
	// 	top: 12px;
	// 	background-color: white;
	// 	transform: rotate(0deg);
	// 	transition: transform 0.3s;
	// }

	// .fab-circle-h {
	// 	position: absolute;
	// 	width: 31px;
	// 	height: 3px;
	// 	left: 12px;
	// 	top: 26px;
	// 	background-color: white;
	// 	transform: rotate(0deg);
	// 	transition: transform 0.3s;
	// }

	.uni-fab__plus--active {
		transform: rotate(135deg);
	}

	.uni-fab__content {
		/* #ifndef APP-NVUE */
		box-sizing: border-box;
		display: flex;
		/* #endif */
		flex-direction: row;
		border-radius: 55px;
		overflow: hidden;
		transition-property: width, height;
		transition-duration: 0.2s;
		width: 55px;
		border-color: #DDDDDD;
		border-width: 1rpx;
		border-style: solid;
	}

	.uni-fab__content--other-platform {
		border-width: 0px;
		box-shadow: 0 0 5px 2px rgba(0, 0, 0, 0.2);
	}

	.uni-fab__content--left {
		justify-content: flex-start;
	}

	.uni-fab__content--right {
		justify-content: flex-end;
	}

	.uni-fab__content--flexDirection {
		flex-direction: column;
		justify-content: flex-end;
	}

	.uni-fab__content--flexDirectionStart {
		flex-direction: column;
		justify-content: flex-start;
	}

	.uni-fab__content--flexDirectionEnd {
		flex-direction: column;
		justify-content: flex-end;
	}

	.uni-fab__item {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: column;
		justify-content: center;
		align-items: center;
		width: 55px;
		height: 55px;
		opacity: 0;
		transition: opacity 0.2s;
		.iconfont{
			font-size: 50upx;
			color: #4399fc;
		}
	}

	.uni-fab__item--active {
		opacity: 1;
	}

	.uni-fab__item-image {
		width: 25px;
		height: 25px;
		margin-bottom: 3px;
	}

	.uni-fab__item-text {
		color: #333;
		font-size: 26upx;
	}

	.uni-fab__item--first {
		width: 55px;
	}
</style>
