<template>
  <div class="bankcard">
		<mt-header fixed class="header" title="我的银行卡">
			<div slot="left" @click="back">
				<mt-button icon="back"></mt-button> 
			</div>
    </mt-header>
	</div>
</template>

<script>
export default {
  methods: {
		back() {
			this.goBack()
		}
	}
}
</script>

<style lang="stylus" scoped>

</style>
