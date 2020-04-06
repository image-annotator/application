<template>
  <article class="blog-card" :class="{'disable': isCurrentlyLabeled}">
    <img class="post-image" :class="{'post-image-disabled': isCurrentlyLabeled}" :src="imageURL">
    <div class="article-details">
      <h3 class="post-title" :class="{'post-title-disabled': isCurrentlyLabeled}"> 
        {{ dataImageName }}
      </h3>
    </div>
  </article>
</template>

<script>
export default {
  props: {
    imageID: {
      type: Number,
      default: -1
    },
    imageURL: {
      type: String,
      default: ''
    },
    imageName: {
      type: String,
      default: ''
    },
    isCurrentlyLabeled: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      dataImageName: ''
    }
  },
  mounted () {
    this.limitChars()
  },
  methods: {
    limitChars() {
      if (this.imageName.length > 20) {
        this.dataImageName = this.imageName.slice(0, 15) + '...'
      } else {
        this.dataImageName = this.imageName
      }
    }
  }
}  
</script>

<style scoped>
.blog-card {
  background: #fff;

  -webkit-box-shadow: 2px 5px 5px 0px rgba(0,0,0,0.15);
  -moz-box-shadow: 2px 5px 5px 0px rgba(0,0,0,0.15);
  box-shadow: 2px 5px 5px 0px rgba(0,0,0,0.15);

  border-radius: 0.5rem;
  overflow: hidden;
  display: grid;
  grid-template-columns: 1fr 2fr;
  grid-template-rows: 1fr;

  cursor: pointer;
}

.disable {
  background-color: #F0F0F0;
  -webkit-box-shadow: 0 0 0 0px rgba(0,0,0,0.0);
  -moz-box-shadow: 0 0 0 0px rgba(0,0,0,0.0);
  box-shadow: 0 0 0 0px rgba(0,0,0,0.0);
}

.blog-card:hover {
  background: #F0F0F0;
}

.post-image {
  display: block;
  width: 100%;
  object-fit: cover;
  height: 100%;
}

.post-image-disabled {
  opacity: 0.5;
}

.article-details {
  padding: 1.7rem;
}

.post-title {
  font-size: 0.875rem;
  line-height: 1;
  color: #1E889B;
  font-weight: bold;
  margin: 0 0 0 0;
}

.post-title-disabled {
  color: #D6D6D6;
}

</style>