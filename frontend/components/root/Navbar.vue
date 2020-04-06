<template>
  <b-nav vertical class="side-bar-layout side-bar-bg side-bar-font side-bar-padding">
    <!-- User profile info -->
    <b-nav-item link-classes="side-bar-color mt-5 ml-4">
      <!-- Username -->
      <div id="user-name">
        {{ username }}
      </div>
      <!-- Role -->
      <div id="role">
        Role: {{ role.charAt(0).toUpperCase() + role.slice(1) }}
      </div>
    </b-nav-item>

    <!-- Label Dataset -->
    <b-nav-item link-classes="side-bar-color mt-5 ml-4" @click="changeActiveElmtID('label-dataset')">
      <div id="label-dataset">
        Label Dataset
      </div>
    </b-nav-item>

    <!-- JSON Outputs -->
    <b-nav-item link-classes="side-bar-color mt-3 ml-4" @click="changeActiveElmtID('json-outputs')">
      <div id="json-outputs">
        JSON Outputs
      </div>
    </b-nav-item>

    <div v-if="role === 'editor' || role === 'admin'">
      <!-- Edit Dataset -->
      <b-nav-item link-classes="side-bar-color mt-3 ml-4" @click="changeActiveElmtID('edit-dataset')">
        <div id="edit-dataset">
          Edit Dataset
        </div>
      </b-nav-item>
    </div>

    <div v-if="role === 'admin'">
      <!-- Upload Dataset -->
      <b-nav-item link-classes="side-bar-color mt-3 ml-4" @click="changeActiveElmtID('upload-dataset')">
        <div id="upload-dataset">
          Upload Dataset
        </div>
      </b-nav-item>
    </div>
    
    <div>
      <b-nav-item
        v-b-toggle.collapse-settings
        link-classes="side-bar-color mt-3 ml-4"
      >
        <div class="icon-text-wrapper">
          Settings
          <i class="ml-3 mt-1 fas fa-caret-down" />
        </div>
      </b-nav-item>

      <b-collapse id="collapse-settings" visible role="tabpanel">
        <!-- Change Username -->
        <b-nav-item link-classes="side-bar-color mt-3 ml-4" @click="changeActiveElmtID('change-username')">
          <div class="icon-text-wrapper">
            <i class="mt-1 mr-3 fas fa-user" />
            <div id="change-username">
              Change Username
            </div>
          </div>
        </b-nav-item>

        <!-- Change Password -->
        <b-nav-item link-classes="side-bar-color mt-3 ml-4" @click="changeActiveElmtID('change-password')">
          <div class="icon-text-wrapper">
            <i class="mt-1 mr-3 fas fa-cog" />
            <div id="change-password">
              Change Password
            </div>
          </div>
        </b-nav-item>
      </b-collapse>  
    </div>

    <div v-if="role === 'admin'">
      <!-- User Management -->
      <b-nav-item
        v-b-toggle.collapse-user-management
        link-classes="side-bar-color mt-3 ml-4"
      >
        <div class="icon-text-wrapper">
          User Management
          <i class="ml-3 mt-1 fas fa-caret-down" />
        </div>
      </b-nav-item>

      <b-collapse id="collapse-user-management" visible role="tabpanel">
        <!-- Show All Users -->
        <b-nav-item link-classes="side-bar-color mt-3 ml-4" @click="changeActiveElmtID('show-all-users')">
          <div class="icon-text-wrapper">
            <i class="mt-1 mr-3 fas fa-users" />
            <div id="show-all-users">
              Show All Users
            </div>
          </div>
        </b-nav-item>

        <!-- Add User -->
        <b-nav-item link-classes="side-bar-color mt-3 ml-4" @click="changeActiveElmtID('add-user')">
          <div class="icon-text-wrapper">
            <i class="mt-1 mr-3 fas fa-plus-circle" />
            <div id="add-user">
              Add User
            </div>
          </div>
        </b-nav-item>

        <!-- Edit User -->
        <b-nav-item link-classes="side-bar-color mt-3 ml-4" @click="changeActiveElmtID('edit-user')">
          <div class="icon-text-wrapper">
            <i class="mt-1 mr-3 fas fa-pen" />
            <div id="edit-user">
              Edit User
            </div>
          </div>
        </b-nav-item>

        <!-- Delete User -->
        <b-nav-item link-classes="side-bar-color mt-3 ml-4 mb-5" @click="changeActiveElmtID('delete-user')">
          <div class="icon-text-wrapper">
            <i class="mt-1 mr-3 fas fa-trash" />
            <div id="delete-user">
              Delete User
            </div>
          </div>
        </b-nav-item>
      </b-collapse>
    </div>
  </b-nav>
