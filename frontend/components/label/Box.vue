<template>
  <div v-if="!isDeleted" class="box-wrapper">
    <!-- Identifier Square -->
    <!-- <div
      v-if="bIndex !== -1"
      id="bIndex"
      class="shadow"
      :style="{ top: bTop + bHeight + -10 + 'px', left: bLeft + 'px'}"
    >
      id: {{ bIndex }}
    </div> -->

    <div v-if="isDeleteActive">
      <i
        class="icon-trash fas fa-trash shadow"
        :style="{ top: bTop -8 + 'px', left: bLeft + -4 + 'px'}"
        @click="deleteBox"
      />
    </div>

    <!-- Top-Left Circle -->
    <div
      v-if="bActive && bAction === 'resize-box'"
      class="circle"
      :style="{ top: bTop + -6 + 'px', left: bLeft + -6 + 'px'}"
      @mousedown="isLeftCircleActive = true"
      @mousemove="resizeBoxFromTopLeft"
      @mouseup="onStopResize"
    />

    <!-- Bottom-Right Circle -->
    <div
      v-if="bActive && bAction === 'resize-box'"
      class="circle"
      :style="{ top: bTop + bHeight + -8 + 'px', left: bLeft + bWidth + -8 + 'px'}"
      @mousedown="isRightCircleActive = true"
      @mousemove="resizeBoxFromBottomRight"
      @mouseup="onStopResize"
    />

    <Suggest
      v-show="bIndex !== -1 && !isOnResize"
      class="suggestion-form"
      :style="{ top: bTop + -6 + 'px', left: bLeft + bWidth * 0.3 + 'px', width: suggestWidth + 'px'}"
      :class="{'suggest-active': isSuggestActive}"
      :initial-data="bContent"
      :suggest-type="suggestType"
      @onEnableForm="handleOnEnableForm"
      @onDisableForm="handleOnDisableForm"
    />

    <div
      :style="{top: bTop + 'px', left: bLeft + 'px', width: bWidth + 'px', height: bHeight + 'px'}"
      :class="{'active': bActive, 'box': !isDeleteActive, 'box-delete': isDeleteActive}"
      @mousedown="selectBox"
    />
  </div>
</template>

<script>
// https://levelup.gitconnected.com/object-labelling-tool-on-vue-js-part-1-drawing-boxes-3e0b961aa680

import Suggest from '~/components/view/Suggest'
import { Cursors } from '~/mixins/label/getCursorPosition'
export default {
  name: "Box",
  components: {
    Suggest
  },
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
    },
    bContent: {
      type: String,
      default: ''
    },
    bAction: {
      type: String,
      default: 'add-box'
    },
    suggestType: {
      type: String,
      default: 'label'
    },
    canDelete: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      isLeftCircleActive: false,
      isRightCircleActive: false,
      isOnResize: false,
      isSuggestActive: false,
      isDeleted: false
    }
  },
  computed: {
    suggestWidth () {
      if (this.bWidth < 80) {
        return this.bWidth + 5
      } else {
        console.log("Length: ", this.bContent.length)
        return Math.max(80, (this.bContent.length) * 8 + 7)
      }
    },
    isDeleteActive () {
      return this.bAction === 'delete-box'
    }
  },
  methods: {
    selectBox () {
      this.$emit("onSelect", this.bIndex)
    },
    deleteBox () {
      if (this.isDeleteActive) {
        this.isDeleted = true
        this.$emit("onDelete", this.bIndex)
      }
    },
    resizeBoxFromTopLeft (e) {
      if (this.bActive && this.isLeftCircleActive) {
        this.isOnResize = true
        var prevbLeft = this.bLeft
        var prevbTop = this.bTop
        this.bLeft = Cursors.getLeftCursor(e)
        this.bTop = Cursors.getTopCursor(e)
        this.bWidth -= (this.bLeft - prevbLeft)
        this.bHeight -= (this.bTop - prevbTop)
      }
    },
    resizeBoxFromBottomRight (e) {
      if (this.bActive && this.isRightCircleActive) {
        this.isOnResize = true
        var prevbRight = this.bLeft + this.bWidth
        var prevbBottom = this.bTop + this.bHeight
        var bRight = Cursors.getLeftCursor(e)
        var bBottom = Cursors.getTopCursor(e)
        this.bWidth += (bRight - prevbRight)
        this.bHeight += (bBottom - prevbBottom)
      }
    },
    onStopResize () {
      this.isLeftCircleActive = false
      this.isRightCircleActive = false
      this.isOnResize = false
      this.$emit("onStopResize", {
        bLeft: this.bLeft,
        bTop: this.bTop,
        bWidth: this.bWidth,
        bHeight: this.bHeight
      })
    },
    handleOnEnableForm () {
      this.isSuggestActive = true
      this.$emit("onEnableForm")
    },
    handleOnDisableForm (bContent) {
      this.isSuggestActive = false
      this.$emit("onDisableForm", bContent)
    }
  }
}
</script>

<style scoped>
    .box, .box-delete {
        position: absolute;
        border: 3px #F0F801 solid;
        z-index: 3;
    }

    .box:hover, .box-delete:hover , .box.active {
      background-color: rgba(144, 238, 144, .3);
      cursor: pointer;
    }

    .box-delete:hover {
      background-color: rgba(214, 36, 70, .3);
    }

    #bIndex {
      position: absolute;
      z-index: 6;
      padding-left: 10px;
      padding-right: 10px;
      background-color: #FFFFFF;

      font-size: 7.5pt;
      border-radius: 7px; 
    }

    .shadow {
      -webkit-box-shadow: 1px 1px 6px 3px rgba(0,0,0,0.15);
      -moz-box-shadow: 1px 1px 6px 3px rgba(0,0,0,0.15);
      box-shadow: 1px 1px 6px 3px rgba(0,0,0,0.15);
    }

    .circle {
      position: absolute;
      z-index: 9;
      height: 14px;
      width: 14px;
      background-color: #FFFFFF;
      border-radius: 50%;
      border: 1px solid #1592E6;

      cursor: nwse-resize;
    }

    .suggestion-form {
      position: absolute;
      width: 95px;
      z-index: 8;
      font-size: 9pt;
    }

    .shrink-width {
      width: 70px;
    }

    .suggest-active {
      z-index: 20;
    }

    .icon-trash {
      color: red;
      position: absolute;
      z-index: 20;
      cursor: pointer;
    }

    .icon-trash:hover {
      color: #F0F801;
    }

    
</style>