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
export default {
  components: {
    ReadOnlyTable
  },
  data () {
    return {
      rows: [
        { id: 1, isRoleEditMode: false, username: 'Edward Alexander Jaya', role: 'Labeler', passcode: 'ABCD', _rowVariant: '' },
        { id: 2, isRoleEditMode: false, username: 'Rayza Mahendra', role: 'Labeler', passcode: 'DEFG', _rowVariant: ''},
        { id: 3, isRoleEditMode: false, username: 'Muhammad Nurdin Husen', role: 'Editor', passcode: 'HIJK', _rowVariant: '' },
        { id: 4, isRoleEditMode: false, username: 'Eka Sunandika', role: 'Editor', passcode: 'LMNO', _rowVariant: '' },
        { id: 5, isRoleEditMode: false, username: 'Ahmad Rizal Alifio', role: 'Labeler', passcode: 'PQRS', _rowVariant: '' },
        { id: 6, isRoleEditMode: false, username: 'Ardian Umam', role: 'Admin', passcode: 'TUVW', _rowVariant: ''}
      ],
      columns: [
        {
          key: 'role',
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

<style>

    .title {
        font-family: 'Open Sans Bold';
        color: #1E889B;
        letter-spacing: 0.035rem;
    }

    .users-margin {
        margin-top: 3.7rem;
    }

    .paragraph {
        font-size: 0.8rem;
        max-width: 70vw;
    }

    .sub-title {
        font-size: 1rem;
        /* font-weight: 300; */
    }

</style>