<template>
  <div class="col">
    <div class="ml-4">
      <div class="row">
        <div class="col users-margin">
          <div style="display: flex">
            <h5 class="title">
              Upload Dataset
            </h5>
            <div style="margin-left: 2rem; margin-top: -0.4rem;">
              <Dropdown
                :is-upload="isUpload"
                @onDatasetChanged="changeDataset"
              />
            </div>
          </div>
        </div>
      </div>
      <br>
      <div class="row">
        <div class="col">
          <div class="uploader">
            <vue-dropzone
              id="dropzone"
              ref="myDropzone"
              :options="options"
              :use-custom-slot="true"
              @vdropzone-file-added="vfileAdded"
              @vdropzone-removed-file="vremoved"
            >
              <div class="dropzone-custom-content">
                <h6 class="dropzone-custom-title">
                  {{ desc }}
                </h6>
              </div>
            </vue-dropzone>
          </div>
        </div>
      </div>
      <br>
      <div class="row">
        <div class="col">
          <button class="btn-action btn-blue" @click="handleUpload">
            Upload
          </button>
          <button class="btn-action btn-white" @click="removeAllFiles">
            Cancel
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import Dropdown from '~/components/dropdown/Dropdown'
import { backendURL } from '~/config.js'

export default {
  components: {
    Dropdown
  },
  data(){
    return{
      files: [],
      filesCount: 0,
      isUpload: true,
      dataset: null,
      options: {
        url: backendURL + '/api/image/upload',
        autoProcessQueue: false,
        uploadMultiple: true,
        previewsContainer: false,
        maxFileSizeInMB: 200,
        addRemoveLinks: true,
        thumbnailWidth: 150
      }
    }
  },
  computed: {
    desc () {
      if (this.filesCount <= 0) {
        return "Click or Drag Images Here."
      } else {
        return this.filesCount + " Images ready to be uploaded! Please click upload."
      }
    }
  },
  methods:{
    template: function () {
      return `<div class="dz-preview dz-file-preview">
                <div class="dz-image">
                    <div data-dz-thumbnail-bg></div>
                </div>
                <div class="dz-details">
                    <div class="dz-size"><span data-dz-size></span></div>
                    <div class="dz-filename"><span data-dz-name></span></div>
                </div>
                <div class="dz-progress"><span class="dz-upload" data-dz-uploadprogress></span></div>
                <div class="dz-error-message"><span data-dz-errormessage></span></div>
                <div class="dz-success-mark"><i class="fa fa-check"></i></div>
                <div class="dz-error-mark"><i class="fa fa-close"></i></div>
            </div>
        `
    },
    changeDataset (newDataset) {
      this.dataset = newDataset
    },
    vfileAdded () {
      console.log(this.$refs.myDropzone.options)
      this.filesCount++
    },
    vremoved() {
      this.filesCount--
    },
    formatBytes(bytes,decimals) {
      if(bytes == 0){
        return '0 Bytes'
      }else{
        var k = 1024,
          dm = decimals <= 0 ? 0 : decimals || 2,
          sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
          i = Math.floor(Math.log(bytes) / Math.log(k))
        return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i]
      }
    },
    removeAllFiles() {
      this.files = this.$refs.myDropzone.getAcceptedFiles()
      if (this.files.length === 0){
        this.$swal.fire({
          title: "Failed Remove Files",
          icon: "error",
          text: "No Files",
          confirmButtonColor: '#11616F',
        }) 
      } else {
        this.$refs.myDropzone.removeAllFiles()
        this.files = []
        this.filesCount = 0
      }
    },
    invalidUpload() {
      this.$swal.fire({
        title: "No Image Selected",
        icon: "error",
        text: "Choose images first!",
        confirmButtonColor: '#11616F',
      })
    },
    showSuccessUploadPopUp (numberOfUploadedFiles, fileSize) {
      this.$swal.fire({
        title: "Success",
        icon: 'success',
        confirmButtonColor: '#11616F',
        html: 'Uploaded <b id="count"></b> images (<b id="size"></b>)',
        onBeforeOpen: () => {
          const content = this.$swal.getContent()
          if(content){
            const countText = content.querySelector('#count')
            const sizeText = content.querySelector('#size')
            if(countText && sizeText){
              countText.textContent = numberOfUploadedFiles
              sizeText.textContent = this.formatBytes(fileSize)
            }
          }
        }
      })
    },
    showErrorUploadPopUp (errorText) {
      return this.$swal.fire({
        title: 'Error!',
        text: errorText,
        icon: 'error'
      })
    },
    validUpload() {
      this.files = this.$refs.myDropzone.getAcceptedFiles()
      // var total = this.files.length
      var count = 0
      var size = 0
      this.$swal.fire({
        title: 'Uploading',
        html: '<b class="count"></b> of <b class="total"></b>',
        allowOutsideClick: false,
        allowEscapeKey: false,
        onOpen: async () => {
          this.$swal.showLoading()
          for (var idxFile = 0; idxFile < this.files.length; idxFile++) {
            var file = this.files[idxFile]
            if (await this.upload(file, file.name)) {
              count += 1; size += file.size
              this.$refs.myDropzone.removeFile(file)
              this.filesCount--
            } else {
              break
            }
          }
          if (count !== 0) {
            this.showSuccessUploadPopUp(count, size)
          }
        }
      })
    },
    async upload(f, name) {
      var url = "/api/image/upload"
      var formData = new FormData()
      formData.append("image", f, name)
      formData.append("dataset", this.dataset)
      const config = {
        headers: {'Content-Type':'multipart/form-data'}
      }
      var response = await this.$axios.post(url, formData, config).catch(async (error) => {
        console.log('data: ', error)
        console.error(error.response)
        await this.showErrorUploadPopUp(error.response.data.error)
      })
      console.log('response: ', response)
      return (response && response.status === 200)
    },
    invalidFolder(){
      this.$swal.fire({
        title: "No Folder Selected",
        icon: "error",
        text: "Choose folder first!",
        confirmButtonColor: '#11616F',
      })
    },
    async handleUpload(){
      this.files = await this.$refs.myDropzone.getAcceptedFiles()
      console.log("Files: ", this.files)
      if (!this.dataset || this.dataset === 'Choose Folder') {
        this.invalidFolder()
      } else {
        if (this.files.length === 0){
          this.invalidUpload()
        } else {
          this.files = []
          await this.validUpload()
        }
      }
    }
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

  .btn-white{
    background: #fff;
        -webkit-box-shadow: 2px 5px 5px 0px9/main/upload rgba(0,0,0,0.15);
        -moz-box-shadow: 2px 5px 5px 0px rgba(0,0,0,0.15);
    box-shadow: 2px 5px 5px 0px rgba(0,0,0,0.15);
    border: 0;
    border-radius: 0.3rem;
    overflow: hidden;
    cursor: pointer;
    color: #1E889B;
    /* margin-top: 2.8rem; */
    padding-left: 1.3rem;
    padding-right: 1.3rem;
    margin-right: 1rem;
    margin-bottom: 1rem;
  }
  
  .btn-blue{
    background:#1E889B;
    border: 0;
    border-radius: 0.3rem;
    padding-left: 1.3rem;
    padding-right: 1.3rem;
    cursor: pointer;
    color: #fff;
    margin-right: 1rem;
    margin-bottom: 1rem;
  }

  .btn-blue:hover{
      background: #11616F;
  }

  .btn-white:hover{
      background: #e2e2e2;
  }

  .uploader{
      background: #fff;
      border-radius: 0.5rem;
      margin-left: -0.6rem;
      width: 85%;
      /* height: 11.7rem; */
      padding:0.7rem; 
      /* border: 1px solid #1E889B; */
      cursor: pointer;
      /* overflow-y: scroll; */
  }

  #uploader-container h6{
      text-align: center;
  }

  .dropzone-custom-content{
    text-align: center;
  }

  .dropzone-custom-title{
    color: #c9c9c9;
  }
</style>
