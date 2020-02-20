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
      <!-- Delete row -->
      <template v-slot:cell(delete)="row">
        <div class="icon-layout">
          <div v-if="row.item['user_id'] !== 1">
            <i 
              class="fas fa-trash trash-icon"
              @mouseover="row.item['_rowVariant'] = 'danger'"
              @mouseleave="row.item['_rowVariant'] = ''"
              @click="handleOnDelete(row.item.user_id, row.item.username)"
            />
          </div>
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
  methods: {
    handleOnDelete (id, name) {
      if (name) {
        var text = name + " will be deleted."
        this.showDeleteConfirmation("Are You Sure?", text).then((result) => {
          if (result.value) {
            this.sendDeleteToBackEnd(id)
          }
        })
      } else {
        this.deleteRowContent(id, false)
      }
    },

    showDeleteConfirmation (title, text) {
      return this.$swal.fire({
        title: title,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: 'red',
        confirmButtonText: 'Yes, delete',
        text: text
      })
    },

    sendDeleteToBackEnd (id) {
      var url = '/api/user/' + id
      this.$axios.delete(url).then(
        this.deleteRowContent(id),
        this.showDeletedAlert()
      )
    },

    deleteRowContent (id) {
      for (let idx = 0; idx < this.rows.length; idx++) {
        if (this.rows[idx].user_id === id) {
          this.rows.splice(idx, 1)
          break
        }
      }
    },

    showDeletedAlert () {
      this.$swal.fire({
        title: 'Successfully Deleted',
        icon: 'success'
      })
    }
  }
}
</script>

<style scoped>

    .trash-icon:hover {
        color:red; 
    }

    .trash-icon {
        font-size: 0.75rem;
        margin-left: 50%;
        margin-top: 5px;

    }

    .red {
        background-color: red;
    }

    .icon-layout {
        display: flex;
    }

</style>