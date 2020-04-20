<template>
  <Delete :is-labeled="isLabeled" :title="title" />
</template>

<script>
import Delete from '~/components/delete/Delete'
export default {
  components: {
    Delete
  },
  data () {
    return {
      isLabeled: true,
      title: "Delete Labeled Images"
    }
  }
}
</script>