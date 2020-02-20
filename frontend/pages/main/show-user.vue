<template>
  <div class="col">
    <div class="ml-4">
      <div class="row">
        <div class="col">
          <h5 class="title users-margin"> 
            All Users 
          </h5>
        </div>
      </div>
      <div class="row mt-2">
        <div class="col">
          <ReadOnlyTable
            :prop-rows="rows"
            :prop-columns="columns"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import ReadOnlyTable from '~/components/user-management/ReadOnlyTable'
import getAllUsers from '~/mixins/user-management/getAllUsers'

export default {
  components: {
    ReadOnlyTable
  },
  mixins: [getAllUsers],
  data () {
    return {
      columns: [
        {
          key: 'user_role',
          label: 'Role',
          sortable: true
        },
        {
          key: 'username',
          label: 'Username',
          sortable: true
        },
        {
          key: 'passcode',
          label: 'Passcode',
          sortable: false
        }
      ]
    }
  }
}
</script>