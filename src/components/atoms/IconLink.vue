<template>
  <a :href="url" target="_blank" class="icon-link">
    <component :is="icon" />
  </a>
</template>

<style scoped>
  .icon-link {
    color: black;
    text-decoration: none;
    width: 20px;
    height: 20px;
    opacity: 0.3;
    transition: opacity 0.5s ease-in-out;
  }

  .icon-link:hover, .icon-link:focus {
    opacity: 1;
  }

  .icon-link svg {
    fill: currentColor;
  }
</style>

<script>
  import { defineComponent } from 'vue';

  import GithubIcon from '~/components/svg-icons/github-icon.vue';
  import BookIcon from '~/components/svg-icons/book-icon.vue';
  import EmailIcon from '~/components/svg-icons/email-icon.vue';

  export default defineComponent({
    name: 'IconLink',
    props: {
      url: {
        type: String,
        required: true
      },
      icon: {
        // @ts-ignore
        validator: (value) => ['github', 'blog', 'email'].includes(value),
        required: true
      }
    },
    components: {
      github: GithubIcon,
      blog: BookIcon,
      email: EmailIcon
    }
  });
</script>