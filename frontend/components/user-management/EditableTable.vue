<template>
  <div>
    <b-table id="table-component" responsive striped
             hover
             :per-page="perPage"
             :current-page="currentPage"
             :items="rows"
             :fields="columns"
             class="table table-width table-borderless"
    >
      <!-- Role in Table -->
      <template v-slot:cell(user_role)="row">
        <div v-if="!row.item.isRoleEditMode" @click="handleRoleChange(row.item.user_id)">
          {{ row.item.user_role }}
          <div class="icon-layout">
            <i class="fas fa-caret-down icon" />
          </div>
        </div>
        <div v-else>
          <b-form-select
            class="form-height select-font"
            :options="roles" 
            :value="row.item.role"
            autofocus
            @change.native="handleOnChange($event, row.item.user_id, 'user_role', row.item.user_role)"
            @blur.native="row.item.isRoleEditMode = false"
          />
        </div>
      </template>
    </b-table>
    <b-pagination
      v-model="currentPage"
      :total-rows="numberOfRows"
      :per-page="perPage"
      aria-controls="table-component"
      pills
    />
  </div>
</template>

<script>

import tableScript from '~/mixins/user-management/tableScript'

export default {
  mixins: [tableScript],
  data () {
    return {
      roles: [
        'Admin',
        'Labeler',
        'Editor'
      ]
    }
  },
  methods: {
    handleRoleChange (id) {
      var index = this.rows.findIndex(function (val) {
        return val.user_id === id
      })
      this.rows[index].isRoleEditMode = true

    },
    showConfirmation (title, text) {
      return this.$swal.fire({
        title: title,
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Yes, change it',
        text: text
      })
    },
    
    approveConfirmation (role, id, type) {
      var payloadUsername = ''

      this.rows.forEach((row) => {
        if (row.user_id === id) {
          row[type] = role
          payloadUsername = row['username']
        }
      })

      var url = 'api/user/' + id
      this.$axios.put(url, {
        username: payloadUsername,
        user_role: role
      }).then(
        this.showApprovedAlert()
      ).catch(error => console.error(error))
    },
    
    showApprovedAlert () {
      this.$swal.fire({
        title: 'Successfully Changed',
        icon: 'success'
      })
    },
    
    showCancelledAlert () {
      this.$swal.fire({
        title: 'Action has been cancelled',
        icon: 'success'
      })
    },
    // Type can be: name, email, or department
    handleOnChange (event, id, type, originalValue) {
      if (originalValue !== event.target.value) {
        var text = "You will change " + originalValue + " to " + event.target.value
        this.showConfirmation("Are You Sure?", text).then((result) => {
          // If user confirms the changes:
          if (result.value) {
            this.approveConfirmation(event.target.value, id, type)
          } else {
            this.showCancelledAlert()
          }
        })
      } 
    }
  }
}
</script>

<style scoped>
    .form-height {
        height: auto;
    }

    .select-font {
        font-size: 0.83rem;
    }

    .icon-layout {
      display: flex;
    }

    .icon {
      margin-top: -15px;
      margin-left: auto;
    }

</style>