<template>
    <div class="c-filters__search">
        <input class="input" type="text" placeholder="Search" v-model="inputValue" @input="filter()">
        <button class="reset" @click="reset()">Clear</button>
    </div>
</template>

<script>
export default {
  name: "SearchFilterComponent",
  props: ["searchValue"],
  data() {
    return {
      inputValue: this.searchValue
    }
  },
  methods: {
    filter() {
     this.$emit('filter', this.inputValue);
    },
    reset() {
        this.inputValue = ''
        this.filter()
    }
  }
}
</script>
