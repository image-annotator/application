<template>
  <Label
    title="Label Labeled Images"
    viewer-u-r-l="/viewer/index-edit"
    :is-labeled="isLabeled"
  />
</template>

<script>
import Label from '~/components/label/Label'
export default {
  components: {
    Label
  },
  data () {
    return {
      isLabeled: true
    }
  }
}
</script>