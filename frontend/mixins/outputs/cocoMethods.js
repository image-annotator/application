import  { backendURL } from '~/config.js'
import imageAndLabelMethods from '~/mixins/outputs/imageAndLabelMethods'
export default {
  data () {
    return {
      backendURL: backendURL,
      imageObj: {}
    }
  },
  mixins: [imageAndLabelMethods],
  methods: {
    async getCategoriesArr (allLabels) {
      var alreadyCheckedContentID = {}
      var categoriesArr = []
      for (var labelIdx in allLabels) {
        var label = allLabels[labelIdx]
        if (this.imagesObj[label["image_id"]] &&  !alreadyCheckedContentID[label["label_content_id"]]) {
          // Category
          var labelResponse = await this.getLabelContentByID(label["label_content_id"])
          var categoryObj = {
            id: label["label_content_id"],
            name: labelResponse["content_name"],
            supercategory: ""
          }
          alreadyCheckedContentID[label["label_content_id"]] = true
          categoriesArr.push(categoryObj)
        }
      }
      return categoriesArr
    },
    async getAnnotationsArr (allLabels) {
      var annotationsArr = []
      for (var labelIdx in allLabels) {
        var label = allLabels[labelIdx]
        if (this.imagesObj[label["image_id"]]) {
          // Annotations
          var x_top_left = Math.round(label.label_x_center - (0.5 * label.label_width))
          var y_top_left = Math.round(label.label_y_center - (0.5 * label.label_height))
          var annotationObj = {
            area: Math.round(label.label_width * label.label_height),
            iscrowd: 0,
            image_id: label.image_id,
            bbox: [x_top_left, y_top_left, Math.round(label.label_width), Math.round(label.label_height)],
            category_id: label.label_content_id,
            id: label.label_id
          }
          annotationsArr.push(annotationObj)
        }
      }
      return annotationsArr
    },
    getInfoObj () {
      var curYear = new Date().getFullYear()
      var infoObj = {
        year: curYear,
        version: "",
        description: this.dataset,
        contributor: "",
        url: "",
        date_created: ""
      }
      return infoObj
    },
    getLicensesArr () {
      var licensesArr = [{
        id: 1,
        name: "",
        url: ""
      }]
      return licensesArr
    },
    async assignImagesObj (imageID) {
      this.imagesObj = {}
      var allImages = await this.getAllImages()
      if (allImages) {
        allImages.forEach(async (image) => {
          var url = this.backendURL + '/api/' + image.ImagePath
          var imageMeta = await this.getImageMeta(url)
          var singleImageObj = {
            id: image.ImageID,
            width: imageMeta.naturalWidth,
            height: imageMeta.naturalHeight,
            file_name: image.Filename,
            license: 1,
            date_captured: image.UpdatedAt
          }
          if (imageID) {
            if (image.ImageID === imageID) {
              this.imagesObj[imageID] = singleImageObj
            }
          } else {
            this.imagesObj[image.ImageID] = singleImageObj
          }
        })
      }
    }
  }
}