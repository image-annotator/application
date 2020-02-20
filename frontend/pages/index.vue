<template>
  <div class="container-fluid">
    <div class="row bg-auth center">
      <div class="col center-inside">
        <!-- Username -->
        <div class="row">
          <div class="col">
            <h5 class="form-title font-auth"> 
              Username
            </h5>
          </div>
        </div>
        <div class="row mt-1">
          <div class="col">
            <input
              v-model="usernameForm.name"
              type="text"
              :class="['form-control', 'field-length', 'form-content', usernameForm.isDirty && isUsernameFormEmpty ? 'form-border-error': 'form-border']"
              placeholder="Type username..."
              name="username"
              @focus="usernameForm.isDirty = true"
            >
            <div v-if="isUsernameFormEmpty && usernameForm.isDirty">
              <p class="form-error"> 
                Username cannot be empty.
              </p>
            </div>
          </div>
        </div>
        <!-- Passcode -->
        <div class="row mt-2">
          <div class="col">
            <h5 class="form-title font-auth"> 
              Passcode
            </h5>
          </div>
        </div>
        <div class="row mt-1">
          <div class="col">
            <input
              v-model="passcodeForm.name"
              type="password"
              :class="['form-control', 'field-length', 'form-content', passcodeForm.isDirty && isPasscodeFormEmpty ? 'form-border-error': 'form-border']"
              placeholder="Type passcode..."
              name="passcode"
              @focus="passcodeForm.isDirty = true"
            >
            <div v-if="isPasscodeFormEmpty && passcodeForm.isDirty">
              <p class="form-error"> 
                Passcode cannot be empty.
              </p>
            </div>
          </div>
        </div>
        <!-- Button -->
        <div class="row mt-2">
          <div class="col">
            <button
              :class="['btn-border', 'btn-action', 'field-length', 'form-content']" @click="handleOnLogin()"
            > 
              <p class="btn-content">
                Login
              </p>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import cookies from 'js-cookie'

export default {
  data () {
    return {
      usernameForm: {
        name: '',
        isDirty: ''
      },
      passcodeForm: {
        name: '',
        isDirty: ''
      }
    }
  },
  computed: {
    isUsernameFormEmpty () {
      return this.usernameForm.name === ''
    },
    isPasscodeFormEmpty () {
      return this.passcodeForm.name === ''
    }
  },
  methods: {
    async handleOnLogin () {
      if (!this.isUsernameFormEmpty && !this.isPasscodeFormEmpty) {
        var payload = {
          "username": this.usernameForm.name,
          "passcode": this.passcodeForm.name
        }
        var url = '/api/user/login'
        const response = await this.$axios.post(url, payload).catch(error => console.error(error))
        console.log("Response: ", response)
        this.handleResponse(response) 
      } else {
        this.usernameForm.isDirty = true
        this.passcodeForm.isDirty = true
      }
    },
    handleResponse (response) {
      if (response && response.status === 200) {
        this.handleSuccessResponse(response)
      } else {
        this.handleIncorrectResponse()
      }
    },
    handleSuccessResponse (response) {
      // Set cookie
      cookies.remove('Authorization')
      cookies.set('Authorization', response.data.data.cookie)
      this.$router.push('/main/label')
    },
    handleIncorrectResponse () {
      this.$swal.fire({
        title: "Wrong Credentials",
        icon: 'error',
        text: 'Please fill your credentials again.'
      })
    }   
  }
}
</script>

<style scoped>
  .bg-auth {
    background-color: #005362;
    height: 100vh;
  }

  .font-auth {
    color: white;
  }

  .center {
    align-items: center;
    display: flex;
  }

  .center-inside {
    margin-left: calc(50vw - 8.25rem);
  }

  .form-error {
    color: white;
    font-family: "Open Sans Regular";
  }

  .form-border-error {
    border: 1px solid white;
  }

  .btn-border {
    border: 1px solid white;
  }

  .btn-action {
    background-color: #005362;
  }

  .btn-action:hover {
    background-color: #11616F;
  }
</style>