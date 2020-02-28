<template>
  <div class="col">
    <div class="ml-4">
      <div class="row">
        <div class="col">
          <h5 class="title users-margin"> 
            Change Password
          </h5>
        </div>
      </div>
      <div class="row mt-4">
        <div class="col">
          <p class="form-title"> 
            Password 
          </p>
        </div>
      </div>
      <div class="row form-title-margin">
        <div class="col">
          <input
            id="username"
            v-model="password"
            type="Password"
            class="form-control form-border field-length form-content"
            placeholder="Type password..."
            name="password"
          >
        </div>
      </div>

      <div class="row mt-4">
        <div class="col">
          <p class="form-title"> 
            New Password 
          </p>
        </div>
      </div>
      <div class="row form-title-margin">
        <div class="col">
          <input
            id="new_password"
            v-model="new_password"
            type="password"
            class="form-control form-border field-length form-content"
            placeholder="Type new username..."
            name="new_username"
          >
        </div>
      </div>

            <div class="row mt-4">
        <div class="col">
          <p class="form-title"> 
            Confirm New Password 
          </p>
        </div>
      </div>
      <div class="row form-title-margin">
        <div class="col">
          <input
            id="confirm_new_password"
            v-model="password"
            type="password"
            class="form-control form-border field-length form-content"
            placeholder="Type confirm new password..."
            name="confirm_new_password"
          >
        </div>
      </div>
      
      <div class="row mt-2">
        <div class="col">
          <button
            class="btn-border btn-action field-length form-content" @click="handleOnSubmit()"
          > 
            <p class="btn-content">
              Change Password
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
      this.$swal.fire({
        title: 'Success to change password !',
        icon: 'success'
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