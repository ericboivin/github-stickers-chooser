<template>
<div>
  <img :src="sticker.url" width="300px" height="300px" :title="sticker.sticker" v-on:click.self="select($event)">
</div>
</template>

<script>
export default {
  props: [
    'sticker'
  ],
  methods: {
    select (event) {
      if (this.checkAvailable()) {
        this.$emit('select', this)
      }
    },
    checkAvailable () {
      return this.sticker.quantity > 0
    }
  }
}
</script>

<style scoped>
</style>
