<template>
  <div class="col">
    <div class="ml-4">
      <div class="row">
        <div class="col users-margin">
          <h5 class="title">
            Upload Dataset
          </h5>           
        </div>
      </div>
      <br>
      <br>
      <div class="row">
        <div class="col">
          <h5 class="title sub-title">
            Add Folder
          </h5>           
        </div>
      </div>
      <br>
      <div class="row">
        <div class="col">
          <div class="uploader">
            <vue-dropzone id="dropzone" ref="myDropzone" :options="options" :use-custom-slot="true">
              <div class="dropzone-custom-content">
                <h6 class="dropzone-custom-title">
                  Drag and Drop Images here to Upload Content!
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
import vue2Dropzone from 'vue2-dropzone'
import 'vue2-dropzone/dist/vue2Dropzone.min.css'

export default {
  components: {
    vueDropzone : vue2Dropzone
  },
  data(){
    return{
      files: null,
      options: {
        url: "http://localhost:3000/api/image/upload",
        uploadMultiple: true,
        autoQueue: false,
        thumbnailWidth: 60,
        thumbnailHeight: 60
      }
    }
  },
  mounted(){
    var instance =  this.$refs.myDropzone.dropzone
    this.files = instance.files
    console.log("files",this.files)
  },
  methods:{
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
    onFileSelected(event){
      this.files = event.target.files
      console.log("masuk",this.files)
    },
    removeAllFiles(){
      this.files = this.$refs.myDropzone.getAcceptedFiles()
      if(this.files.length === 0){
        this.$swal.fire({
          title: "Failed Remove Files",
          icon: "error",
          text: "No Files",
          confirmButtonColor: '#11616F',
        }) 
      }else{
        this.$refs.myDropzone.removeAllFiles()
        this.files = []
      }
    },
    invalidUpload(){
      this.$swal.fire({
        title: "No Image Selected",
        icon: "error",
        text: "Choose images first!",
        confirmButtonColor: '#11616F',
      })
    },
    validUpload(){
      this.files = this.$refs.myDropzone.getAcceptedFiles()
      var total = this.files.length
      var count = 0
      var size = 0
      this.$swal.fire({
        title: 'Uploading',
        html: '<b class="count"></b> of <b class="total"></b>',
        allowOutsideClick: false,
        allowEscapeKey: false,
        timer: 1000,
        onBeforeOpen: () =>{
          this.$swal.showLoading()
        },
        onOpen: () => {
          this.$swal.stopTimer()
          Array.from(this.files).forEach(file =>{
            console.log("Size: ",file.dataURL)
            if(this.upload(file, file.name)){
              count += 1
            }
            size += file.size
            const content = this.$swal.getContent()
            if(content){
              const countText = content.querySelector('.count')
              const totalText = content.querySelector('.total')
              if(countText && totalText){
                countText.textContent = count
                totalText.textContent = total
              }
            }
          })
          if(count === total){
            console.log("Uploaded : ", count)
            this.$swal.resumeTimer()
          }
        }
      }).then((result) =>{
        if(result){
          this.removeAllFiles()
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
                  countText.textContent = count
                  sizeText.textContent = this.formatBytes(size)
                }
              }
            }
          })
          console.log("size total: ",size)
        }
      })
    },
    async upload(f, name){
      var url = "/api/image/upload"
      var dataURL = f.dataURL
      var file = this.dataURItoBlob(dataURL)
      var formData = new FormData()
      formData.append("image", file, name)
      const config = {
        headers: {'Content-Type':'multipart/form-data'}
      }
      var response = await this.$axios.post(url, formData, config).catch(error => console.log(error))
      return(response && response.status === 200)
    },
    dataURItoBlob(dataURI) {
      var byteString = atob(dataURI.split(',')[1])
      var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0]

      var ab = new ArrayBuffer(byteString.length)
      var ia = new Uint8Array(ab)
      for (var i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i)
      }
      return new Blob([ab], {type: mimeString})
    },
    async handleUpload(){
      this.files = this.$refs.myDropzone.getAcceptedFiles()
      if(this.files.length === 0){
        this.invalidUpload()
      }else{
        this.files = []
        this.validUpload()
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
      width: 75%;
      background: #fff;
      border-radius: 0.5rem;
      height: 11.7rem;
      padding:0.7rem; 
      border: 0.2rem solid #1E889B;
      cursor: pointer;
      overflow-y: scroll;
  }

  #uploader-container h6{
      text-align: center;
  }

  .dropzone-custom-content{
    text-align: center;
  }

  .dropzone-custom-title{
    margin-top: 0;
    color: #11616F;
  }

  #dropzone{
    background-color: #fff;
    border: 0.3rem solid #11616F;
    border-style: dashed;
    height: auto;
  }

</style>
