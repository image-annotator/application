<template>
  <div class="col">
    <div class="ml-4">
      <div class="row">
        <div class="col">
          <h5 class="title users-margin"> 
            Change Username
          </h5>
        </div>
      </div>
      <div class="row mt-4">
        <div class="col">
          <p class="form-title"> 
            Username 
          </p>
        </div>
      </div>
      <div class="row form-title-margin">
        <div class="col">
          <input
            id="username"
            v-model="username"
            type="text"
            class="form-control form-border field-length form-content"
            placeholder="Type username..."
            name="username"
          >
        </div>
      </div>

      <div class="row mt-4">
        <div class="col">
          <p class="form-title"> 
            New Username 
          </p>
        </div>
      </div>
      <div class="row form-title-margin">
        <div class="col">
          <input
            id="username"
            v-model="new_username"
            type="text"
            class="form-control form-border field-length form-content"
            placeholder="Type new username..."
            name="username"
          >
        </div>
      </div>
      
      <div class="row mt-2">
        <div class="col">
          <button
            class="btn-border btn-action field-length form-content" @click="handleOnSubmit()"
          > 
            <p class="btn-content">
              Change Username
            </p>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      username: ''
    }
  },
  methods: {
    handleOnSubmit () {
      // Send to backend
      this.showNewUsername(this.new_username)
    },
    showNewUsername (new_username) {
      this.$swal.fire({
        title: 'Changed to ' + new_username  ,
        icon: 'success',
      })
    }
  }
}
</script>

<style scoped>

  .form-title, .form-content, .btn-content {
    font-size: 0.85rem;
    color: #1E889B;
    letter-spacing: 0.025rem;

    font-family: 'Open Sans Regular';
  }

  .btn-action .btn-content {
    color: white;
    margin-top: 5px; 
    margin-left: -5px;
  }

  .form-title-margin {
    margin-top: -5px;
  }
  
</style>