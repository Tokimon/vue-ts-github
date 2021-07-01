<template>
  <li
    class="contributor-list-item"
    tabindex="0"
    :data-username="login"
    @click="click"
  >
    <div v-if="loading" class="loading"><LoadingSvg /></div>
    <div class="image">
      <Avatar :url="data.avatar" :name="login" />
      <small v-if="data.followers" class="followers">{{ data.followers }}</small>
    </div>
    <div class="details">
      <span class="username" :class="{ hireable: data.hireable }">
        <CartIcon v-if="data.hireable" />
        {{ login }}
        <i v-if="data.name" class="real-name">({{ data.name }})</i>
      </span>

      <small v-if="data.company" class="company">{{ data.company }}</small>
      <small v-if="data.location" class="location">{{ data.location }}</small>
    </div>
    <IconLink v-if="data.email" icon="email" :url="'mailto:' + data.email" />
    <IconLink v-if="data.blog" icon="blog" :url="data.blog" />
    <IconLink v-if="data.github" icon="github" :url="data.github" />
  </li>
</template>

<style scoped>
  .contributor-list-item {
    padding: 8px;
    border-radius: 6px;
    display: flex;
    gap: 10px;
    list-style: none;
    align-items: center;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }

  .contributor-list-item:hover,
  .contributor-list-item:focus {
    background-color: #f0f3f7;
    outline: none;
  }

  .image {
    flex: 0 0 30px;
  }

  .avatar {
    width: 30px;
    height: 30px;
    display: block;
  }

  .details {
    flex: 1 1 auto;
    display: flex;
    flex-direction: column;
    gap: 3px;
  }

  .hireable {
    color: #27b427;
  }

  .loading {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(255,255,255,0.8);
    display: flex;
    justify-content: center;
  }

  .loading svg {
    flex: 1;
    padding: 5px;
  }

  .username {
    display: flex;
    gap: 8px;
    align-items: center;
  }

  .username svg {
    width: 18px;
    height: 18px;
    fill: currentColor;
    margin-top: -3px;
  }

  .company {
    color: gray;
  }

  small, .real-name {
    font-size: 0.7em;
    color: #b6b6b6;
  }
</style>

<script lang="ts">
  import { defineComponent } from 'vue';

  import { completeContributor, getContributor } from '~/store/contributorCache';
  
  import Avatar from '~/components/atoms/Avatar.vue';
  import IconLink from '~/components/atoms/IconLink.vue';
  import LoadingSvg from '~/components/svg-icons/loading.vue';
  import CartIcon from '~/components/svg-icons/cart-icon.vue';



  export default defineComponent({
    name: 'ContributorListItem',
    props: {
      login: {
        type: String,
        required: true
      }
    },
    data() {
      return {
        loading: false,
        data: getContributor(this.login)
      }
    },
    components: {
      Avatar,
      IconLink,
      LoadingSvg,
      CartIcon
    },
    methods: {
      async click() {
        this.loading = true;
        this.data = await completeContributor(this.login);
        this.loading = false;
      }
    }
  });
</script>