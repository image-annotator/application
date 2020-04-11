export default {
  methods: {
    async getLabelContentByID (contentID) {
      var url = '/api/content/' + contentID
      var response = await this.$axios(url).catch(error => console.log(error))
      if (response && response.status === 200) {
        return response.data.data
      } else {
        return null
      }
    },
    async getAllLabel(){
      var url = '/api/label'
      var response = await this.$axios(url).catch(error => console.log(error))
      if (response && response.status === 200) {
        return response.data.data
      } else {
        return null
      }
    },
    async getLabelByImageID (imageID) {
      var url = '/api/label/imagequery/' + imageID
      var response = await this.$axios(url).catch(error => console.log(error))
      if (response && response.status === 200) {
        return response.data.data
      } else {
        return null
      }
    },
    async getImageMeta(url) {
      return new Promise((resolve, reject) => {
        let img = new Image()
        img.onload = () => resolve(img)
        img.onerror = reject
        img.src = url
      })
    },
    async getAllImages() {
      var url = '/api/image'
      const response = await this.$axios.get(url, {
        params: {
          PerPage: 999999,
          Page: 1,
          search: "",
          Labeled: this.isLabeled,
          Dataset: this.dataset
        }
      }).catch((error) => console.error(error))
      if (response.data.data) {
        return response.data.data.images
      } else {
        return null
      }
    }
  }
}