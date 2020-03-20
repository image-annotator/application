<template>
  <div class="viewer-background">
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
    <div class="viewer-wrapper center center-horizontal">
      <img
        draggable="false"
        class="image"
        :src="imageURL"
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
      />
    </div>
    <div class="btn-section">
      <button type="button" class="btn-label-no-border btn-lg btn-dark btn-text">
        Save Image
      </button>
    </div>
  </div>
</template>

<script>
import Box from '~/components/label/Box'

const getLeftCursor = function (e) {
  return e.pageX
}

const getTopCursor = function (e) {
  return e.pageY
}

export default {
  components: {
    Box
  },
  data () {
    return {
      imageURL: '/',
      drawingBox: {
        active: false,
        top: 0,
        left: 0,
        height: 0,
        width: 0
      },
      boxes: []
    }
  },
  mounted() {
    this.imageURL = this.$route.query.url
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
        left: getLeftCursor(e),
        top: getTopCursor(e),
        active: true
      }
    },
    changeBox(e) {
      if (this.drawingBox.active) {
        console.log("getLeftCursor: ", getLeftCursor(e))
        this.drawingBox.width = getLeftCursor(e) - this.drawingBox.left
        console.log("width: ", this.drawingBox.width)
        this.drawingBox.height = getTopCursor(e) - this.drawingBox.top
      }
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