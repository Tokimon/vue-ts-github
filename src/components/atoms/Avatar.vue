<template>
  <img class="avatar" :src="url" :alt="'Avatar for ' + name">
</template>

<script>
  import { defineComponent } from 'vue';

  export default defineComponent({
    name: 'Avatar',
    props: {
      url: {
        type: String,
        required: true
      },
      name: {
        type: String,
        required: true
      }
    }
  });
</script>

