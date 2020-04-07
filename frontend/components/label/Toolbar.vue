<template>
  <div class="bg-toolbar">
    <div class="layout">
      <i
        class="first-icon-margin icon fas fa-plus"
        :class="{'active': activeIcon === 'add-box'}"
        @click="handleClickEvent('add-box')"
      />
      <i
        class="icon fas fa-expand"
        :class="{'active': activeIcon === 'resize-box'}"
        @click="handleClickEvent('resize-box')"
      />
      <i
        class="icon fas fa-trash"
        :class="{'active': activeIcon === 'delete-box'}"
        @click="handleClickEvent('delete-box')"
      />
    </div>
  </div>
</template>

<script scoped>
export default {
  data () {
    return {
      activeIcon: 'add-box'
    }
  },
  methods: {
    handleClickEvent (iconName) {
      this.activeIcon = iconName
      this.$emit("onIconClick", iconName)
    }
  }
}
</script>

<style scoped>
  .bg-toolbar {
    background-color: #F7F7F7;
    width: 3.75vw;
  }

  .icon {
    font-size: 1.1rem;
    color: #707070;
    margin-top: 27px;
  }

  .first-icon-margin {
    margin-top: 32px;
  }

  .layout {
    margin-left: calc(3.75vw - 2.1rem);
    cursor: pointer;
  }

  .active {
    color: #009DFF;
  }

</style>