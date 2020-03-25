<template>
  <div class="col">
    <div class="ml-4">
      <div class="row">
        <div class="col">
          <h5 class="title users-margin"> 
            Label Unlabeled Images
          </h5>
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
      <b-row>
        <b-col v-for="image in images" :key="image.id">
          <div id="container">
            <nuxt-link :to="{ path: '/viewer', query: { url: image.url, id: image.id }}">
              <Images
                class="animated fast fadeIn"
                :src="image.url"
                :image-i-d="image.id"
                :image-u-r-l="image.url"
                :image-name="image.name"
              />
            </nuxt-link>
            <br>
          </div>
        </b-col>
      </b-row>
      <b-pagination
        v-model="page"
        class="mt-3"
        :total-rows="100"
        pills
        :per-page="perPage"
      />
    </div>
  </div>
</template>

<script>
import Images from '~/components/view/Images'
import  { backendURL } from '~/config.js'
import { debounce } from 'debounce'
export default {
  components: {
    Images
  },
  data () {
    return {
      images: [],
      keyword: '',
      isViewerActive: false,
      perPage: 12,
      page: 1
    }
  },
  watch: {
    async page () {
      await this.getAllImages(this.perPage, this.page, this.keyword)
    }
  },
  async mounted () {
    await this.getAllImages(this.perPage, this.page, this.keyword)
  },
  methods: {
    async getAllImages(perPage, page, keyword) {
      var url = '/api/image'
      const response = await this.$axios.get(url, {
        params: {
          PerPage: perPage,
          Page: page,
          search: keyword
        }
      }).catch((error) => console.error(error))
      this.images = []
      if (response.data.data) {
        response.data.data.forEach((image) => {
          if (!image.Labeled) {
            var imageObj = {
              id: image.ImageID,
              name: image.Filename,
              url: backendURL + '/api/' + image.ImagePath
            }
            this.images.push(imageObj)
          }
        })
      }
    },
    debounceWrapper (e) {
      this.page = 1
      this.debounceInput(e)
    },
    // Only fires when user stops typing
    debounceInput: debounce(async function (e) {
      await this.getAllImages(this.perPage, this.page, e.target.value)
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
</style>