</template>

<script>
export default {
  props: {
    username: {
      type: String,
      required: true
    },
    role: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      activeElmtID: 'label-dataset'
    }
  },
  watch: {
    activeElmtID (newElmtID, oldElmtID) {
      console.log("newElmtID: ", newElmtID)
      console.log("oldElmtID: ", oldElmtID)
      this.setClass(oldElmtID, '')
      this.setClass(newElmtID, 'active')
    }
  },
  mounted () {
    this.onPathChangeHandler(window.location.pathname)
    // this.activeElmtID = 'label-dataset'
    // console.log(/^\/main\/label(\/|(\?)|$)/.test(window.location.pathname))
  },
  methods: {
    setClass (elmtID, className) {
      let elmt = document.getElementById(elmtID)
      elmt.className = className
    },
    changeActiveElmtID (elmtID) {
      this.activeElmtID = elmtID
      this.redirectRoute(elmtID)
    },
    redirectRoute (elmtID) {
      console.log("elmtID: ", elmtID)
      switch (elmtID) {
      case 'label-dataset':
        this.$nuxt.$router.replace({ path: '/main/label'})
        break
      case 'json-outputs':
        this.$nuxt.$router.replace({ path: '/main/json'})
        break
      case 'edit-dataset':
        this.$nuxt.$router.replace({ path: '/main/edit'})
        break
      case 'upload-dataset':
        this.$nuxt.$router.replace({ path: '/main/upload'})
        break
      case 'change-username':
        this.$nuxt.$router.replace({ path: '/main/change-username'})
        break
      case 'change-password':
        this.$nuxt.$router.replace({ path: '/main/change-password'})
        break
      case 'show-all-users':
        this.$nuxt.$router.replace({ path: '/main/show-user'})
        break
      case 'add-user':
        this.$nuxt.$router.replace({ path: '/main/add-user'})
        break
      case 'edit-user':
        this.$nuxt.$router.replace({ path: '/main/edit-user'})
        break
      case 'delete-user':
        this.$nuxt.$router.replace({ path: '/main/delete-user'})
        break
      }
    },
    onPathChangeHandler (browserURL) {
      console.log("Browser: ", browserURL)
      var elmtID = ''
      if ((/^\/main\/label(\/|(\?)|$)/.test(browserURL))) {
        elmtID ='label-dataset'
      } else if ((/^\/main\/json(\/|(\?)|$)/.test(browserURL))) {
        elmtID ='json-outputs'
      } else if ((/^\/main\/edit(\/|(\?)|$)/.test(browserURL))) {
        elmtID ='edit-dataset'
      } else if ((/^\/main\/upload(\/|(\?)|$)/.test(browserURL))) {
        elmtID ='upload-dataset'
      } else if ((/^\/main\/change-username(\/|(\?)|$)/.test(browserURL))) {
        elmtID ='change-username'
      } else if ((/^\/main\/change-password(\/|(\?)|$)/.test(browserURL))) {
        elmtID ='change-password'
      } else if ((/^\/main\/show-user(\/|(\?)|$)/.test(browserURL))) {
        elmtID ='show-all-users'
      } else if ((/^\/main\/add-user(\/|(\?)|$)/.test(browserURL))) {
        elmtID ='add-user'
      } else if ((/^\/main\/edit-user(\/|(\?)|$)/.test(browserURL))) {
        elmtID ='edit-user'
      } else if (((/^\/main\/delete-user(\/|(\?)|$)/.test(browserURL)))) {
        elmtID ='delete-user'
      }
      this.changeActiveElmtID(elmtID)
      this.setClass(elmtID, 'active')
    }
  }
}
</script>

<style scoped>
  .side-bar-layout {
    height: auto;
    left: 0;

    min-height: 100vh;
    width: 250px;

    padding-right: 30px;

    overflow-y: scroll;
    position: relative;
  }

  .side-bar-bg {
    background-color: #1E889B;
  }

  .side-bar-font {
    font-family: 'Open Sans Regular';
    font-size: 0.95rem;

    letter-spacing: 0.035rem;
  }

  #user-name {
    /* font-size: 1.15rem; */
    font-size: 1.6rem;
    font-weight: 700;

    font-family: 'Open Sans Bold';
  }

  .icon-text-wrapper {
    display: flex;
  }

  .active {
    font-family: 'Open Sans Bold';
  }

  .side-bar-color {
    color: white;
  }

  .side-bar-color:hover {
    background-color: #166472;
  }

</style>