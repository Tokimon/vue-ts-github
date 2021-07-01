<template>
  <li
    class="repository-list-item"
    tabindex="0"
    :data-reponame="name"
    @click="click"
  >
    <Avatar :url="avatar" :name="name" />
    <span class="name">{{ name }}</span>
    <Stars :count="stars || 0" />
    <IconLink v-if="github" icon="github" :url="github" />
  </li>
</template>

<style scoped>
  .repository-list-item {
    padding: 8px;
    border-radius: 6px;
    display: flex;
    gap: 10px;
    list-style: none;
    align-items: center;
    cursor: pointer;
  }

  .repository-list-item:hover,
  .repository-list-item:focus {
    background-color: #f0f3f7;
    outline: none;
  }

  .avatar {
    width: 30px;
    height: 30px;
    flex: 0 0 auto;
  }

  .stars {
    flex: 0 0 auto;
  }

  .name {
    color: currentColor;
    flex: 1 1 auto;
  }
</style>

<script lang="ts">
  import { defineComponent, PropType } from 'vue';

  import type { ContributorEntry } from '~/types';

  import Avatar from '~/components/atoms/Avatar.vue';
  import Stars from '~/components/atoms/Stars.vue';
  import IconLink from '~/components/atoms/IconLink.vue';



  export default defineComponent({
    name: 'RepositoryListItem',
    components: {
      Stars,
      Avatar,
      IconLink
    },
    props: {
      id: Number,
      name: {
        type: String,
        required: true
      },
      avatar: {
        type: String,
        required: true
      },
      github: String,
      stars: Number,
      contributors: Array as PropType<ContributorEntry[]>,
      onClick: Function
    },
    methods: {
      click(e: MouseEvent) {
        const { reponame } = (e.currentTarget as HTMLElement)?.dataset;
        console.log(reponame)
        this.onClick && this.onClick(reponame);
      }
    }
  });
</script>