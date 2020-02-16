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
      columns: []
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