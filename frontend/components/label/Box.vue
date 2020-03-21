<template>
  <div class="box-wrapper">
    <!-- Identifier Square -->
    <div
      v-if="bIndex !== -1"
      id="bIndex"
      :style="{ top: bTop + -5 + 'px', left: bLeft + bWidth + -30 + 'px'}"
    >
      id: {{ bIndex }}
    </div>

    <!-- Top-Left Circle -->
    <div
      v-if="bActive"
      class="circle"
      :style="{ top: bTop + -6 + 'px', left: bLeft + -6 + 'px'}"
      @mousedown="isCircleActive = true"
      @mousemove="resizeBox"
      @mouseup="onStopResize"
    />

    <div
      class="box"
      :style="{top: bTop + 'px', left: bLeft + 'px', width: bWidth + 'px', height: bHeight + 'px'}"
      :class="{'active': bActive}"
      @mousedown="selectBox"
    />
  </div>
</template>

<script>
// https://levelup.gitconnected.com/object-labelling-tool-on-vue-js-part-1-drawing-boxes-3e0b961aa680
import { Cursors } from '~/mixins/label/getCursorPosition'

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
    },
    bActive: {
      type: Boolean,
      default: false
    },
    bIndex: {
      type: Number,
      default: -1
    }
  },
  data () {
    return {
      isCircleActive: false
    }
  },
  mounted () {
    window.addEventListener('keyup', (event) => {
      // Delete key
      if (event.keyCode === 8 || event.keyCode === 46) {
        this.deleteBox()
      }
    })
  },
  methods: {
    selectBox() {
      this.$emit("onSelect", this.bIndex)
    },
    deleteBox() {
      if (this.bActive) {
        this.$emit("onDelete", this.bIndex)
      }
    },
    resizeBox(e) {
      if (this.bActive && this.isCircleActive) {
        var prevbLeft = this.bLeft
        var prevbTop = this.bTop
        this.bLeft = Cursors.getLeftCursor(e)
        this.bTop = Cursors.getTopCursor(e)
        this.bWidth -= (this.bLeft - prevbLeft)
        this.bHeight -= (this.bTop - prevbTop)
      }
    },
    onStopResize() {
      this.isCircleActive = false
      this.$emit("onStopResize", {
        bLeft: this.bLeft,
        bTop: this.bTop,
        bWidth: this.bWidth,
        bHeight: this.bHeight
      })
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

    #bIndex {
      position: absolute;
      z-index: 6;
      padding-left: 10px;
      padding-right: 10px;
      background-color: #FFFFFF;

      font-size: 0.7rem;
      border-radius: 7px;
    }

    .circle {
      position: absolute;
      z-index: 6;
      height: 14px;
      width: 14px;
      background-color: #FFFFFF;
      border-radius: 50%;
      border: 1px solid #1592E6;

      cursor: pointer;
    }
</style>