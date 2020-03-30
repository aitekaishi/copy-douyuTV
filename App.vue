<script>
	export default {
		// onLaunch: function() {
		// 	console.log('App Launch')
		// },
		// onShow: function() {
		// 	console.log('App Show')
		// },
		// onHide: function() {
		// 	console.log('App Hide')
		// }
	}
</script>

<style lang="scss">
	/*每个页面公共css */
@import './uni.scss';
.line{
	@include wh(100vw,2upx);
	margin: 10upx auto;
	background:$uni-bg-color-main;
}
.index-swiper-center-center {
			@include flex(space-between);
			flex-wrap: wrap;
			.list {
				width: 47vw;
				margin-bottom: 10upx;
				.hot,
				.is-live,
				.nick-name,.video-time{
					@include relative(-10upx, 0, 0, calc(47vw - 310upx));
					 text-align: right;
					@include wh(300upx, 0);
					image {
						width: 24upx;
					}
					text {
						margin-left: 5upx;
						@include sc($uni-font-size-sm, #fff);
					}
				}
				.is-live{
					@include relative(-10upx, 0, 0, calc(47vw - 552upx));
					image {
						width: 100upx;
					}
				}
				.video-time{
					width: 320upx;
					@include relative(-60upx, 0, 0, 20upx);
					text-align: right;
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
				.room-name {
					@include sc($uni-font-size-sm, #000);
					@include line-clamp(1, 40upx);
				}
			}
		}
		.loading-more {
			text-align: center;
			image {
				width: 70upx;
			}
		}
</style>
