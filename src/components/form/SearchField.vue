<template>
  <div
    class="search-field"
    :class="{ focus: focused }"
  >
    <input
      type="text"
      class="input"
      v-model="value"
      @focus="onFocus"
      @blur="onBlur"
      @keyup.enter="search"
    >
    
    <div class="icon" @click="search" tabindex="0"><SearchIcon /></div>
  </div>
</template>

<style scoped>
  .search-field {
    border: 1px solid #50545a;
    border-radius: 5px;
    display: flex;
    align-items: center;
    padding: 5px;
    transition: border-color 0.2s linear;
  }

  .search-field.focus {
    border-color: #4179ce;
  }

  .input {
    border: none;
    font-size: 20px;
    flex: 1;
    padding: 5px;
  }

  .input:focus {
    outline: none;
  }

  .icon {
    margin-left: 5px;
    height: 30px;
    width: 30px;
    flex: 0 0 auto;
    padding: 5px;
  }
</style>

<script lang="ts">
  import { defineComponent, ref } from 'vue';

  import SearchIcon from '~/components/svg-icons/search-icon.vue';



  export default defineComponent({
    name: 'SearchField',
    components: {
      SearchIcon
    },
    props: {
      onSearch: Function
    },
    setup() {
      return {
        value: ref<string>(''),
        focused: ref<boolean>(false)
      };
    },
    methods: {
      search() {
        this.onSearch && this.onSearch(this.value || '');
      },
      onFocus() {
        this.focused = true;
      },
      onBlur() {
        this.focused = false;
      }
    }
  });
</script>
