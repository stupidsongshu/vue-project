<template>
  <div class="my">
		<mt-header fixed class="header" title="我的">
			<div slot="left" @click="back">
				<mt-button icon="back"></mt-button> 
			</div>
    </mt-header>

		<div class="my-login">
			<span class="icon-logo"></span>
			<span>登录</span>
		</div>

		<ul class="my-list">
			<li class="my-item" @click="toCardList">
				<span class="my-item-icon icon-bankcard"></span>
				<span class="my-item-text">我的银行卡</span>
				<i class="iconfont icon-arrow"></i>
			</li>
			<li class="my-item">
				<span class="my-item-icon icon-history-account"></span>
				<span class="my-item-text">历史账单</span>
				<i class="iconfont icon-arrow"></i>
			</li>
			<li class="my-item">
				<span class="my-item-icon icon-invite-friends"></span>
				<span class="my-item-text">邀请好友 月入万元</span>
				<i class="iconfont icon-arrow"></i>
			</li>
			<li class="my-item">
				<span class="my-item-icon icon-red-packet"></span>
				<span class="my-item-text">我的红包</span>
				<i class="iconfont icon-arrow"></i>
			</li>
			<li class="my-item">
				<span class="my-item-icon icon-help"></span>
				<span class="my-item-text">帮助中心</span>
				<i class="iconfont icon-arrow"></i>
			</li>
			<li class="my-item">
				<span class="my-item-icon icon-secure-setting"></span>
				<span class="my-item-text">安全设置</span>
				<i class="iconfont icon-arrow"></i>
			</li>
			<li class="my-item">
				<span class="my-item-icon icon-rate"></span>
				<span class="my-item-text">给我们评分</span>
				<i class="iconfont icon-arrow"></i>
			</li>
			<li class="my-item">
				<span class="my-item-icon icon-more"></span>
				<span class="my-item-text">更多</span>
				<i class="iconfont icon-arrow"></i>
			</li>
		</ul>
  </div>
</template>

<script>
export default {
  data() {
		return {}
	},
	methods: {
		back() {
			this.goBack()
		},
		toCardList() {
			this.$router.push({name: 'cardList'})
		}
	}
}
</script>

<style lang="stylus" scoped>
.my
	width: 100%
	height: 100%
	background-color: #f1f1f1
	.my-login
		display: flex
		align-items: center
		width: 100%
		height: 92px
		color: rgb(51, 51, 51)
		font-size: 17px
		background-color: #fff
		.icon-logo
			width: 64px
			height: 64px
			margin-left: 15px
			margin-right: 18px
			background: url('../../assets/img/icon-logo.png') no-repeat center/64px 64px
	.my-list
		margin-top: 10px
		.my-item
			display: flex
			align-items: center
			justify-content: space-between
			height: 52px
			padding: 0 15px 0 20px
			margin-bottom: 1px
			font-size: 15px
			background-color: #fff
			.my-item-icon
				width: 26px
				height: 26px
				margin-right: 15px
				background-size: 26px 26px
				&.icon-bankcard
					background-image: url('../../assets/img/icon-my-bankcard.png')
				&.icon-history-account
					background-image: url('../../assets/img/icon-my-history-account.png')
				&.icon-invite-friends
					background-image: url('../../assets/img/icon-my-invite-friends.png')
				&.icon-red-packet
					background-image: url('../../assets/img/icon-my-red-packet.png')
				&.icon-help
					background-image: url('../../assets/img/icon-my-help.png')
				&.icon-secure-setting
					background-image: url('../../assets/img/icon-my-secure-setting.png')
				&.icon-rate
					background-image: url('../../assets/img/icon-my-rate.png')
				&.icon-more
					background-image: url('../../assets/img/icon-my-more.png')
			.my-item-text
				flex: 1
</style>
