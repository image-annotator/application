<template>
    <article class="blog-card">
      <img class="post-image" :src="imageURL" />
      <div class="article-details">
        <h3 class="post-title">{{ imageID }}</h3>
      </div>
    </article>
</template>

<script>
export default {
  props: ["imageID", "imageURL"],
  data () {
    return {}
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

.post-image {
  display: block;
  width: 100%;
  object-fit: cover;
  height: 100%;
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

</style>