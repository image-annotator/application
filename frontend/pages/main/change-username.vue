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
            v-model="old_username"
            type="text"
            class="form-control form-border field-length form-content"
            placeholder="Type username..."
            name="username"
          >
        </div>
      </div>
      <div v-if="!userTrue">
        <p class="form-error"> 
          Username false.
        </p>
      </div>

      <div class="row mt-2">
        <div class="col">
          <p class="form-title">
            New Username 
          </p>
        </div>
      </div>
      <div class="row form-title-margin">
        <div class="col">
          <input
            id="new_username"
            v-model="new_username"
            type="text"
            class="form-control form-border field-length form-content"
            placeholder="Type new username..."
            name="new_username"
          >
        </div>
      </div>
      
      <div class="row mt-2">
        <div class="col">
          <button
            class="btn-border btn-action field-length form-content" @click="handleOnSubmit(new_username, user.username, old_username, user.passcode)"
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
import { mapGetters } from 'vuex'
import cookies from 'js-cookie'
export default {  
  data: function() {
    return {
      userTrue: true
    }
  },
  computed: {
    ...mapGetters({
      user: 'user/getUser'
    })
  }, 
  methods: {
    isUsernameTrue () {
      if (this.old_username == this.user.username) {
        this.userTrue = true
      } else {
        this.userTrue = false
      }
    },
    handleOnSubmit (newValue, username, oldValue, passcode) {
      if(username == oldValue) {
        this.isUsernameTrue()
        var text = "You will change username"
        this.showConfirmation("Are You Sure?", text).then((result) => {
          if (result.value) {
            this.approveConfirmation(newValue, passcode)
          } else {
            this.showCancelledAlert()
          }
        })
      } else {
        this.isUsernameTrue()
      }
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
    showCancelledAlert () {
      this.$swal.fire({
        title: 'Action has been cancelled',
        icon: 'success'
      })
    },
    approveConfirmation (new_username, passcode) {
      var payloadUsername =new_username
      var url = 'api/user/changecredential/' + cookies.get('Authorization')
      this.$axios.put(url, {
        username: payloadUsername,
        passcode: passcode
      }).then(
        this.showNewUsername(payloadUsername),
      ).catch(error => console.error(error))
    },
    showNewUsername (new_username) {
      this.$swal.fire({
        title: 'Changed to ' + new_username  ,
        icon: 'success',
      }).then((result) => {
        if(result.value) {
          this.$router.go()
        }
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