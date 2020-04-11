export default {
  data () {
    return {
      dataset: '',
      updateUI: false
    }
  },
  mounted () {
    if (this.$route.query.dataset) {
      this.dataset = this.$route.query.dataset
      this.updateUI = !this.updateUI
    }
  },
  methods: {
    changeDataset (newDataset) {
      this.dataset = newDataset
      this.updateUI = !this.updateUI
    }
  }
}