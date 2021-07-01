<template>
  <SearchPage />
  <Modal v-if="repositoryStore.current" :onClose="onClose">
    <ContributorList :repository="repositoryStore.current" />
  </Modal>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';

  import { repositoryStore, setCurrentRepository } from '~/store/repositories';

  import SearchPage from '~/components/pages/SearchPage.vue';
  import Modal from '~/components/main/Modal.vue';
  import ContributorList from '~/components/main/ContributorList.vue';



  export default defineComponent({
    name: 'App',
    setup: () => ({ repositoryStore }),
    components: {
      SearchPage,
      Modal,
      ContributorList
    },
    methods: {
      onClose: () => setCurrentRepository('')
    }
  });
</script>

<style>
  body {
    margin: 20px;
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  * {
    box-sizing: border-box;
  }
</style>
