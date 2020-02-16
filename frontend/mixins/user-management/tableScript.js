export default {
  props: {
    propRows: {
      type: Array,
      required: true
    },
    propColumns: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      rows: [],
      columns: [],
      currentPage: 1,
      perPage: 5
    }
  },
  computed: {
    numberOfRows () {
      return this.rows.length
    }
  },
  mounted () {
    this.columns = this.propColumns
    this.rows = this.propRows
  }
}