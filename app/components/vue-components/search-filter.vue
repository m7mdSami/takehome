<template>
    <div class="c-filters__search">
        <input class="input" type="text" placeholder="Search" v-model="inputValue" @input="filter()">
    </div>
</template>

<script>
export default {
  name: "search-filter",
  data() {
    return {
      inputValue: ''
    }
  },
  methods: {
    filter() {
     this.$emit('filter', this.inputValue);
    }
  }
}
</script>
