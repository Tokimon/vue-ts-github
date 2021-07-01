<template>
  <LoadIndicator
    v-if="loading"
    :label="`Loading repositories for '${ topic }'`"
  />

  <ol v-else-if="(repositories || []).length" class="repository-list">
    <RepositoryListItem
      v-for="repo in repositories"
      :key="repo.id"
      :id="repo.id"
      :github="repo.github"
      :name="repo.fullName"
      :avatar="repo.avatar"
      :stars="repo.stars"
      @click="setCurrentRepository"
    />
  </ol>

  <p class="no-result" v-else-if="topic">
    No results found for "{{ topic }}"
  </p>
</template>

<style scoped>
  .repository-list {
    list-style: none;
    margin: 0;
    padding: 0;
  }

  .loading, .no-result {
    padding: 50px;
    color: #89a9be;
    font-size: 25px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .loading svg {
    width: 100px;
    height: 100px;
  }

  .no-result {
    color: #838e96;
  }
</style>

<script lang="ts">
  import { defineComponent, PropType } from 'vue';

  import type { RepositoryEntry } from '~/types';

  import { repositoryStore, setCurrentRepository } from '~/store/repositories';
  import { topic } from '~/store/topic';

  import RepositoryListItem from '~/components/atoms/RepositoryListItem.vue';
  import LoadIndicator from '~/components/atoms/LoadIndicator.vue';



  export default defineComponent({
    name: 'RepositoryList',
    setup: () => ({ topic, setCurrentRepository }),
    data: () => repositoryStore,
    components: {
      RepositoryListItem,
      LoadIndicator
    }
  });
</script>
