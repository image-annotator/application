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
  display: fix;
  background: #fff;
  box-shadow: 0 0.1875rem 1.5rem rgba(0, 0, 0, 0.2);
  border-radius: 0.5rem;
  overflow: hidden;
  display: grid;
  grid-template-columns: 1fr 2fr;
  grid-template-rows: 1fr;
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