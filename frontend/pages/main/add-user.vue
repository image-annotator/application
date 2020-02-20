<template>
  <div class="col">
    <div class="ml-4">
      <div class="row">
        <div class="col">
          <h5 class="title users-margin"> 
            Add User
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
            :class="['form-control', 'field-length', 'form-content', isFormDirty && isUsernameEmpty ? 'form-border-error': 'form-border']"
            placeholder="Type username..."
            name="username"
            @focus="isFormDirty = true"
          >
          <div v-if="isUsernameEmpty && isFormDirty">
            <p class="form-error"> 
              Username cannot be empty.
            </p>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col">
          <p class="form-title"> 
            Role 
          </p>
        </div>
      </div>
      <div class="row form-title-margin">
        <div class="col">
          <b-form-select
            id="role"
            v-model="role"
            type="text"
            class="form-control form-border field-length form-content"
            :options="roles"
            placeholder="Type role..."
            name="role"
          />
        </div>
      </div>
      <div class="row mt-2">
        <div class="col">
          <button
            :class="['btn-border', isUsernameEmpty ? 'btn-disabled': 'btn-action', 'field-length', 'form-content']" @click="handleOnSubmit()"
          > 
            <p class="btn-content">
              Add User
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
      username: '',
      role: 'Labeler',
      roles: ['Labeler', 'Editor'],
      isFormDirty: false
    }
  },
  computed: {
    isUsernameEmpty () {
      return this.username === ''
    }
  },
  methods: {
    async handleOnSubmit () {
      if (!this.isUsernameEmpty) {
        var payload = {
          'username': this.username,
          'user_role': this.role
        }
        var url = '/api/user/register'
        // Send to backend
        var response = await this.$axios.post(url, payload).catch(error => console.log(error))
        if (response && response.status === 200) {
          this.showInfo(this.username, response.data.data.passcode)
        } else {
          this.handleIncorrectResponse()
        }
      } else {
        this.isFormDirty = true
      }
    },
    showInfo (username, passcode) {
      this.$swal.fire({
        title: username + ' is Added!',
        icon: 'success',
        text: 'Passcode : ' + passcode
      })
    },
    handleIncorrectResponse () {
      this.$swal.fire({
        title: "User already exists",
        icon: 'error',
        text: 'Please try with another user!'
      })
    }
  }
}
</script>