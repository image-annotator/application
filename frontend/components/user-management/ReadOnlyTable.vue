<template>
  <div>
    <b-table id="table-component" responsive striped
             hover
             :per-page="perPage"
             :current-page="currentPage"
             :items="rows"
             :fields="columns"
             class="table table-width table-borderless"
    />
    <!-- <slot name="content" /> -->
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
  mixins: [tableScript]
}
</script>