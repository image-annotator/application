<template>
  <div class="box-wrapper">
    <div class="box" :style="{top: bTop + 'px', left: bLeft + 'px', width: bWidth + 'px', height: bHeight + 'px'}" />
  </div>
</template>

<script>
// https://levelup.gitconnected.com/object-labelling-tool-on-vue-js-part-1-drawing-boxes-3e0b961aa680
export default {
  name: "Box",
  props: {
    bTop: {
      type: Number,
      required: true
    },
    bLeft: {
      type: Number,
      default: 0
    },
    bWidth: {
      type: Number,
      default: 0
    },
    bHeight: {
      type: Number,
      default: 0
    }
  }
}
</script>

<style scoped>
    .box {
        position: absolute;
        border: 3px #F0F801 solid;
        z-index: 3;
    }

    .box:hover, .box.active {
      background-color: rgba(144, 238, 144, .2);
      cursor: pointer;
    }
</style>