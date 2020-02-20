<template>
  <div class="col">
    <div class="ml-4">
      <div class="row">
        <div class="col">
          <h5 class="title users-margin"> 
            Delete User 
          </h5>
        </div>
      </div>
      <div class="row mt-2">
        <div class="col">
          <DeleteableTable
            :prop-rows="rows"
            :prop-columns="columns"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import DeleteableTable from '~/components/user-management/DeleteableTable'
import getAllUsers from '~/mixins/user-management/getAllUsers'
export default {
  components: {
    DeleteableTable
  },
  mixins: [getAllUsers],
  data () {
    return {
      columns: [
        {
          key: 'username',
          label: 'Username',
          sortable: true
        },
        {
          key: 'user_role',
          label: 'Role',
          sortable: true
        },
        {
          key: 'delete',
          label: '',
          sortable: false
        }
      ]
    }
  }
}
</script>