import  { backendURL } from '~/config.js'
import imageAndLabelMethods from '~/mixins/outputs/imageAndLabelMethods'
export default {
  data () {
    return {
      backendURL: backendURL,
      imagesAttributes: {},
      pascalJSON: {}
    }
  },
  mixins: [imageAndLabelMethods],
  methods: {
    async getObjectsAttr (allLabels) {
      var objectsAttr = {}
      for (var labelIdx in allLabels) {
        var label = allLabels[labelIdx]
        if (this.pascalJSON[label["image_id"]]) {
          var labelResponse = await this.getLabelContentByID(label["label_content_id"])
          // If exists, push to the bounding box
          if (objectsAttr[label["label_content_id"]]) {
            objectsAttr[label["label_content_id"]].boundingBox.push(this.getBoundingBoxAttr(label))
            this.pascalJSON[label["image_id"]].object.pop()
            this.pascalJSON[label["image_id"]].object.push(objectsAttr[label["label_content_id"]])
          } else {
            // Else, Construct new Obj
            var objectAttr = {
              name: labelResponse["content_name"],
              pose: "Unspecified",
              truncated: 0,
              difficult: 0,
              boundingBox: [this.getBoundingBoxAttr(label)]
            }
            objectsAttr[label["label_content_id"]] = objectAttr
            this.pascalJSON[label["image_id"]].object.push(objectsAttr[label["label_content_id"]])
          }
        }
      }
    },
    getBoundingBoxAttr (label) {
      var x_top_left = Math.round(label.label_x_center - (0.5 * label.label_width))
      var y_top_left = Math.round(label.label_y_center - (0.5 * label.label_height))
      var x_bot_right = Math.round(label.label_x_center + (0.5 * label.label_width))
      var y_bot_right = Math.round(label.label_y_center - (0.5 * label.label_height))
      return {
        xmin: x_top_left,
        ymin: y_top_left,
        xmax: x_bot_right,
        ymax: y_bot_right
      }
    },
    async setSingleImageAttr (image, dataset) {
      var url = this.backendURL + '/api/' + image.ImagePath
      var imageMeta = await this.getImageMeta(url)
      this.pascalJSON[image.ImageID] = {
        folder: dataset,
        filename: image.Filename,
        path: url,
        source: {
          database: dataset
        },
        size: {
          width: imageMeta.naturalWidth,
          height: imageMeta.naturalHeight,
          depth: 3
        },
        object: []
      }
    }
  }
}