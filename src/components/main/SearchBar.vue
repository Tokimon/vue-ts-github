<template>
  <div class="search-bar">
    <SearchField :onSearch="onSearch" />
    
    <div class="filters">
      <p class="filter-label">Number of max results</p>
      <NumberFilter label="Repositories" :value="repositoryStore.max" :onChange="setMaxRepositories" />
      <NumberFilter label="Contributors" :value="contributorStore.max" :onChange="setMaxContributors" />
    </div>
  </div>
</template>

<style scoped>
  .filters {
    margin-top: 20px;
    display: flex;
    flex-wrap: wrap;
  }

  .filters > :last-child {
    margin-left: 20px;
  }

  .filter-label {
    flex: 0 0 100%;
    margin: 0;
    font-size: 12px;
    color: gray;
  }
</style>

<script>
  import { defineComponent } from 'vue';

  import { repositoryStore, setRepositories, loadRepositories, setMaxRepositories } from '~/store/repositories';
  import { contributorStore, setMaxContributors } from '~/store/contributors';
  import { setTopic } from '~/store/topic';

  import SearchField from '~/components/form/SearchField.vue';
  import NumberFilter from '~/components/form/NumberFilter.vue';

  

  export default defineComponent({
    name: 'SearchBar',
    components: {
      SearchField,
      NumberFilter
    },
    setup: () => ({
      repositoryStore,
      contributorStore,
      setMaxRepositories,
      setMaxContributors
    }),
    methods: {
      /**
       * @param {string} topic
       */
      onSearch(topic) {
        setTopic(topic);
        setRepositories([]);

        if (!topic) { return; }

        loadRepositories(topic, repositoryStore.max);
      }
    }
  });
</script>

