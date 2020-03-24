<template>
  <div ref="imageWrapper" class="viewer-background">
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
          :b-content="box.content"
          @onStopResize="changeBoxAttribute($event, i)"
          @onDelete="deleteBox(i)"
          @onSelect="makeCurrentBoxActive($event)"
          @onDisableForm="changeBoxContent($event, i)"
          @onEnableForm="makeCurrentBoxActive(i)"
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
        width: 0,
        content: ''
      },
      activeBoxIndex: -1,
      boxes: [],
      image: {
        id: -1,
        url: ''
      }
    }
  },
  mounted () {
    this.image.url = this.$route.query.url
    this.image.id = this.$route.query.id
  },
  methods: {
    closeViewer () {
      this.$router.push('/main/label')
    },
    onMouseDownHandler (e) {
      if (this.drawingBox.active) {
        this.stopDrawingBox()
      } else {
        this.startDrawingBox(e)
      }
    },
    startDrawingBox (e) {
      console.log("Event: ", e)
      this.drawingBox = {
        width: 0,
        height: 0,
        left: Cursors.getLeftCursor(e),
        top: Cursors.getTopCursor(e),
        active: true
      }
    },
    changeBox (e) {
      if (this.drawingBox.active) {
        this.drawingBox.width = Cursors.getLeftCursor(e) - this.drawingBox.left
        this.drawingBox.height = Cursors.getTopCursor(e) - this.drawingBox.top
      }
    },
    changeBoxAttribute (attribute, index) {
      var idxBox = index
      this.boxes[idxBox].left = attribute.bLeft
      this.boxes[idxBox].top = attribute.bTop
      this.boxes[idxBox].width = attribute.bWidth
      this.boxes[idxBox].height = attribute.bHeight
    },
    makeCurrentBoxActive (activeBoxIndex) {
      this.activeBoxIndex = activeBoxIndex
    },
    deleteBox (index) {
      var numOfDeletedElement = 1
      this.boxes.splice(index, numOfDeletedElement)
      this.activeBoxIndex = -1
    },
    changeBoxContent (content, index) {
      var idxBox = index
      this.boxes[idxBox].content = content
    },
    stopDrawingBox () {
      if (this.drawingBox.active) {
        if (this.drawingBox.width > 5) {
          let newBox = {
            width: this.drawingBox.width,
            height: this.drawingBox.height,
            left: this.drawingBox.left,
            top: this.drawingBox.top,
            content: this.drawingBox.content
          }
          this.boxes.push(newBox)
          this.makeCurrentBoxActive((this.boxes).length -1)
          this.resetDrawingBox()
        }
      }
    },
    resetDrawingBox () {
      this.drawingBox.width = 0
      this.drawingBox.height = 0
      this.drawingBox.left = 0
      this.drawingBox.top = 0
      this.drawingBox.active = false
    },
    async saveImage () {
      // Validate all content name first
      if (this.validateAllContents()) {
        var labelPayload = []
        var imageAttributes = {
          screenWidth: this.$refs.image.clientWidth,
          screenHeight: this.$refs.image.clientHeight,
          realWidth: this.$refs.image.naturalWidth,
          realHeight: this.$refs.image.naturalHeight
        }
        const imagePosition = this.getImagePositionRelativeToScreen(imageAttributes)
        for (let idxBox = 0; idxBox < this.boxes.length; idxBox++) {
          var boxPosition = this.getBoxPositionRelativeToImage(imagePosition, idxBox)
          var bWidth = this.boxes[idxBox].width
          var bHeight = this.boxes[idxBox].height
          var realImageAttr = this.getRealImageAttributes(imageAttributes, boxPosition, bWidth, bHeight)
          var content_id = await this.createLabelContent(this.boxes[idxBox].content)
          var singleBackendObj = {
            // TODO: change temporary image_id of 1 to real image_id
            image_id: this.image.id,
            label_x_center: realImageAttr.xCenter,
            label_y_center: realImageAttr.yCenter,
            label_width: realImageAttr.width,
            label_height: realImageAttr.height,
            label_content_id: content_id
          }
          labelPayload.push(singleBackendObj)
          if (idxBox === this.boxes.length - 1) {
            const status = await this.createAllLabelsInImage(labelPayload)
            if (status === "success") {
              this.showSuccessAlert("Success!", "Image has been saved!").then(() => {
                this.closeViewer()
              })
            }
          }
        }
      }
    },
    validateAllContents () {
      for (let idxBox = 0; idxBox < this.boxes.length; idxBox++) {
        if (this.boxes[idxBox].content === '' || !this.boxes[idxBox].content) {
          this.showFailedAlert("Content cannot be empty!", "Please check box with id = " + idxBox)
          return false
        }
      }
      return true
    },
    showFailedAlert (title, bodyText) {
      return this.$swal.fire({
        title: title,
        text: bodyText,
        icon: 'danger'
      })
    },
    showSuccessAlert(title, bodyText) {
      return this.$swal.fire({
        title: title,
        text: bodyText,
        icon: 'success'
      })
    },
    getImagePositionRelativeToScreen (imageAttributes) {
      const wrapperHeight = this.$refs.imageWrapper.clientHeight
      const wrapperWidth = this.$refs.imageWrapper.clientWidth
      const imageLeft = (wrapperWidth - imageAttributes.screenWidth) / 2
      const imageTop = (wrapperHeight - imageAttributes.screenHeight) / 2
      return {
        imageLeft: imageLeft,
        imageTop: imageTop
      }
    },
    getBoxPositionRelativeToImage (imagePosition, idxBox) {
      var bLeft = this.boxes[idxBox].left - imagePosition.imageLeft
      var bTop = this.boxes[idxBox].top - imagePosition.imageTop
      if (bLeft < 0) {
        bLeft = 0
      }
      if (bTop < 0) {
        bTop = 0
      }
      return {
        left: bLeft,
        top: bTop
      }
    },
    getRealImageAttributes (imageAttributes, boxPosition, bWidth, bHeight) {
      // console.log("IMAGE ATTR: ")
      // console.log(imageAttributes)
      // console.log(boxPosition)
      // console.log(bWidth)
      // console.log(bHeight)
      const widthRatio = (imageAttributes.realWidth / imageAttributes.screenWidth)
      const heightRatio = (imageAttributes.realHeight / imageAttributes.screenHeight)
      var realBoxWidth = widthRatio * bWidth
      var realBoxHeight = heightRatio * bHeight
      var xCenterPosition = widthRatio * boxPosition.left + (realBoxWidth / 2)
      var yCenterPosition = heightRatio * boxPosition.top + (realBoxHeight / 2)
      return {
        xCenter: xCenterPosition,
        yCenter: yCenterPosition,
        width: realBoxWidth,
        height: realBoxHeight
      }
    },
    async createLabelContent (content) {
      var url = '/api/content'
      var payload = {
        content_name: content
      }
      var response = await this.$axios.post(url, payload).catch(error => console.log(error))
      console.log("Content response: ", response)
      var content_id = response.data.data['label_contents_id']
      return content_id
    },
    async createAllLabelsInImage (labelPayload) {
      console.log("Label Payload: ", labelPayload)
      var url = '/api/label/many'
      var response = await this.$axios.post(url, labelPayload).catch(error => console.log(error))
      return response.data.status
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