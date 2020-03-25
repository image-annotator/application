export default {
  data () {
    return {
      labeledImages: []
    }
  },
  methods: {
    async getAllLabeledImages () {
    //Get All Images
      var url = '/api/label'
      var response = await this.$axios(url).catch(error => console.log(error))
      if (response && response.status === 200) {
        return response.data.data
      } else {
        return null
      }
    },
    async getAllImages () {
      //Get All Images
      var url = '/api/image/?PerPage=9999999999&Page=1'
      var response = await this.$axios(url).catch(error => console.log(error))
      if (response && response.status === 200) {
        return response.data.data
      } else {
        return null
      }
    }
  },
  async mounted () {
    var labeled = await this.getAllLabeledImages()
    var allImg = await this.getAllImages()
    var labeledImageID = []
    if (labeled && allImg) {
      //Get Uniqe All of Labeled Image ID
      labeled.forEach(image => {
        if(labeledImageID.indexOf(image.image_id) === -1){
          labeledImageID.push(image.image_id)
        }
      })
      //Get All of Labeled Image
      allImg.forEach(image => {
        if(labeledImageID.indexOf(image.ImageID) !== -1){
          this.labeledImages.push(image)
        }
      })
    }
  }
}