<template>
  <p class="loading">
    <LoadingSvg />
    <span v-if="label">{{ label }}</span>
  </p>
</template>

<style scoped>
  .loading {
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
</style>

<script lang="ts">
  import { defineComponent, PropType } from 'vue';
  
  import LoadingSvg from '~/components/svg-icons/loading.vue';



  export default defineComponent({
    name: 'LoadIndicator',
    components: {
      LoadingSvg
    },
    props: {
      label: String
    }
  });
</script>