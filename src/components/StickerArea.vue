<template>
    <area alt="" :title="checkAvailable()? sticker.name : 'Épuisé'" shape="rect" v-on:click.self="select($event)" :coords="sticker.coords" :class="{notavailable : !checkAvailable()}"/>
</template>

<script>
export default {
  props: [
    'sticker'
  ],
  methods: {
    select (event) {
      if (this.checkAvailable()) {
        this.$emit('select', this.sticker)
      }
    },
    checkAvailable () {
      return this.sticker.quantity > 0
    }
  }
}
</script>

<style scoped>
  .notavailable{
    cursor: no-drop;
  }
</style>
