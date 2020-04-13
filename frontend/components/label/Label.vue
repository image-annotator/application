<template>
  <client-only>
    <div class="col">
      <div class="ml-4">
        <div class="row">
          <div class="col">
            <div class="flex-display">
              <h5 class="title users-margin"> 
                {{ title }}
              </h5>
              <div class="slot-margin">
                <slot />
              </div>
            </div>
          </div>
        </div>
        <br>
        <div class="row form-title-margin">
          <div class="col">
            <input
              id="imagesID"
              type="text"
              class="form-control form-border field-length form-content"
              placeholder="Search for file name..."
              name="imagesID"
              @input="debounceWrapper"
            >
          </div>
        </div>
        <br>
        <b-row v-if="images" :key="updateUI">
          <b-col v-for="id in Object.keys(images)" :key="id">
            <div id="container">
              <Images
                class="animated fadeIn"
                :src="images[id].url"
                :image-i-d="images[id].id"
                :image-u-r-l="images[id].url"
                :image-name="images[id].name"
                :is-delete="isDelete"
                :is-currently-labeled="images[id].isCurrentlyLabeled"
                @click.native="handleOnClick(images[id])"
              />
              <br>
            </div>
          </b-col>
        </b-row>
        <div
          v-if="Object.keys(images).length === 0"
          id="container" class="no-image-height animated fast fadeIn"
        >
          <p class="no-image">
            No Images Found
          </p>
        </div>
        <b-pagination
          v-model="page"
          class="mt-3"
          :total-rows="totalRows"
          pills
          :per-page="perPage"
        />
      </div>
    </div>
  </client-only>
</template>

<script>
import Images from '~/components/view/Images'
import  { backendURL } from '~/config.js'
import { debounce } from 'debounce'

