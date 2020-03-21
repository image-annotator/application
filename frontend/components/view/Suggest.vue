<template>
  <div>
    <div>
      <vue-simple-suggest
        ref="form"
        v-model="data"
        :list="simpleSuggestionList"
        :filter-by-query="true"
        :disabled="isDisabled"
        :max-suggestions="maxSuggestions"
        @click.native="enableForm"
        @keyup.native.enter="disableFocus"
      />
    </div>
    <br>
  </div>
</template>

<script>
import VueSimpleSuggest from 'vue-simple-suggest'

export default {
  components: {
    VueSimpleSuggest
  },
  data() {
    return {
      data: '',
      isDisabled: false,
      maxSuggestions: 5
    }
  },
  mounted () {
    this.enableForm()
  },
  methods: {
    simpleSuggestionList() {
      return [
        'Human',
        'Traffic Light',
        'Car',
        'Dog',
        'Sign',
        'a',
        'aaa',
        'aaaa'
      ]
    },
    disableFocus() {
      this.isDisabled = true
      this.$refs["form"].isInFocus = false
      // this.$refs["form"].$el.querySelector(".default-input").blur()
    },
    enableForm() {
      this.isDisabled = false
      this.$refs["form"].$el.querySelector(".default-input").focus()
      // this.$refs["form"].isInFocus = true
    }
  }
}
</script>

<style>
  .vue-simple-suggest > ul {
    list-style: none;
    margin: 0;
    padding: 0;
  }

  .vue-simple-suggest.designed {
    position: relative;
  }

  .vue-simple-suggest.designed, .vue-simple-suggest.designed * {
    box-sizing: border-box;
  }

  .vue-simple-suggest.designed .input-wrapper input {
    font-family: 'Open Sans Regular';
    letter-spacing: 0.4px;
    background-color: #F8F8F8;
    color: black;

    padding-left: 10px;
    width: 100%;
    height: auto;
    
    transition: all .1s;
    transition-delay: .05s;
    
    outline: none;
    border: 0;
    border-radius: 5px;
    
    cursor: pointer;
  }

  .vue-simple-suggest.designed.focus .input-wrapper input {
    /* border: 1px solid #aaa; */
    background: white;
    width: 130px;
    font-size: 16px;
    padding-top: 4px;
    padding-bottom: 4px;
  }

  .vue-simple-suggest.designed .suggestions {
    position: absolute;
    left: 0;
    right: 0;
    top: 100%;
    top: calc(100% + 5px);

    border-radius: 5px;
    background-color: #ffffff;
    z-index: 40;

    width: 130px;
    font-size: 16px;
    padding-top: 4px;
    padding-bottom: 4px;
    /* font-family: 'Open Sans Regular'; */
  }

  .vue-simple-suggest.designed .suggestions .suggest-item {
    cursor: pointer;
    user-select: none;
  }

  .vue-simple-suggest.designed .suggestions .suggest-item,
  .vue-simple-suggest.designed .suggestions .misc-item {
    padding: 5px 10px;
  }

  .vue-simple-suggest.designed .suggestions .suggest-item.hover {
    background-color: #D0D0D0 !important;
    /* color: #fff !important; */
    opacity: 0.8;
  }

  .vue-simple-suggest.designed .suggestions .suggest-item.selected {
    background-color: #D0D0D0;
  }
</style>