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
        var role = user['user_role']
        user['user_role'] = role.charAt(0).toUpperCase() + role.slice(1)
        this.rows.push(user)
      })
    }
  }
}