export default {
  name: 'Label',
  components: {
    Images
  },
  props: {
    title: {
      type: String,
      default: 'Label Unlabeled Images'
    },
    isOutputViewer: {
      type: Boolean,
      default: false
    },
    isDelete: {
      type: Boolean,
      default: false
    },
    viewerURL: {
      type: String,
      default: '/viewer/'
    },
    isLabeled: {
      type: Boolean,
      default: false
    },
    dataset: {
      type: String,
      default: ''
    },
    output: {
      type: Object,
      default: () => {
        return {
          type: 'xml',
          standard: 'pascal'
        }
      }
    }
  },
  data () {
    return {
      images: {},
      keyword: '',
      isViewerActive: false,
      perPage: 12,
      totalRows: 0,
      page: 1,
      updateUI: false,
      timer: null
    }
  },
  watch: {
    async page () {
      this.images = {}
      await this.getAllImagesWithLabelStatus()
    }
  },
  async mounted () {
    this.images = {}
    this.isRepeatOver = false
    await this.getAllImagesWithLabelStatus()
    if (!this.isOutputViewer) {
      this.callGetImagesRepeatedly()
    } else {
      if (Object.keys(this.images).length === 0) {
        this.$emit("onEmpty", true)
      } else {
        this.$emit("onEmpty", false)
      }
    }
  },
  beforeDestroy () {
    this.isRepeatOver = true
    clearTimeout(this.timer)
  },
  methods: {
    callGetImagesRepeatedly () {
      if (!this.isRepeatOver) {
        this.timer = setTimeout(async () => {
          await this.getAllImagesWithLabelStatus()
          this.callGetImagesRepeatedly()
        }, 20000)
      }
    },
    async getAllImages(perPage, page, keyword) {
      var url = '/api/image'
      const response = await this.$axios.get(url, {
        params: {
          PerPage: perPage,
          Page: page,
          search: keyword,
          Labeled: this.isLabeled,
          Dataset: this.dataset
        }
      }).catch((error) => console.error(error))
      if (response.data.data.images) {
        this.totalRows = response.data.data["total_image"]
        response.data.data.images.forEach((image) => {
          var imageObj = {
            id: image.ImageID,
            name: image.Filename,
            url: backendURL + '/api/' + image.ImagePath,
            isCurrentlyLabeled: false
          }
          this.images[image.ImageID] = imageObj
        })
      }
      
    },
    async getImageCurrentlyBeingLabelled() {
      var url = '/api/accesscontrol'
      const response = await this.$axios.get(url).catch((error) => console.error(error))
      if (response.data.data) {
        response.data.data.forEach(async (imageStatus) => {
          // Delete access control
          if (imageStatus["timeout"] < this.getCurrentTime()) {
            await this.deleteImageAccessControlByImageID(imageStatus["image_id"]).catch((error) => console.error(error))
          } else {
            if (this.images[imageStatus["image_id"]]) {
              this.images[imageStatus["image_id"]].isCurrentlyLabeled = true
            }
          }
        })
      }
      this.updateUI = !this.updateUI
    },
    async getAllImagesWithLabelStatus() {
      this.images = {}
      await this.getAllImages(this.perPage, this.page, this.keyword)
      if (!this.isOutputViewer) {
        await this.getImageCurrentlyBeingLabelled()
      }
    },
    getCurrentTime () {
      var date = new Date()
      return date.toISOString()
    },
    async deleteImageAccessControlByImageID (imageID) {
      var url = '/api/accesscontrol/' + imageID
      try {
        var response = await this.$axios.delete(url)
        if (this.images[imageID]) {
          this.images[imageID].isCurrentlyLabeled = false
        }
        return response.data.status
      } catch (error) {
        console.error(error)
        throw error
      }
    },
    async handleOnClick (image) {
      if (this.isDelete) {
        await this.deleteImageByID(image.id)
      } else {
        await this.openViewer(image)
      }
    },
    showDeleteConfirmation (title, text) {
      return this.$swal.fire({
        title: title,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: 'red',
        confirmButtonText: 'Yes, delete',
        text: text
      })
    },
    async deleteImageByID (imageID) {
      this.showDeleteConfirmation("Are You Sure?", "Image Will Be Deleted").then(async (result) => {
        if (result.value) {
          var url = '/api/image/' + imageID
          var response = await this.$axios.delete(url)
          if (response.data.data) {
            await this.getAllImagesWithLabelStatus()
          }
        }
      })
    },
    async openViewer (image) {
      if (!this.isOutputViewer) {
        if (!image.isCurrentlyLabeled) {
          var url = '/api/accesscontrol/' + image.id
          try {
            await this.$axios.get(url)
            alert("This image is currently Labeled")
          } catch (e) {
            this.$router.push({ path: this.viewerURL, query: { url: image.url, id: image.id, dataset: this.dataset}})
          }
        }
      } else {
        this.$router.push({ path: this.viewerURL, query: {type: this.output.type, id: image.id, name: image.name, standard: this.output.standard, dataset: this.dataset }})
      }
      
    },
    debounceWrapper (e) {
      this.page = 1
      this.keyword = e.target.value
      // alert(this.keyword)
      this.debounceInput(e)
    },
    // Only fires when user stops typing
    debounceInput: debounce(async function () {
      await this.getAllImagesWithLabelStatus()
      // await this.getAllImages(this.perPage, this.page, e.target.value)
    }, 500)
  }
}
</script>

<style scoped>

  .form-title, .form-content, .btn-content {
    font-size: 0.85rem;
    color: #1E889B;
    letter-spacing: 0.025rem;

    font-family: 'Open Sans Regular';
  }

  .btn-action .btn-content {
    color: white;
    margin-top: 5px; 
    margin-left: -5px;
  }

  .form-title-margin {
    margin-top: -5px;
  }
  
  #container {
    grid-area: main;
    align-self: center;
    justify-self: center;
    width: 18rem;
  }

  .slot-margin {
    margin-left: 2.25rem;
    margin-top: 3.25rem;
  }

  .flex-display {
    display: flex;
  }

  .no-image {
    font-family: "Open Sans Bold";
    color: #D6D6D6;
  }

  .no-image-height {
    height: 2.5rem;
  }

</style>