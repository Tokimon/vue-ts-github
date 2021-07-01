<template>
  <SearchBar class="search" />
  <RepositoryList />
</template>

<style scoped>
  .search {
    padding-bottom: 20px;
    margin-bottom: 20px;
    border-bottom: 1px dashed gray;
  }
</style>

<script lang="ts">
  import { defineComponent } from 'vue';

  import SearchBar from '~/components/main/SearchBar.vue';
  import RepositoryList from '~/components/main/RepositoryList.vue';



  export default defineComponent({
    name: 'SearchPage',
    components: {
      SearchBar,
      RepositoryList
    }
  });
</script>
