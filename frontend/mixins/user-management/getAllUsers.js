export default {
  data () {
    return {
      rows: []
    }
  },
  methods: {
    async getAllUsers () {
      var url = '/api/user'
      var response = await this.$axios(url).catch(error => console.error(error))
      console.log("response: ", response)
      if (response && response.status === 200) {
        return response.data.data
      } else {
        return null
      }
    }
  },
  async mounted () {
    var usersData = await this.getAllUsers()
    if (usersData) {
      usersData.forEach(user => {
        user['_rowVariant'] = ''
        user['isRoleEditMode'] = false
        this.rows.push(user)
      })
    }
  }
}