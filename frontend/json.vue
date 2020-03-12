<template>
  <div>
    <suggestions
      v-model="query"
      :options="options"
      :onInputChange="onCountryInputChange">    
  </div>
</template>



<script>
import Suggestions from 'vue-suggestions'

Vue.use(Suggestions)

export default {
  data () {
    let countries = ['Afghanistan', 'Åland Islands', 'Albania', 'Algeria', 'American Samoa', 'AndorrA', 'Angola', 'Anguilla', 'Antarctica', 'Antigua and Barbuda', 'Argentina', 'Armenia', 'Aruba', 'Australia', 'Austria', 'Azerbaijan', 'Bahamas', 'Bahrain', 'Bangladesh', 'Barbados', 'Belarus', 'Belgium', 'Belize']
    return {
      query: '',
      countries: countries,
      selectedCountry: null,
      options: {}
    }
  },
  methods: {
    onCountryInputChange (query) {
      if (query.trim().length === 0) {
        return null
      }
      // return the matching countries as an array
      return this.countries.filter((country) => {
        return country.toLowerCase().includes(query.toLowerCase())
      })
    },
    onCountrySelected (item) {
      this.selectedCountry = item
    },
    onSearchItemSelected (item) {
      this.selectedSearchItem = item
    }
  }
}
</script>