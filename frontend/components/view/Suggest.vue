<template>
  <div>
    <div>
      <vue-simple-suggest
        v-model="chosen"
        :list="simpleSuggestionList"
        :filter-by-query="true"
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
      chosen: ''
    }
  },
  methods: {
    simpleSuggestionList() {
      return [
        'Human',
        'Traffic Light',
        'Car',
        'Dog',
        'Sign'
      ]
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
    display: block;
    width: 100%;
    padding: 10px;
    border: 1px solid #cde;
    border-radius: 3px;
    color: black;
    background: white;
    outline:none;
    transition: all .1s;
    transition-delay: .05s;
    font-family: 'Open Sans Regular';
  }

  .vue-simple-suggest.designed.focus .input-wrapper input {
    border: 1px solid #aaa;
  }

  .vue-simple-suggest.designed .suggestions {
    position: absolute;
    left: 0;
    right: 0;
    top: 100%;
    top: calc(100% + 5px);
    border-radius: 3px;
    border: 1px solid #aaa;
    background-color: #fff;
    opacity: 1;
    z-index: 1000;
    font-family: 'Open Sans Regular';
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
    background-color: #1E889B !important;
    color: #fff !important;
    opacity: 0.8;
  }

  .vue-simple-suggest.designed .suggestions .suggest-item.selected {
    background-color: #1E889B;
    color: #fff;
  }
</style>