<template>
  <LoadIndicator
    v-if="loading"
    :label="`Loading contributors for '${ repository }'`"
  />

  <ol v-else-if="contributors.length" class="contributor-list">
    <ContributorListItem
      v-for="login in contributors"
      :key="login"
      :login="login"
    />
  </ol>

  <p class="no-result" v-else-if="repository">
    No contributors associated with "{{ repository }}"
  </p>
</template>

<style scoped>
  .contributor-list {
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
  import { defineComponent, ref } from 'vue';

  import { contributorStore, loadContributors } from '~/store/contributors';

  import ContributorListItem from '~/components/atoms/ContributorListItem.vue';
  import LoadIndicator from '~/components/atoms/LoadIndicator.vue';



  export default defineComponent({
    name: 'ContributorList',
    data: () => contributorStore,
    components: {
      ContributorListItem,
      LoadIndicator
    },
    props: {
      repository: {
        type: String,
        required: true
      }
    },
    mounted() {
      loadContributors(this.repository, this.max);
    }
  });
</script>
