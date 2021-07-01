<template>
  <div class="stars">
    <span class="count">{{ count }}</span>
    <StarIcon class="icon" />
  </div>
</template>

<style scoped>
  .stars {
    display: flex;
    gap: 5px;
    font-size: 10px;
    align-items: center;
    color: gray;
  }

  .icon {
    width: 15px;
    height: 15px;
    fill: currentColor;
  }
</style>

<script lang="ts">
  import { defineComponent } from 'vue';

  import StarIcon from '~/components/svg-icons/star-icon.vue';



  export default defineComponent({
    name: 'Stars',
    props: {
      count: Number
    },
    components: {
      StarIcon
    }
  });
</script>

<style scoped>

</style>