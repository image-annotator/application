<template>
  <div ref="imageWrapper" class="viewer-background" >
    <div class="btn-close-section">
      <button
        type="button"
        class="btn-label-no-border btn-sm btn-light btn-close-text mt-2"
        aria-label="Close"
        @click="closeViewer()"
      > 
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="viewer-wrapper center center-horizontal" @mousedown="stopDrawingBox">
      <div id="image">
        <img
          ref="image"
          draggable="false"
          class="image"
          :src="image.url"
          @mousedown="onMouseDownHandler"
          @mousemove="changeBox"
          @mouseup="stopDrawingBox"
        >
        <Box
          v-if="drawingBox.active"
          :b-width="drawingBox.width"
          :b-height="drawingBox.height"
          :b-top="drawingBox.top"
          :b-left="drawingBox.left"
        />
        <Box
          v-for="(box, i) in boxes"
          :key="i"
          :b-width="box.width"
          :b-height="box.height"
          :b-top="box.top"
          :b-left="box.left"
          :b-active="i === activeBoxIndex"
          :b-index="i"
          @onStopResize="changeBoxAttribute($event, i)"
          @onDelete="deleteBox(i)"
          @onSelect="makeCurrentBoxActive($event)"
        />
      </div>
    </div>
    {{ boxes }}
    <div class="btn-section">
      <button type="button" class="btn-label-no-border btn-lg btn-dark btn-text" @click="saveImage">
        Save Image
      </button>
    </div>
  </div>
</template>

<script>
import Box from '~/components/label/Box'
import { Cursors } from '~/mixins/label/getCursorPosition'

export default {
  components: {
    Box
  },
  data () {
    return {
      drawingBox: {
        active: false,
        top: 0,
        left: 0,
        height: 0,
        width: 0
      },
      activeBoxIndex: -1,
      boxes: [],
      image: {
        url: ''
      },
      makeCurrentBoxActive(activeBoxIndex) {
        this.activeBoxIndex = activeBoxIndex
      },
      deleteBox(index) {
        var numOfDeletedElement = 1
        this.boxes.splice(index, numOfDeletedElement)
        this.activeBoxIndex = -1
      }
    }
  },
  mounted() {
    this.image.url = this.$route.query.url
  },
  methods: {
    closeViewer() {
      this.$router.push('/main/label')
    },
    onMouseDownHandler(e) {
      if (this.drawingBox.active) {
        this.stopDrawingBox()
      } else {
        this.startDrawingBox(e)
      }
    },
    startDrawingBox(e) {
      console.log("Event: ", e)
      this.drawingBox = {
        width: 0,
        height: 0,
        left: Cursors.getLeftCursor(e),
        top: Cursors.getTopCursor(e),
        active: true
      }
    },
    changeBox(e) {
      if (this.drawingBox.active) {
        this.drawingBox.width = Cursors.getLeftCursor(e) - this.drawingBox.left
        this.drawingBox.height = Cursors.getTopCursor(e) - this.drawingBox.top
      }
    },
    changeBoxAttribute(attribute, index) {
      var idxBox = index
      this.boxes[idxBox].left = attribute.bLeft
      this.boxes[idxBox].top = attribute.bTop
      this.boxes[idxBox].width = attribute.bWidth
      this.boxes[idxBox].height = attribute.bHeight
    },
    stopDrawingBox() {
      if (this.drawingBox.active) {
        if (this.drawingBox.width > 5) {
          let newBox = {
            width: this.drawingBox.width,
            height: this.drawingBox.height,
            left: this.drawingBox.left,
            top: this.drawingBox.top
          }
          this.boxes.push(newBox)
          this.makeCurrentBoxActive((this.boxes).length -1)
          this.resetDrawingBox()
        }
      }
    },
    resetDrawingBox() {
      this.drawingBox.width = 0
      this.drawingBox.height = 0
      this.drawingBox.left = 0
      this.drawingBox.top = 0
      this.drawingBox.active = false
    },
    saveImage() {
      const width = this.$refs.image.clientWidth
      const height = this.$refs.image.clientHeight

      const realWidth = this.$refs.image.naturalHeight
      const realHeight = this.$refs.image.naturalHeight

      console.log(this.getRealPosition(width, height, realWidth, realHeight))
      
    },
    getPositionRelativeToImage(width, height) {
      const wrapperHeight = this.$refs.imageWrapper.clientHeight
      const wrapperWidth = this.$refs.imageWrapper.clientWidth
      const imageLeft = (wrapperWidth - width) / 2
      const imageTop = (wrapperHeight - height) / 2
      return {
        imageLeft: imageLeft,
        imageTop: imageTop
      }
    },
    getRealPosition (width, height, realWidth, realHeight) {
      var relativePosition = this.getPositionRelativeToImage(width, height)
      var realImageLeft = (realWidth / width) * relativePosition.imageLeft
      var realImageTop = (realHeight / height) * relativePosition.imageTop

      return {
        imageLeft: realImageLeft,
        imageTop: realImageTop
      }
    }
  }
}
</script>

<style scoped>
  .image {
     max-width: 85vw;
     max-height: 85vh;
     border-width: thin;
     cursor: cell;
  }

  .viewer-wrapper {
    height: 87.5vh;
    width: 100vw;
  }

  .viewer-background {
    height: 100vh;
    background-color: #E4E4E4;
  }

  .center-horizontal {
    justify-content: center;
  }

  .btn-section {
    text-align: right;
    margin-right: 15px;
    margin-top: -10px;
  }

  .btn-text { 
    font-size: 0.85rem;
    /* font-family: 'Open Sans Bold'; */
  }

  .btn-close-text {
    font-size: 1.2rem;
  }

  .btn-close-section {
    text-align: right;
    margin-right: 1px;
    margin-top: -7px;
  }

  .btn-label-no-border {
    border: 0;
  }

</style>