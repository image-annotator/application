export default {
  data () {
    return {
      dataset: '',
      updateUI: false,
      empty: false
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
    },
    handleOnEmpty (isEmpty) {
      this.empty = isEmpty
      console.log("this empty: ", this.empty)
    }
  }
}