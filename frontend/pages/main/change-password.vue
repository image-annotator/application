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
            Current Password 
          </p>
        </div>
      </div>
      <div class="row form-title-margin">
        <div class="col">
          <input
            id="old_password"
            v-model="old_password"
            type="Password"
            class="form-control form-border field-length form-content"
            placeholder="Type password..."
            name="password"
          >
        </div>
      </div>
      <div v-if="!passwordTrue">
        <p class="form-error"> 
          Password false.
        </p>
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
            placeholder="Type new password..."
            name="new_username"
          >
        </div>
      </div>

      <div class="row mt-2">
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
            v-model="confirm_new_password"
            type="password"
            class="form-control form-border field-length form-content"
            placeholder="Type confirm new password..."
            name="confirm_new_password"
          >
        </div>
      </div>
      <div v-if="!confirmPasswordTrue">
        <p class="form-error"> 
          Password not match.
        </p>
      </div>

      <div class="row mt-2">
        <div class="col">
          <button
            class="btn-border btn-action field-length form-content" @click="handleOnSubmit(new_password, user.passcode, old_password, user.user_id, confirm_new_password)"
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
import { mapGetters } from 'vuex'

export default {  
  data: function() {
    return {
      passwordTrue: true,
      confirmPasswordTrue: true
    }
  },
  computed: {
    ...mapGetters({
      user: 'user/getUser'
    })
  }, 
  methods: {
    showCancelledAlert () {
      this.$swal.fire({
        title: 'Action has been cancelled',
        icon: 'success'
      })
    },
    approveConfirmation (new_password, id) {
      var payloadUsername =""

      var url = 'api/user/' + id
      this.$axios.put(url, {
        username: payloadUsername,
        passcode: new_password
      }).then(
        this.showApprovedAlert()
      ).catch(error => console.error(error))
    },
    showApprovedAlert () {
      this.$swal.fire({
        title: 'Success to change password !',
        icon: 'success'
      }).then((result) => {
        if(result.value) {
          this.$router.go()
        }
      })
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
    handleOnSubmit (newValue, passcode, oldlValue, id, confirmNewValue) {
      this.isPasswordTrue(),
      this.isConfirmPasswordTrue()
      // Send to backend
      if ((passcode == oldlValue) && (confirmNewValue == newValue)) {
        var text = "You will change password"
        this.showConfirmation("Are You Sure?", text).then((result) => {
          if (result.value) {
            this.approveConfirmation(newValue, id)
          } else {
            this.showCancelledAlert()
          }
        })
      } else {
        this.isPasswordTrue(),
        this.isConfirmPasswordTrue()
      }
    },
    isPasswordTrue () {
      if (this.old_password == this.user.passcode) {
        this.passwordTrue = true
      } else {
        this.passwordTrue = false
      }
    },
    isConfirmPasswordTrue () {
      if (this.new_password == this.confirm_new_password) {
        this.confirmPasswordTrue = true
      } else {
        this.confirmPasswordTrue = false
      }
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