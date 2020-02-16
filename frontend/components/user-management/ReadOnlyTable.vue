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
    <slot />
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
      currentPage: 1,
      perPage: 5
    }
  }
}
</script>

<style scoped>
    .table {
        font-size: 0.83rem;
    }

    .table-width {
        width: calc(80vw - 60px);
        max-width: 1000px;

        cursor: pointer;
    }

    @media only screen and (min-width: 768px) {
        .table-width {
            width: calc(80vw - 260px);
        }
    }
</style>

<style>
    .page-item .page-link {
        color: #1E889B !important;
        border: 1px #d6d6d6 solid !important;
    }

    .page-item.active .page-link {  
        background-color:#1E889B !important;  
        color: white !important;

        border: 0 !important;
    }

    .page-item.disabled .page-link {
        background-color:#f6f6f6 !important;
        border: 0 !important;
    }

    .table-striped>tbody>tr:nth-child(odd)>td, 
    .table-striped>tbody>tr:nth-child(odd)>th {
      background-color: #E9F4F6;

    }
    /* Font color of table */
    .table-striped>tbody,  .table-striped>thead {
      color:#1E889B;
    }

</style>