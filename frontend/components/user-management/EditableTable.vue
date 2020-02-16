<template>
  <div>
    <ReadOnlyTable :prop-rows="rows" :prop-columns="columns">
      <!-- Role in Table -->
      <template v-slot:cell(role)="row">
        <div v-if="!row.item.isRoleEditMode" @click="handleRoleChange(row.item.id)">
          {{ row.item.role }}
          <i class="fas fa-caret-down" />
        </div>
        <div v-else>
          <b-form-select
            class="form-height select-font"
            :options="roles" 
            :value="row.item.role"
            autofocus
            @change.native="handleOnChange($event, row.item.id, 'role', row.item.role)"
            @blur.native="row.item.isRoleEditMode = false"
          />
        </div>
      </template>
      <!-- Delete row -->
      <!-- <template v-slot:cell(delete)="row">
        <div class="icon-layout">
          <i 
            class="fas fa-trash trash-icon"
            @mouseover="row.item['_rowVariant'] = 'danger'"
            @mouseleave="row.item['_rowVariant'] = ''"
            @click="handleOnDelete(row.item.id, row.item.name)"
          />
        </div>
      </template> -->
    </ReadOnlyTable>
  </div>
</template>

<script>

import tableScript from '~/mixins/user-management/tableScript'
import ReadOnlyTable from '~/components/user-management/ReadOnlyTable'

export default {
  components: {
    ReadOnlyTable
  },
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
        return val.id === id
      })
      this.rows[index].isDeptEditMode = true

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
    
    approveConfirmation (value, id, type) {
      this.rows.forEach((row) => {
        if (row.id === id) {
          row[type] = value
        }
      })
      // TO DO:
      // Send changes to backend!
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
      var text = "You will change " + originalValue + " to " + event.target.value
      this.showConfirmation("Are You Sure?", text).then((result) => {
        console.log("Result: ", result)
        // If user confirms the changes:
        if (result.value) {
          this.approveConfirmation(event.target.value, id, type)
          this.showApprovedAlert()
        } else {
          this.showCancelledAlert()
        }
      })
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
</style>